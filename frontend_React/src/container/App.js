import React from "react";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserSignupPage from "../pages/UserSignupPage";
import UserPage from "../pages/UserPage";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import TopBar from "../components/TopBar";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import LanguageSelector from "../components/LanguageSelector";
//class App extends React.Component {
//static contextType = Authentication

//onLogoutSuccess
const App = () => {
  const { isLoggedin } = useSelector((store) => ({
    isLoggedin: store.isLoggedin,
  }));

  //render(){
  //const {isLoggedin,username} = this.props;

  return (
    <div>
      <HashRouter>
        <TopBar />
        <Switch>
          <Route exact path="/" component={HomePage} />

          {!isLoggedin && <Route path="/login" component={LoginPage} />}

          <Route path="/signup" component={UserSignupPage} />

          {/* <Route path = "/user/:username"  
            component ={props =>{
              return <UserPage {...props} username={username} />
            }}/> */}
          <Route path="/user/:username" component={UserPage} />

          <Redirect to="/" />
        </Switch>
      </HashRouter>
      <LanguageSelector />
    </div>
  );
  //}
};

const mapStateToProps = (store) => {
  return {
    isLoggedin: store.isLoggedin,
  };
};

export default connect(mapStateToProps)(App);

// import React from 'react';
// import UserSignupPage from '../pages/UserSignupPage';
// import LoginPage from '../pages/LoginPage';
// import HomePage from '../pages/HomePage';
// import UserPage from '../pages/UserPage';
// import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import TopBar from '../components/TopBar';
// import { useSelector } from 'react-redux';

// const App = () => {
//   const { isLoggedIn } = useSelector(store => ({
//     isLoggedin: store.isLoggedin
//   }));

//   return (
//     <div>
//       <Router>
//         <TopBar />
//         <Switch>
//           <Route exact path="/" component={HomePage} />
//           {!isLoggedIn && <Route path="/login" component={LoginPage} />}
//           <Route path="/signup" component={UserSignupPage} />
//           <Route path="/user/:username" component={UserPage} />
//           <Redirect to="/" />
//         </Switch>
//       </Router>
//     </div>
//   );
// };

// export default App;
