import { RuxInput, RuxButton } from "@astrouxds/react";
import useAuth from "./Auth";
import { Navigate, Link } from "react-router-dom";
import "./LandingPage.css";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const emailRegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const Form = (props) => {
  const { authed, login, register } = useAuth();
  const [status, setStatus] = useState("");
  const validationSchema =
    props.action === "login"
      ? Yup.object({
          username: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
        })
      : Yup.object({
          username: Yup.string()
            .max(15, "Must be between 4 and 15 characters")
            .min(4, "Must be between 4 and 15 characters")
            .required("Required"),
          email: Yup.string().matches(emailRegExp, 'Email is not valid').required("Required"),
          password: Yup.string()
            .min(4, "Must be between 4 and 128 characters")
            .max(128, "Must be between 4 and 128 characters")
            .required("Required"),
        });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (props.action === "login") {
        login(values.username, values.password).catch((error) => {
          setStatus(error);
        });
      } else {
        register(values.username, values.email, values.password).catch((error) => {
          setStatus(error);
        });
      }
    },
  });

  useEffect(() => {
    formik.validateForm();
    setStatus("");
  }, [props.action]);

  if (authed.length > 0) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-input-title">
          {props.action === 'login' ? "Login" : "Register"}
        </div>
       
        <div className="form-input">
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
        {props.action !== "login" && <div className="form-input">
          <RuxInput
            label="Email"
            id="email"
            name="email"
            type="email"
            onRuxinput={formik.handleChange}
            value={formik.values.email}
            invalid={formik.touched.email && formik.errors.email}
            error-text={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
            onRuxblur={formik.handleBlur}
          />
        </div>}
        <div className="form-input">
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
        <div className="form-input-title">
          {props.action === 'login' 
            ? <Link to="/register">Create an account!</Link>
            : <Link to="/login">Already created!</Link>
          }
        </div>
        <div className="form-input">
          <RuxButton type="submit">
            {props.action.charAt(0).toUpperCase() + props.action.slice(1)}
          </RuxButton>
        </div>
      </form>
    </div>
  );
};

export default Form;
