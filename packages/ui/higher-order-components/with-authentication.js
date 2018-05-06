import React, { Component } from "react";

import { AuthenticationContext } from "ui/components/app/app";

export const withAuthentication = WrappedComponent => {
  return class extends Component {
    onUserAuthenticated(val) {
      val("login");
    }

    onUserLogOut(val) {
      debugger;
      val("logout");
    }

    render() {
      return (
        <AuthenticationContext.Consumer>
          {val => {
            return (
              <WrappedComponent
                {...this.props}
                onUserAuthenticated={() => this.onUserAuthenticated(val)}
                onUserLogOut={() => this.onUserLogOut(val)}
              />
            );
          }}
        </AuthenticationContext.Consumer>
      );
    }
  };
};
