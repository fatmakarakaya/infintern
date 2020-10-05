// import React from "react";
// import { signup } from "../api/apiCalls";
// import Input from "../components/Input";
// import { useApiProgress } from "../shared/ApiProgress";

// class UserSignupPage extends React.Component {
//   state = {
//     username: null,
//     password: null,
//     passwordrepeat: null,
//     errors: {},
//   };

//   onChange = (event) => {
//     const { value, name } = event.target;
//     const errors = { ...this.state.errors };
//     errors[name] = undefined;
//     if (name === "password" || name === "passwordrepeat") {
//       if (name === "password" && value !== this.state.passwordrepeat) {
//         errors.passwordrepeat = "Şİfreler eşit değil";
//       }
//       if (name === "passwordrepeat" && value !== this.state.password) {
//         errors.passwordrepeat = "Şİfreler eşit değil";
//       }
//     }
//     this.setState({
//       [name]: value,
//       errors,
//     });
//   };

//   OnClickSignup = async (event) => {
//     //event.prevantDefault();
//     const { username, password } = this.state;
//     const body = { username, password };

//     try {
//       const response = await signup(body);
//     } catch (error) {
//       if (error.response.data.validationErrors) {
//         this.setState({ errors: error.response.data.validationErrors });
//       }
//     }
//   };

//   render() {
//     const { pandingApiCall } = this.props;
//     const { errors } = this.state;
//     const { username, password, passwordrepeat } = errors;
//     return (
//       <div className="container">
//         <form>
//           <h1 className="text-center">Kayıt Ol</h1>
//           <div className="form-group">
//             <Input
//               name="username"
//               label="Ad Soyad"
//               error={username}
//               onChange={this.onChange}
//             />
//             {/* <label>Kullanıcı Adı</label>
//                 <input className={username ? "form-control is-invalid" : "form-control"} name="username"  onChange = {this.onChange}/>
//                 <div className="invalid-feedback">
//                     {username}
//                </div> */}
//           </div>
//           <div className="form-group">
//             <Input
//               name="password"
//               label="Şifre"
//               error={password}
//               onChange={this.onChange}
//               type="password"
//             />
//           </div>
//           <div className="form-group">
//             <Input
//               name="passwordrepeat"
//               label="Şifreyi Doğrula"
//               error={passwordrepeat}
//               onChange={this.onChange}
//               type="password"
//             />
//           </div>
//           <div className="text-center">
//             <button
//               className="btn btn-primary"
//               onClick={this.OnClickSignup}
//               disabled={pandingApiCall && passwordrepeat !== undefined}
//             >
//               {pandingApiCall && (
//                 <span
//                   className="spinner-border spinner-border-sm"
//                   role="status"
//                   aria-hidden="true"
//                 ></span>
//               )}
//               Kayıt Ol
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
// const UserSignupPageuseApiProgress = useApiProgress(
//   UserSignupPage,
//   "/api/1.0/users"
// );
// export default UserSignupPageuseApiProgress;

// import React, { useState } from "react";
// import Input from "../components/Input";
// import ButtonWithProgress from "../components/ButtonWithProgress";
// import { useApiProgress } from "../shared/ApiProgress";
// import { useDispatch } from "react-redux";
// import { signupHandler } from "../redux/authActions";

// const UserSignupPage = (props) => {
//   const [form, setForm] = useState({
//     username: null,
//     password: null,
//     passwordRepeat: null,
//   });
//   const [errors, setErrors] = useState({});

//   const dispatch = useDispatch();

//   const onChange = (event) => {
//     const { name, value } = event.target;

//     setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
//     setForm((previousForm) => ({ ...previousForm, [name]: value }));
//   };

//   const onClickSignup = async (event) => {
//     event.preventDefault();

//     const { history } = props;
//     const { push } = history;

//     const { username, password } = form;

//     const body = {
//       username,
//       password,
//     };

//     try {
//       await dispatch(signupHandler(body));
//       push("/");
//     } catch (error) {
//       if (error.response.data.validationErrors) {
//         setErrors(error.response.data.validationErrors);
//       }
//     }
//   };

//   const { username: usernameError, password: passwordError } = errors;
//   const pendingApiCallSignup = useApiProgress("post", "/api/1.0/users");
//   const pendingApiCallLogin = useApiProgress("post", "/api/1.0/auth");

//   const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin;

//   let passwordRepeatError;
//   if (form.password !== form.passwordRepeat) {
//     passwordRepeatError = "Password mismatch";
//   }

//   return (
//     <div className="container">
//       <form>
//         <h1 className="text-center">Sign Up</h1>
//         <Input
//           name="username"
//           label="Username"
//           error={usernameError}
//           onChange={onChange}
//         />
//         <Input
//           name="password"
//           label="Password"
//           error={passwordError}
//           onChange={onChange}
//           type="password"
//         />
//         <Input
//           name="passwordRepeat"
//           label="PasswordvRepeat"
//           error={passwordRepeatError}
//           onChange={onChange}
//           type="password"
//         />
//         <div className="text-center">
//           <ButtonWithProgress
//             onClick={onClickSignup}
//             disabled={pendingApiCall || passwordRepeatError !== undefined}
//             pendingApiCall={pendingApiCall}
//             Sign
//             Up
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserSignupPage;

import React, { useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { signupHandler } from "../redux/authActions";

const UserSignupPage = (props) => {
  const [form, setForm] = useState({
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const onChange = (event) => {
    const { name, value } = event.target;

    setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
  };

  const onClickSignup = async (event) => {
    event.preventDefault();

    const { history } = props;
    const { push } = history;

    const { username, displayName, password } = form;

    const body = {
      username,
      displayName,
      password,
    };

    try {
      await dispatch(signupHandler(body));
      push("/");
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  const { t } = useTranslation();

  const {
    username: usernameError,
    displayName: displayNameError,
    password: passwordError,
  } = errors;
  const pendingApiCallSignup = useApiProgress("post", "/api/1.0/users");
  const pendingApiCallLogin = useApiProgress("post", "/api/1.0/auth");

  const pendingApiCall = pendingApiCallSignup || pendingApiCallLogin;

  let passwordRepeatError;
  if (form.password !== form.passwordRepeat) {
    passwordRepeatError = t("Password mismatch");
  }

  return (
    <div className="container">
      <form>
        <h1 className="text-center">{t("Sign Up")}</h1>
        <Input
          name="username"
          label={t("Username")}
          error={usernameError}
          onChange={onChange}
        />
        <Input
          name="displayName"
          label={t("Display Name")}
          error={displayNameError}
          onChange={onChange}
        />
        <Input
          name="password"
          label={t("Password")}
          error={passwordError}
          onChange={onChange}
          type="password"
        />
        <Input
          name="passwordRepeat"
          label={t("Password Repeat")}
          error={passwordRepeatError}
          onChange={onChange}
          type="password"
        />
        <div className="text-center">
          <ButtonWithProgress
            onClick={onClickSignup}
            disabled={pendingApiCall || passwordRepeatError !== undefined}
            pendingApiCall={pendingApiCall}
            text={t("Sign Up")}
          />
        </div>
      </form>
    </div>
  );
};

export default UserSignupPage;
