import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import styles from "./repo-card.scss";

class RepoCard extends PureComponent {
  renderTags() {
    return ["javascript", "react", "website", "documentation"].map(tag => {
      return (
        <span>
          <span className={styles.repoTag}>{tag}</span>
        </span>
      );
    });
  }

  render() {
    const { name, description, owner } = this.props.repo;
    return (
      <div className={styles.repoCard} onClick={this.props.onClick}>
        <div className={styles.repoIcon}>
          <img alt="" src={owner.avatar_url} />
        </div>
        <div className={styles.repoDetails}>
          <span className={styles.repoName}>{name}</span>
          <p className={styles.repoDescription}>{description}</p>
        </div>
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
