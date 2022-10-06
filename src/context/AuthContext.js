import { createContext, useEffect,useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
  // user: null,
  // user: {
  //   _id: "624acb65ae710d5fa047bb12",
  //   username: "sofiane",
  //   email: "sofiane@gmail.com",
  //   profilePic: "person/me.jpg",
  //   coverPic: "",
  //   followers: [],
  //   isAdmin: false,

  //   followings: [],
  //   city: "Boumerdes",
  //   from: "Alger",
  //   relationship: 2,
  // },
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};
export const AuthContext = createContext(INITIAL_STATE);
// ----------------------------------------------------------------------------------------------------//
// in order to use our context we need to wrap it around the component that would use it,
// in our case, the context is gonna be used everywhere in our application, but first let's create the wrapper:
// ----------------------------------------------------------------------------------------------------//
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
   useEffect(() => {
     localStorage.setItem("user", JSON.stringify(state.user));
   }, [state.user]);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
