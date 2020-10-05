// import React from 'react';
// import ProfilCard from '../components/ProfileCard';
// import { useEffect, useState } from 'react';
// import { getUser } from '../api/apiCalls';
// import { useParams } from 'react-router-dom';

// const UserPage = (props) => {
//   const [user, setUser] = useState({});
//  // const { username } = props.match.params;
//   const [notFound, setNotFound] = useState(false);
//   const { username } = useParams();
//   console.log(username);
//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const response = await getUser(username);
//         setUser(response.data);
//         setNotFound(false);
//       } catch (error) {
//         setNotFound(true);
//       }
//     };
//     loadUser();
//   }, [username]);

//   if (notFound) {
//     return (
//       <div className="container">
//         <div className="alert alert-danger text-center">
//           <div>
//             <span className="material-icons" style={{ fontSize: "48px" }}>
//               new_releases
//             </span>
//           </div>
//           Kullanıcı bulunamadı
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <ProfilCard user={user} />
//     </div>
//   );
// };

// export default UserPage;

// import React, { useState, useEffect } from 'react';
// import ProfileCard from '../components/ProfilCard';
// import { getUser } from '../api/apiCalls';
// import { useParams } from 'react-router-dom';
// import { useApiProgress } from '../shared/ApiProgress';
// import Spinner from '../components/Spinner';
// import HoaxFeed from '../components/HoaxFeed';

// const UserPage = () => {
//   const [user, setUser] = useState({});
//   const [notFound, setNotFound] = useState(false);

//   const { username } = useParams();

//   const pendingApiCall = useApiProgress('get', '/api/1.0/users/' + username, true);

//   useEffect(() => {
//     setNotFound(false);
//   }, [user]);

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const response = await getUser(username);
//         setUser(response.data);
//       } catch (error) {
//         setNotFound(true);
//       }
//     };
//     loadUser();
//   }, [username]);

//   if (notFound) {
//     return (
//       <div className="container">
//         <div className="alert alert-danger text-center">
//           <div>
//             <i className="material-icons" style={{ fontSize: '48px' }}>
//               error
//             </i>
//           </div>
//           {'User not found'}
//         </div>
//       </div>
//     );
//   }

//   if (pendingApiCall || user.username !== username) {
//     return <Spinner />;
//   }

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col">
//           <ProfileCard user={user} />
//         </div>
//         <div className="col">
//           <HoaxFeed />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPage;

import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import { getUser } from "../api/apiCalls";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApiProgress } from "../shared/ApiProgress";
import Spinner from "../components/Spinner";
import HoaxFeed from "../components/HoaxFeed";

const UserPage = () => {
  const [user, setUser] = useState({});
  const [notFound, setNotFound] = useState(false);

  const { username } = useParams();

  const { t } = useTranslation();

  const pendingApiCall = useApiProgress(
    "get",
    "/api/1.0/users/" + username,
    true
  );

  useEffect(() => {
    setNotFound(false);
  }, [user]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getUser(username);
        setUser(response.data);
      } catch (error) {
        setNotFound(true);
      }
    };
    loadUser();
  }, [username]);

  if (notFound) {
    return (
      <div className="container">
        <div className="alert alert-danger text-center">
          <div>
            <i className="material-icons" style={{ fontSize: "48px" }}>
              error
            </i>
          </div>
          {t("User not found")}
        </div>
      </div>
    );
  }

  if (pendingApiCall || user.username !== username) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <ProfileCard user={user} />
        </div>
        <div className="col">
          <HoaxFeed />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
