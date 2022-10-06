import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import { Users } from "../../dummyData";
import { Online } from "../online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
export const Rightbar = ({ user }) => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  console.log(currentUser);
  // const [followed, setFollowed] = useState(false);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user?._id);
        setFriends(friendList.data);
        console.log(friendList);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    // console.log(friends);
  }, [user]);
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className="bithdayImg" />
          <span className="birthdayText">
            <b>Kadda Ammar</b> and <b>3 other friends</b> have their birthday
            today.
          </span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightBarFollowButton" onClick={handleFollow}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarProfileTitle">User information</h4>
        <div className="rightbarProfileInfo">
          <div className="rightbarProfileInfoItem">
            <span className="rightbarProfileInfoKey">City:</span>
            <span className="rightbarProfileInfoValue">{user.city}</span>
          </div>
          <div className="rightbarProfileInfoItem">
            <span className="rightbarProfileInfoKey">From:</span>
            <span className="rightbarProfileInfoValue">{user.from}</span>
          </div>
          <div className="rightbarProfileInfoItem">
            <span className="rightbarProfileInfoKey">Relationship:</span>
            <span className="rightbarProfileInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
          <h4 className="rightbarProfileTitle">User friends</h4>
          <div className="rightbarProfileFollowings">
            {friends.map((friend) => (
              <Link
                key={friend._id}
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarProfileFollowing">
                  <img
                    className="rightbarProfileFollowingImg"
                    src={
                      friend.profilePic
                        ? PF + friend.profilePic
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                  />
                  <span className="rightbarProfileFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};
