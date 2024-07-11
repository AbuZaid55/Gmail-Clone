import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Inbox from './components/Inbox'
import Body from './components/Body'
import Mail from './components/Mail'
import SendEmail from './components/SendEmail'
import Login from './components/Login'
import Signup from './components/Signup'
import { Toaster } from 'react-hot-toast';
import SendEmails from './components/SendEmails'
import { useState } from 'react'


function App() {
  
  const [socket,setSocket]=useState(null)
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body setSocket={setSocket}/>,
      children: [
        {
          path: "/",
          element: <Inbox />
        },
        {
          path:"/sendemails",
          element:<SendEmails/>
        },
        {
          path: "/mail/:id",
          element: <Mail />
        },
      ]
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    }
  ])

  return (
    <div className='bg-[#F6F8FC] h-screen'>
      
      <RouterProvider router={appRouter} />
      <div className='absolute w-[30%] bottom-0 right-20 z-10'>
        <SendEmail socket={socket}/>
      </div>
      <Toaster />
    </div>
  )
}

export default App
