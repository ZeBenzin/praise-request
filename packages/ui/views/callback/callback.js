import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import PersonIcon from "@material-ui/icons/PersonOutline";

import { getGitHubAuthToken } from "ui/api/user";

import styles from "./callback.scss";

class Callback extends Component {
  componentDidMount() {
    const authCode = this.props.location.search.replace(/\?code=/g, "");
    getGitHubAuthToken(authCode).then(() => {
      window.location.replace("/");
    });
  }

  render() {
    return (
      <div className={styles.callbackView}>
        <div className={styles.callbackContent}>
          <div className={styles.logo}>{"<PR />"}</div>
          <div className={styles.infoContainer}>
            <PersonIcon className={styles.personIcon} />
            <div className={styles.description}>Authentication in progress</div>
          </div>
        </div>
      </div>
    );
  }
}

Callback.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(Callback);
