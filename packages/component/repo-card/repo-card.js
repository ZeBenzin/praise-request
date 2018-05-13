import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
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

        <button className={styles.praiseButton}>
          <FavoriteBorder className={styles.favoriteIcon} />
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
