import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import PersonIcon from "@material-ui/icons/PersonOutline";
import StarIcon from "@material-ui/icons/StarBorder";
import PraiseButton from "component/praise-button/praise-button";

import { executeTransaction } from "ui/api/transaction";

import styles from "./repo-card.scss";

class RepoCard extends PureComponent {
  constructor(props) {
    super(props);

    this.onPraiseClick = this.onPraiseClick.bind(this);
  }

  onPraiseClick() {
    return executeTransaction(this.props.repo.owner).catch(err =>
      console.error("Error executing transaction", err)
    );
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
          <PraiseButton
            onPraiseClickCallback={this.onPraiseClick}
            onPraisePreventedCallback={this.props.displayFooter}
            isPraiseEnabled={this.props.isUserAuthenticated}
          />
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
