import React, { Component } from 'react';

export const Authentication = React.createContext();

class AuthenticationContext extends Component {
    state = {
        isLoggedin : false,
        username: undefined,
        image: undefined,
        password : undefined
    };
    
    onLogginSucces = authState =>{
      this.setState({
        ...authState,
        isLoggedin : true
      }); 
    
    }
    onLogout=()=>{
      this.setState({
        isLoggedin : false,
        username: undefined
      });

    }
    render() {
        return (
            
                <Authentication.Provider value = {{
                    state: {...this.state},
                    onLogginSucces: this.onLogginSucces,
                    onLogout: this.onLogout
                }}>
                    {this.props.children}
                </Authentication.Provider>
            
        );
    }
}

export default AuthenticationContext;