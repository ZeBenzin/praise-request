import React, { PureComponent } from "react";

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
    return (
      <div className={styles.repoCard}>
        <div className={styles.repoIcon}>
          <img src="https://avatars3.githubusercontent.com/u/69631?v=4" />
        </div>
        <div className={styles.repoDetails}>
          <span className={styles.repoName}>reactjs/reactjs.org</span>
          <p className={styles.repoDescription}>
            The React documentation website
          </p>
          {this.renderTags()}
        </div>
      </div>
    );
  }
}

export default RepoCard;
