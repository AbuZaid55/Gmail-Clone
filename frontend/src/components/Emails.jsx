import React, { useEffect, useState } from "react";
import Email from "./Email";
import { useSelector } from "react-redux";

const Emails = ({ path }) => {
  const { emails, searchText, user } = useSelector((store) => store.app);
  const [filterEmail, setFilterEmail] = useState(emails);
  useEffect(() => {
    if (user?._id) {
      const filteredEmail = emails.filter((email) => {
        return (
          (email.subject.toLowerCase().includes(searchText.toLowerCase()) ||
            email.to.toLowerCase().includes(searchText.toLowerCase()) ||
            email.message.toLowerCase().includes(searchText.toLowerCase())) &&
          (path === "inbox"
            ? email.to === user.email
            : email.userId === user._id)
        );
      });
      setFilterEmail(filteredEmail);
    }
  }, [searchText, emails, user]);

  return (
    <div className="h-[79vh] overflow-y-auto">
      {filterEmail &&
        filterEmail?.map((email) => <Email key={email.createdAt} email={email} />)}
    </div>
  );
};

export default Emails;
