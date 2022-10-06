import React from "react";
import "./closefriend.css";
export const CloseFriend = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <li className="sidebarFriend">
        <img src={PF+user.profilePicture}alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </div>
  );
};
