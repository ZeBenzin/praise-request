import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Done from "@material-ui/icons/Done";
import Cached from "@material-ui/icons/Cached";
import Close from "@material-ui/icons/Close";
import Gavel from "@material-ui/icons/Gavel";

import classnames from "classnames";
import styles from "./transaction-status.scss";

const statusIconMap = {
  complete: {
    icon: <Done />,
    iconClassName: styles.doneIcon,
    containerClassName: styles.txStatusIcon
  },
  processing: {
    icon: <Cached />,
    iconClassName: styles.processingIcon,
    containerClassName: styles.txStatusIcon
  },
  failed: {
    icon: <Close />,
    iconClassName: styles.failedIcon,
    containerClassName: styles.txStatusIcon
  },
  waiting_for_mining: {
    icon: <Gavel />,
    iconClassName: styles.miningIcon,
    containerClassName: styles.txStatusIcon
  }
};

class TransactionStatus extends PureComponent {
  render() {
    return (
      <div
        className={classnames(
          this.props.containerClassName,
          statusIconMap[this.props.status].containerClassName,
          statusIconMap[this.props.status].iconClassName
        )}
      >
        {React.cloneElement(statusIconMap[this.props.status].icon, {
          className: classnames(styles.statusIcon, this.props.iconClassName)
        })}
      </div>
    );
  }
}

TransactionStatus.propTypes = {
  containerClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  status: PropTypes.oneOf([
    "complete",
    "processing",
    "failed",
    "waiting_for_mining"
  ]).isRequired
};

export default TransactionStatus;
