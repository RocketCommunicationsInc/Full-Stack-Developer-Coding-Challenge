import { RuxInput, RuxButton, RuxTabs, RuxTab } from "@astrouxds/react";
import useAuth from "./Auth";
import { Navigate } from "react-router-dom";
import "./LandingPage.css";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const { authed, login, register } = useAuth();
  const [action, setAction] = useState("login");
  const [status, setStatus] = useState("");
  const validationSchema =
    action === "login"
      ? Yup.object({
          username: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
        })
      : Yup.object({
          username: Yup.string()
            .max(15, "Must be between 4 and 15 characters")
            .min(4, "Must be between 4 and 15 characters")
            .required("Required"),
          password: Yup.string()
            .min(4, "Must be between 4 and 128 characters")
            .max(128, "Must be between 4 and 128 characters")
            .required("Required"),
        });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (action === "login") {
        login(values.username, values.password).catch((error) => {
          setStatus(error);
        });
      } else {
        register(values.username, values.password).catch((error) => {
          setStatus(error);
        });
      }
    },
  });

  useEffect(() => {
    formik.validateForm();
    setStatus("");
  }, [action]);

  if (authed.length > 0) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <RuxTabs
          id="tab-set-action"
          small
          className="tabs"
          onRuxselected={(e) => {
            setAction(e.detail.id);
          }}
        >
          <RuxTab className="tab" id="login" style={{ flex: 1 }}>
            Login
          </RuxTab>
          <RuxTab className="tab" id="register" style={{ flex: 1 }}>
            Register
          </RuxTab>
        </RuxTabs>
        <div className="login-input">
          <RuxInput
            label="Username"
            id="username"
            name="username"
            type="text"
            onRuxinput={formik.handleChange}
            value={formik.values.username}
            invalid={formik.touched.username && formik.errors.username}
            error-text={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : ""
            }
            onRuxblur={formik.handleBlur}
          />
        </div>
        <div className="login-input">
          <RuxInput
            label="Password"
            id="password"
            name="password"
            type="password"
            onRuxinput={formik.handleChange}
            value={formik.values.password}
            invalid={formik.touched.password && formik.errors.password}
            error-text={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
            onRuxblur={formik.handleBlur}
          />
        </div>
        {status?.length > 0 && <p>{status}</p>}
        <div className="login-input">
          <RuxButton type="submit">
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </RuxButton>
        </div>
      </form>
    </div>
  );
};

export default Login;
