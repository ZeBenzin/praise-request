import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import styles from "./repo-card.scss";

class RepoCard extends PureComponent {
  render() {
    const { name, description, owner, id } = this.props.repo;
    return (
      <div className={styles.repoCardWrapper}>
        <div id={id} className={styles.repoCardContainer}>
          <div className={styles.repoCard}>
            <div className={styles.repoIcon} />
            <div className={styles.repoDetails}>
              <div className={styles.repoName} />
              <div className={styles.repoDescription} />
            </div>
          </div>
        </div>
        <button className={styles.cardAction} onClick={this.props.onClick}>
          Open
        </button>
      </div>
    );
  }
}

RepoCard.propTypes = {
  repo: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

RepoCard.defaultProps = {
  onClick: () => {}
};

export default RepoCard;
