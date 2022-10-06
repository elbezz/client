import React from "react";
import "./message.css";
import {format} from 'timeago.js'
export const Message = ({message,own}) => {
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="messageTop">
        <img className="messageImg"
          src="https://media.istockphoto.com/photos/to-live-your-best-find-your-balance-picture-id1307391886"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">
          {format(message.createdAt)}
      </div>
    </div>
  );
};
