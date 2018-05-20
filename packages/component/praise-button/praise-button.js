import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import styles from "./praise-button.scss";
import classNames from "classnames";

class PraiseButton extends PureComponent {
  constructor(props) {
    super(props);

    this.onPraiseClick = this.onPraiseClick.bind(this);
  }

  onPraiseClick(e) {
    const elem = e.currentTarget;
    elem.classList.add(styles.clicked);
    elem.classList.remove(styles.praiseButtonHover);
    this._praiseCount.classList.remove(styles.praiseCountVisible);

    if (this.props.isPraiseEnabled) {
      this.props.onPraiseClickCallback().then(() => {
        elem.classList.remove(styles.clicked);
        elem.classList.add(styles.praiseButtonHover);
        this._praiseCount.classList.add(styles.praiseCountVisible);
      });
    } else {
      elem.classList.remove(styles.clicked);
      elem.classList.add(styles.praiseButtonHover);
      this.props.onPraisePreventedCallback();
    }
  }

  render() {
    return (
      <div className={styles.praiseActionContainer}>
        <span className={styles.praiseCount} ref={r => (this._praiseCount = r)}>
          +1
        </span>
        <button
          className={classNames(
            styles.repoAction,
            styles.praiseButton,
            styles.praiseButtonHover
          )}
          onClick={e => {
            e.stopPropagation();
            this.onPraiseClick(e);
          }}
        >
          <FavoriteBorderIcon className={styles.favoriteIcon} />
        </button>
      </div>
    );
  }
}

PraiseButton.propTypes = {
  isPraiseEnabled: PropTypes.bool,
  onPraisePreventedCallback: PropTypes.func.isRequired,
  onPraiseClickCallback: PropTypes.func.isRequired
};

export default PraiseButton;
