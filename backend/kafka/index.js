import dotenv from "dotenv";
dotenv.config({});
import { Kafka } from 'kafkajs'
import { Email } from "../models/email.model.js";

const KAFKA_ENDPOINT = process.env.KAFKA_ENDPOINT
const KAFKA_USERNAME = process.env.KAFKA_USERNAME 
const KAFKA_PASSWORD = process.env.KAFKA_PASSWORD

const kafka = new Kafka({
    clientId: 'kafkajs',
    brokers: [KAFKA_ENDPOINT],
    connectionTimeout: 30000,
    retry: {
        retries: 10
    },
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-256',
        username: KAFKA_USERNAME,
        password: KAFKA_PASSWORD
    }
});
let producer = null

const createProducer = async () => {
    if (producer) return producer
    const _producer = kafka.producer()
    await _producer.connect()
    producer = _producer
    return _producer
}

export async function produceEmail(email) {
    const _producer = await createProducer()
    _producer.send({
        messages: [{ key: `email-${Date.now()}`, value: email }],
        topic: "EMAIL"
    })
    console.log("Message produce on kafka js")
    return true;
}

export async function startEmailConsumer() {
    const consumer = kafka.consumer({ groupId: 'default' })
    await consumer.connect()
    await consumer.subscribe({ topic: "EMAIL", fromBeginning: true })
    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ message, pause }) => {
            try {
                const { to, subject,message:_message,userId} = JSON.parse(message.value)
                await Email.create({
                    to,
                    subject,
                    message:_message,
                    userId
                });
                console.log("Message consume on kafka js")
            } catch (error) {
                console.log("Something went wrong with kafka consumer",error)
                pause()
                setTimeout(() => {
                    consumer.resume([{ topic: 'EMAIL', partition: 0 }])
                }, 10 * 1000);
            }
        }
    })
}

export default kafka