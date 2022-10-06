import React, { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";
export const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState("");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const response = await axios.get("/users?userId=" + friendId);
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation, currentUser]);
  return (
    <div className="conversation">
      <img
        src={
          user?.profilePic ? PF + user.profilePic : PF + "person/noAvatar.png"
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};
