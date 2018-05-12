import React, { Component } from "react";
import PropTypes from "prop-types";

import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

import styles from "./pagination.scss";

class Pagination extends Component {
  render() {
    return (
      <div className={styles.paginationContainer}>
        {this.props.showPrevButton ? (
          <ChevronLeft
            className={styles.paginationArrow}
            onClick={this.props.onPrevClick}
          />
        ) : null}
        {this.props.showNextButton ? (
          <ChevronRight
            className={styles.paginationArrow}
            onClick={this.props.onNextClick}
          />
        ) : null}
      </div>
    );
  }
}

Pagination.propTypes = {
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func
};

Pagination.defaultProps = {
  onPrevClick: () => {},
  onNextClick: () => {}
};

export default Pagination;
