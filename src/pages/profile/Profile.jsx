import React, { useEffect, useState } from "react";
import { Feed } from "../../components/feed/Feed";
import { Rightbar } from "../../components/rightbar/Rightbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Topbar } from "../../components/topbar/Topbar";
import "./profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";
export const Profile = () => {
  const [user, setUser] = useState({});
  const params = useParams()
  // console.log(params.username);
  const username = params.username
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/users?username=${username}`);

      setUser(response.data);
    };
    fetchUser();
  }, [username]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                // src={`${PF}post/3.jpeg`}
                src={
                  user.coverPic ? PF + user.coverPic : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="userImg"
                // src={`${PF}person/8.jpeg`} alt=""
                src={
                  user.profilePic
                    ? PF + user.profilePic
                    : PF + "person/noAvatar.png"
                }
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <p className="profileInfoDesc">{user.desc}</p>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};
