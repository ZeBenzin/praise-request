import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PersonIcon from "@material-ui/icons/PersonOutline";
import StarIcon from "@material-ui/icons/StarBorder";

import { executeTransaction } from "ui/api/transaction";

import classNames from "classnames";
import styles from "./repo-card.scss";

class RepoCard extends PureComponent {
  constructor(props) {
    super(props);

    this.onPraiseClick = this.onPraiseClick.bind(this);
  }

  onPraiseClick(e) {
    const elem = e.currentTarget;
    elem.classList.add(styles.clicked);

    if (this.props.isUserAuthenticated) {
      executeTransaction(this.props.repo.owner)
        .then(() => {
          elem.classList.remove(styles.clicked);
        })
        .catch(err => console.log(err));
    } else {
      elem.classList.remove(styles.clicked);
      this.props.displayFooter();
    }
  }

  render() {
    const { name, description, owner, id, stargazers_count } = this.props.repo;
    return (
      <div className={styles.repoCardWrapper}>
        <div
          id={id}
          className={styles.repoCardContainer}
          onClick={this.props.onClick}
        >
          <div className={styles.repoCard}>
            <div className={styles.repoDetails}>
              <div>
                <div className={styles.repoHeaderInfo}>
                  <div className={styles.repoName}>{name}</div>
                </div>
                <div className={styles.repoDescription} title={description}>
                  {description && description.length > 100
                    ? description.substring(0, 100) + " ..."
                    : description}
                </div>
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
            <span className={styles.praiseCount}>125</span>
            <button
              className={classNames(styles.repoAction, styles.praiseButton)}
              onClick={e => {
                e.stopPropagation();
                this.onPraiseClick(e);
              }}
            >
              <FavoriteBorderIcon className={styles.favoriteIcon} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

RepoCard.propTypes = {
  repo: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  displayFooter: PropTypes.func.isRequired,
  isUserAuthenticated: PropTypes.bool
};

RepoCard.defaultProps = {
  onClick: () => {}
};

export default RepoCard;
