import React from "react";
import logo from "../assets/infintern.PNG";
//import { Authentication } from '../shared/AuthenticationContext';
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "../redux/authActions";
import { loginSuccess } from "../redux/authActions";
import { useTranslation } from "react-i18next";
import "../i18n";
const TopBar = (props) => {
  // static contextType = Authentication;
  const { t } = useTranslation();
  const { username, isLoggedin } = useSelector((store) => ({
    isLoggedin: store.isLoggedin,
    username: store.username,
  }));

  const dispatch = useDispatch();

  const onlogoutSuccess = () => {
    dispatch(logoutSuccess());
  };
  let links = (
    <ul className="navbar-nav ml-auto">
      <li>
        <Link className="nav-Link mr-4" to="/login">
          {t("Login")}
        </Link>
      </li>
      <li>
        <Link className="nav-Link" to="/signup">
          {t("Sign Up")}
        </Link>
      </li>
    </ul>
  );
  if (isLoggedin) {
    links = (
      <ul className="navbar-nav ml-auto">
        <li>
          <Link className="nav-Link mr-4" to={`/user/${username}`}>
            {t("My Profile")}
          </Link>
        </li>
        <li>
          <Link className="nav-Link " onClick={onlogoutSuccess} to="/Logout">
            {t("Logout")}
          </Link>
        </li>
      </ul>
    );
  }
  return (
    <div className="shadow-sm bg-light mb-2">
      <nav className="navbar navbar-light container navbar-expand">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt={`logo`} width="160" all="infintern Logo" />
        </Link>
        {links}
      </nav>
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    username: store.username,
    isLoggedin: store.isLoggedin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutSuccess: () => dispatch(logoutSuccess()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
