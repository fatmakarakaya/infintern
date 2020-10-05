// import React from "react";
// import { login } from "../api/apiCalls";
// import { withApiProgress } from "../shared/ApiProgress";
// import { Authentication } from "../shared/AuthenticationContext";
// import { connect } from "react-redux";
// import { loginSuccess } from "../redux/authActions";
// class LoginPage extends React.Component {
//   static contextType = Authentication;
//   state = {
//     username: null,
//     password: null,
//     error: null,
//     pandingApiCalls: false,
//   };

//   onChange = (event) => {
//     const { value, name } = event.target;
//     this.setState({
//       [name]: value,
//       error: null,
//     });
//   };
//   onClickLogin = async (event) => {
//     event.preventDefault();
//     const { username, password } = this.state;
//     const loginSuccess = () => {};
//     const creds = { username, password };

//     const { push } = this.props.history;
//     this.setState({
//       error: null,
//     });
//     try {
//       const response = await login(creds);
//       push("/");

//       const authState = {
//         username: username,
//         password: password,
//         image: response.data.image,
//       };

//       this.props.loginSuccess(authState);
//     } catch (apiError) {
//       if (apiError.response && apiError.response.data) {
//         this.setState({
//           error: apiError.response.data.message,
//         });
//       }
//     }
//   };

//   render() {
//     const { pandingApiCalls } = this.props;
//     const { username, password } = this.state;
//     const buttonEnabled = password && username;
//     return (
//       <div className="container">
//         <form>
//           <h1 className="text-center">Giriş</h1>
//           <div className="form-group">
//             <label>Kullanıcı Adı</label>
//             <input
//               className="form-control"
//               name="username"
//               onChange={this.onChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Şifre</label>
//             <input
//               className="form-control"
//               type="password"
//               name="password"
//               onChange={this.onChange}
//             />
//           </div>
//           {this.state.error && (
//             <div className="alert alert-danger">{this.state.error}</div>
//           )}
//           <div className="text-center">
//             <button
//               className="btn btn-primary"
//               onClick={this.onClickLogin}
//               disabled={!buttonEnabled || pandingApiCalls}
//             >
//               Giriş
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onLoginSucces: (authState) => dispatch(loginSuccess(authState)),
//   };
// };
// //const LoginSignupPagewithApiProgress = withApiProgress(LoginPage, '/api/1.0/auth');
// export default connect(null, mapDispatchToProps)(LoginPage);

import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { loginHandler } from "../redux/authActions";
import { useTranslation } from "react-i18next";

const LoginPage = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async (event) => {
    event.preventDefault();
    const creds = {
      username,
      password,
    };

    const { history } = props;
    const { push } = history;

    setError(undefined);
    try {
      await dispatch(loginHandler(creds));
      push("/");
    } catch (apiError) {
      setError(apiError.response.data.message);
    }
  };

  const pendingApiCall = useApiProgress("post", "/api/1.0/auth");

  const buttonEnabled = username && password;

  return (
    <div className="container">
      <form>
        <h1 className="text-center">Login</h1>
        <Input
          label={t("Username")}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Input
          label={t("Password")}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="text-center">
          <ButtonWithProgress
            onClick={onClickLogin}
            disabled={!buttonEnabled || pendingApiCall}
            pendingApiCall={pendingApiCall}
            text="Login"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
