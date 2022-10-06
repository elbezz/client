export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
  // if succesful, is going to return us a user
  type: "LOGIN_SUCCESS",
  payload: user,
});
export const LoginFailure = (user) => ({
  // if fail, is going to return an error
  type: "LOGIN_FAILURE",
  payload: error,
});

// bellow here there is nothing to to with Authentication, I could create another file called UserActions.js along with UserContext.js and UserReducer.js, and perform the actions related to user to keep things separate and clean, but just for the sake of learnig I'm puting everything here, I MUST CHANGE IT LATER when everything works.
export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});
export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
//add later FOLLOW SUCCESS AND FAILURE
