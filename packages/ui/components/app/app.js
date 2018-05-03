import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import Search from "ui/views/search";
import Account from "ui/views/account";
import Activity from "ui/views/activity";
import Statistic from "ui/views/statistic";
import About from "ui/views/about";

import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import ActivityIcon from "@material-ui/icons/History";
import StatisticIcon from "@material-ui/icons/ShowChart";
import AboutIcon from "@material-ui/icons/Info";

import Header from "ui/components/header/header";
import Drawer from "component/drawer/drawer";

import classNames from "classnames";
import styles from "./app.scss";

export const ErrorContext = React.createContext("error");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityVisible: false
    };
  }

  getNavLinks() {
    return [
      {
        id: "search",
        label: "Search",
        path: "/search",
        exact: false,
        icon: <SearchIcon className={styles.navIconElem} />,
        view: Search,
        style: styles.searchIconLabel,
        visible: true
      },
      {
        id: "account",
        label: "Account",
        path: "/account",
        exact: false,
        icon: <PersonIcon className={styles.navIconElem} />,
        view: Account,
        style: styles.accountIconLabel,
        visible: true
      },
      {
        id: "activity",
        label: "Activity",
        path: "/activity",
        exact: false,
        icon: <ActivityIcon className={styles.navIconElem} />,
        view: Activity,
        style: styles.activityIconLabel,
        visible: true
      },
      {
        id: "statistic",
        label: "Stats",
        path: "/statistic",
        exact: false,
        icon: <StatisticIcon className={styles.navIconElem} />,
        view: Statistic,
        style: styles.statisticIconLabel,
        visible: true
      },
      {
        id: "about",
        label: "About",
        path: "/about",
        exact: false,
        icon: <AboutIcon className={styles.navIconElem} />,
        view: About,
        style: styles.aboutIconLabel,
        visible: true
      }
    ];
  }

  renderNavLink({ id, label, icon, path, style }) {
    return (
      <NavLink
        className={styles.navLinkAnchor}
        activeClassName={styles.activeNavLink}
        key={id}
        to={path}
      >
        <div className={styles.navIcon}>
          {icon}
          <span className={classNames(styles.navIconLabel, style)}>
            {label}
          </span>
        </div>
      </NavLink>
    );
  }

  renderRoute({ id, path, view, exact }) {
    return <Route key={id} exact={exact} path={path} component={view} />;
  }

  renderErrorToast() {
    /**
     * Just some thoughts:
     * if we pass a prop onError to ALL children, when they error they can
     * just call the callback which will display a toast in this component <App />.
     */
    console.log("Toast");
  }

  renderDrawerContent() {
    return (
      <div className={styles.activityDrawerContent}>
        <div className={styles.balanceContainer}>
          <div className={styles.balance}>
            <span className={styles.balanceAmount}>
              1500<sup className={styles.currencyTicker}>pr</sup>
            </span>
          </div>
        </div>
        <div className={styles.activity}>
          <div className={styles.activityItem}>
            <div className={styles.activityDate}>
              <span>Jul 9</span>
            </div>
            <div className={styles.activityTimelineIcon}>
              <div className={styles.line} />
              <div className={styles.timelinePoint} />
              <div className={styles.line} />
            </div>
            <div className={styles.activityDescription}>
              You sent 21pr to ZakBrown93
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <ErrorContext.Provider value={() => this.renderErrorToast()}>
        <Router>
          <div className={styles.app}>
            <div className={styles.appContainer}>
              <div className={styles.sidebar}>
                <div className={styles.logo}>
                  <span className={styles.logoName}>{`<PR />`}</span>
                </div>
                <div className={styles.navLinks}>
                  {this.getNavLinks().map(link => this.renderNavLink(link))}
                </div>
              </div>
              <div className={styles.rightContentContainer}>
                <Header
                  onActivityIconClick={() =>
                    this.setState({
                      activityVisible: !this.state.activityVisible
                    })
                  }
                />
                <Drawer
                  isVisible={this.state.activityVisible}
                  drawerContent={this.renderDrawerContent()}
                />
                <div className={styles.content}>
                  <div className={styles.mainContent}>
                    {this.getNavLinks().map(link => this.renderRoute(link))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </ErrorContext.Provider>
    );
  }
}

export default App;
