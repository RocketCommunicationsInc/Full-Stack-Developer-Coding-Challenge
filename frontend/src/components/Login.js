import { RuxInput, RuxButton, RuxTabs, RuxTab } from "@astrouxds/react";
import useAuth from "./Auth";
import { Navigate } from "react-router-dom";
import "./LandingPage.css";
import { useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Login = () => {
  const { authed, login, register } = useAuth();
  const [action, setAction] = useState("login");
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, 'Must be between 4 and 15 characters')
        .min(4, 'Must be between 4 and 15 characters')
        .required('Required'),
      password: Yup.string()
        .min(4, 'Must be between 4 and 128 characters')
        .max(128, 'Must be between 4 and 128 characters')
        .required('Required'),
    }),
    onSubmit: (values) => {
      if (action === "login") {
        login(values.username, values.password);
      } else {
        register(values.username, values.password);
      }
    },
  })

  if (authed != '') {
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
        <div>
          <RuxInput
            label="Username"
            id="username"
            name="username"
            type="text"
            onRuxinput={formik.handleChange}
            value={formik.values.username}
            invalid={
              formik.touched.username && formik.errors.username
            }
            error-text={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : ''
            }
            onRuxblur={formik.handleBlur}
          />
        </div>
        <div>
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
                : ''
            }
            onRuxblur={formik.handleBlur}
          />
        </div>
        <input type="submit" style={{"display": "none"}} />
        <div>
          <RuxButton type="submit" >
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </RuxButton>
        </div>
      </form>
    </div>
  )
}

// const Login = () => {
//   const { authed, login, register } = useAuth();
//   const [username, setUsername] = useState();
//   const [password, setPassword] = useState();
//   const [action, setAction] = useState("login");
//   const handleOnClick = () => {
//     if (action === "login") {
//       login(username, password);
//     } else {
//       register(username, password);
//     }
//   };

//   if (authed) {
//     return <Navigate to="/" />;
//   }
//   return (
//     <>
//       <form id="rux-form">
//         <RuxTabs
//           id="tab-set-action"
//           small
//           className="tabs"
//           onRuxselected={(e) => {
//             setAction(e.detail.id);
//           }}
//         >
//           <RuxTab className="tab" id="login" style={{ flex: 1 }}>
//             Login
//           </RuxTab>
//           <RuxTab className="tab" id="register" style={{ flex: 1 }}>
//             Register
//           </RuxTab>
//         </RuxTabs>
//         <div className="group">
//           <div className="field">
//             <RuxInput
//               id="username"
//               placeholder="Username"
//               label="Username"
//               type="text"
//               value={username}
//               onRuxchange={(e) => {
//                 setUsername(e.target.value);
//               }}
//             />
//           </div>
//         </div>
//         <div className="group">
//           <div className="field">
//             <RuxInput
//               id="pw"
//               label="Password"
//               type="password"
//               value={password}
//               onRuxchange={(e) => {
//                 setPassword(e.target.value);
//               }}
//             />
//           </div>
//         </div>
//         <div className="field">
//           <RuxButton
//             id="sign-in-btn"
//             className="sign-in-btn"
//             onClick={handleOnClick}
//           >
//             {action}
//           </RuxButton>
//         </div>
//       </form>
//     </>
//   );
// };

export default Login;
