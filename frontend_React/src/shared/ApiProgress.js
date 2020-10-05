// import React, { Component } from 'react';
// import axios from 'axios';

// export function withApiProgress(WrappedComponent, AriPath) {
//   return class extends Component {
//     static displayName = "ApiProgress";

//     state = {
//       pandingApiCalls: false,
//     };

//     componentDidMount() {
//       this.requestInterceptors = axios.interceptors.request.use((request) => {
//         console.log("running request");
//         this.updateApiCallFor(request.url, true);
//         //this.setState({pandingApiCalls : true});
//         return request;
//       });

//       this.responseInterceptors = axios.interceptors.response.use(
//         (response) => {
//           this.updateApiCallFor(response.config.url, false);
//           //this.setState({pandingApiCalls : false});
//           return response;
//         },
//         (error) => {
//           this.updateApiCallFor(error.config.url, false);
//           //this.setState({pandingApiCalls : false});
//           return error;
//         }
//       );
//     }
//     componentWillMount() {
//       axios.interceptors.request.eject(this.requestInterceptors);
//       axios.interceptors.response.eject(this.responseInterceptors);
//     }

//     updateApiCallFor = (url, inProgress) => {
//       if (url === this.props.path) {
//         this.setState({ pandingApiCalls: inProgress });
//       }
//     };
//     render() {
//       const { pandingApiCalls } = this.state;
//       return <WrappedComponent pandingApiCalls={pandingApiCalls} />;
//     }
//   };
// }

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export const useApiProgress = (apiMethod, apiPath, strictPath) => {

//     const [pendingApiCall, setPendingApiCall] = useState(false);

//   useEffect(() => {
//     let requestInterceptor, responseInterceptor;

//     const updateApiCallFor = (method, url, inProgress) => {
//       if (method !== apiMethod) {
//         return;
//       }
//       if (strictPath && url === apiPath) {
//         setPendingApiCall(inProgress);
//       } else if (!strictPath && url.startsWith(apiPath)) {
//         setPendingApiCall(inProgress);
//       }
//     };

//     const registerInterceptors = () => {
//       requestInterceptor = axios.interceptors.request.use(request => {
//         const { url, method } = request;
//         updateApiCallFor(method, url, true);
//         return request;
//       });

//       responseInterceptor = axios.interceptors.response.use(
//         response => {
//           const { url, method } = response.config;
//           updateApiCallFor(method, url, false);
//           return response;
//         },
//         error => {
//           const { url, method } = error.config;
//           updateApiCallFor(method, url, false);
//           throw error;
//         }
//       );
//     };

//     const unregisterInterceptors = () => {
//       axios.interceptors.request.eject(requestInterceptor);
//       axios.interceptors.response.eject(responseInterceptor);
//     };

//     registerInterceptors();

//     return function unmount() {
//       unregisterInterceptors();
//     };
//   }, [apiPath, apiMethod, strictPath]);

//   return pendingApiCall;
// };

import { useState, useEffect } from "react";
import axios from "axios";

export const useApiProgress = (apiMethod, apiPath, strictPath) => {
  const [pendingApiCall, setPendingApiCall] = useState(false);

  useEffect(() => {
    let requestInterceptor, responseInterceptor;

    const updateApiCallFor = (method, url, inProgress) => {
      if (method !== apiMethod) {
        return;
      }
      if (strictPath && url === apiPath) {
        setPendingApiCall(inProgress);
      } else if (!strictPath && url.startsWith(apiPath)) {
        setPendingApiCall(inProgress);
      }
    };

    const registerInterceptors = () => {
      requestInterceptor = axios.interceptors.request.use((request) => {
        const { url, method } = request;
        updateApiCallFor(method, url, true);
        return request;
      });

      responseInterceptor = axios.interceptors.response.use(
        (response) => {
          const { url, method } = response.config;
          updateApiCallFor(method, url, false);
          return response;
        },
        (error) => {
          const { url, method } = error.config;
          updateApiCallFor(method, url, false);
          throw error;
        }
      );
    };

    const unregisterInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };

    registerInterceptors();

    return function unmount() {
      unregisterInterceptors();
    };
  }, [apiPath, apiMethod, strictPath]);

  return pendingApiCall;
};
