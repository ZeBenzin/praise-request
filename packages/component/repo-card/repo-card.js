import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import CodeIcon from "@material-ui/icons/Code";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
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
            <div className={styles.repoDetails}>
              <div className={styles.repoName}>
                <div className={styles.repoHeaderInfo}>
                  <div>{name}</div>
                </div>
                <div className={styles.repoDescription}>{description}</div>
              </div>
              <div className={styles.repoPRCount}>
                <span>120k</span>
              </div>
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
        <div className={styles.repoActions}>
          <div className={styles.repoActionContainer}>
            <button
              className={classNames(styles.repoAction, styles.githubButton)}
            >
              <OpenInNewIcon className={styles.favoriteIcon} />
            </button>
            {/*<span className={styles.tooltip}>View on GitHub</span>*/}
          </div>
          <div className={styles.repoActionContainer}>
            <button
              className={classNames(styles.repoAction, styles.praiseButton)}
            >
              <FavoriteBorderIcon className={styles.favoriteIcon} />
            </button>
            {/*<span className={styles.tooltip}>Praise repo</span>*/}
          </div>
          <div className={styles.repoActionContainer}>
            <button
              className={classNames(styles.repoAction, styles.openButton)}
            >
              <CodeIcon className={styles.favoriteIcon} />
            </button>
            {/*<span className={styles.tooltip}>View PRs</span>*/}
          </div>
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
