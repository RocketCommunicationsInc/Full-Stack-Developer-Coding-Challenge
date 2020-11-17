/** @format */
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
} from "../actions/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  timer: 3000,
  position: "top-end",
  timerProgressBar: false,
  showConfirmButton: false,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
};

export default function reducerAuth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      Toast.success("Authenticated Success!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      Toast.fire({
        icon: "success",
        title: "Welcome!",
      });
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case USER_LOADED_SUCCESS:
      Toast.success("User Loaded!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return {
        ...state,
        user: payload,
      };
    case SIGNUP_SUCCESS:
      Toast.fire({
        icon: "success",
        title: `${payload.email}, your account is now created. Please verify your email.`,
      });
      return {
        ...state,
        isAuthenticated: false,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case SIGNUP_FAIL:
      Toast.fire({
        icon: "error",
        title: "Signup fail",
      });
      break;
    case LOGIN_FAIL:
      Toast.fire({
        icon: "error",
        title: "Login fail",
      });
      break;
    case LOGOUT:
      Toast.fire({
        icon: "success",
        title: `Logged out successfully.`,
      });
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
