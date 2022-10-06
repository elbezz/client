import React, { useEffect, useState } from "react";
import "./chatOnline.css";
import axios from "axios";
export const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const getFriends = async (res) => {
      try {
        const response = await axios.get("/users/friends/" + currentId);
        setFriends(response.data);
      } catch (err) {
        res.status(500).json(err);
      }
    };
    getFriends();
  }, [currentId]);
  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [friends, onlineUsers]);
  // console.log(friends);

  const handleClick = async (user) => {
    try {
      const response = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div
          key={o._id}
          className="chatOnlineFriend"
          onClick={() => handleClick(o)}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImage"
              src={
                o?.profilePic ? PF + o.profilePic : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
};
