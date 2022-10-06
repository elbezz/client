const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    //bro down here is user related reducer, go to action and see the comment I made
    case "FOLLOW":
      return {
        //the bellow line means take all the states and paste here
        ...state,
        user: {
          // down here means, take all properties of user for example (_id: "624acb65ae710d5fa047bb12",username: "sofiane",email: "sofiane@gmail.com", etc .....) and I want to change user.followings but don't delete the existing ones
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};
export default AuthReducer;
