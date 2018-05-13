import React, { Component } from "react";
import PropTypes from "prop-types";

import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

import classNames from "classnames";
import styles from "./pagination.scss";

class Pagination extends Component {
  render() {
    return (
      <div className={styles.paginationContainer}>
        <span
          className={classNames(styles.paginationButton, {
            [styles.arrowHidden]: !this.props.showPrevButton
          })}
          onClick={this.props.onPrevClick}
        >
          <ChevronLeft className={styles.paginationArrow} />
        </span>
        <span
          className={classNames(styles.paginationButton, {
            [styles.arrowHidden]: !this.props.showNextButton
          })}
          onClick={this.props.onNextClick}
        >
          <ChevronRight className={styles.paginationArrow} />
        </span>
      </div>
    );
  }
}

Pagination.propTypes = {
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  showNextButton: PropTypes.bool,
  showPrevButton: PropTypes.bool
};

Pagination.defaultProps = {
  onPrevClick: () => {},
  onNextClick: () => {}
};

export default Pagination;
