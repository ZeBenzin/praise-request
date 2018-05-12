import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import CodeIcon from "@material-ui/icons/Code";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/PersonOutline";
import StarIcon from "@material-ui/icons/StarBorder";

import classNames from "classnames";
import styles from "./repo-card.scss";

class RepoCard extends PureComponent {
  render() {
    const { name, description, owner, id, stargazers_count } = this.props.repo;
    return (
      <div className={styles.repoCardWrapper}>
        <div id={id} className={styles.repoCardContainer}>
          <div className={styles.repoCard}>
            <div className={styles.repoStats}>
              <span className={classNames(styles.repoStatBubble)}>
                <CodeIcon />
                <span className={styles.prCount}>25</span>
              </span>
              <span
                className={classNames(styles.repoStatBubble, styles.prTotal)}
              >
                <span>
                  {Math.round(Math.random(0, 300) * 10)}
                  <sup>pr</sup>
                </span>
              </span>
              <span className={classNames(styles.repoStatBubble)}>
                <PeopleIcon />
                <span className={styles.prCount}>25</span>
              </span>
            </div>
            <div className={styles.repoDetails}>
              <div className={styles.repoName}>{name}</div>
              <div className={styles.repoMetaData}>
                <span className={styles.metaDataGroup}>
                  <PersonIcon />

                  <span>{owner.login}</span>
                </span>
                <span className={styles.dividerPoint}>•</span>
                <span className={styles.metaDataGroup}>
                  <StarIcon />
                  {stargazers_count}
                </span>
              </div>
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
