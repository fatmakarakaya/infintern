// import React from 'react';
// import UserList from '../components/UserList';

// const HomePage = () => {
//     return(
//         <div className= "container">
//             <UserList />
//         </div>
//     );
// };

// export default HomePage;

import React from "react";
import UserList from "../components/UserList";
import HoaxSubmit from "../components/HoaxSubmit";
import { useSelector } from "react-redux";
import HoaxFeed from "../components/HoaxFeed";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { isLoggedin } = useSelector((store) => ({
    isLoggedin: store.isLoggedin,
  }));
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {isLoggedin && (
            <div className="mb-1">
              <HoaxSubmit />
            </div>
          )}
          <HoaxFeed />
        </div>
        <div className="col">
          <UserList />
        </div>
        ;
      </div>
    </div>
  );
};

export default HomePage;
