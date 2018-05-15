import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";

import Home from "ui/views/home";
import Search from "ui/views/search";
import Account from "ui/views/account";
import Activity from "ui/views/activity";
import Statistic from "ui/views/statistic";
import About from "ui/views/about";
import SearchOverlay from "ui/components/search-overlay/search-overlay";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import ActivityIcon from "@material-ui/icons/History";
import StatisticIcon from "@material-ui/icons/ShowChart";
import AboutIcon from "@material-ui/icons/Info";

import Header from "ui/components/header/header";
import Drawer from "component/drawer/drawer";
import Footer from "component/footer/footer";

import { getSessionStatus } from "ui/api/user";

import classNames from "classnames";
import styles from "./app.scss";

export const ErrorContext = React.createContext("error");
export const AuthenticationContext = React.createContext("auth");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityVisible: false,
      footerVisible: false,
      isUserAuthenticated: false,
      checkingUserAuthenticationStatus: true,
      isSearchVisible: false
    };

    this.hideFooter = this.hideFooter.bind(this);
    this.displayFooter = this.displayFooter.bind(this);
    this.toggleSearchOverlay = this.toggleSearchOverlay.bind(this);
  }

  componentWillMount() {
    if (localStorage.getItem("praiseRequestToken")) {
      return getSessionStatus()
        .then(data => {
          this.setState({
            isUserAuthenticated: data.status === 200,
            checkingUserAuthenticationStatus: false
          });
        })
        .catch(() => {
          this.setState({
            checkingUserAuthenticationStatus: false,
            isUserAuthenticated: false
          });
        });
    } else {
      this.setState({
        checkingUserAuthenticationStatus: false,
        isUserAuthenticated: false
      });
    }
  }

  getNavLinks() {
    return [
      {
        id: "home",
        label: "Home",
        path: "/",
        exact: true,
        icon: <HomeIcon className={styles.navIconElem} />,
        view: Home,
        style: styles.homeIconLabel,
        visible: true
      },
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
        visible: this.state.isUserAuthenticated
      },
      {
        id: "activity",
        label: "Activity",
        path: "/activity",
        exact: false,
        icon: <ActivityIcon className={styles.navIconElem} />,
        view: Activity,
        style: styles.activityIconLabel,
        visible: this.state.isUserAuthenticated
      },
      {
        id: "statistic",
        label: "Stats",
        path: "/statistic",
        exact: false,
        icon: <StatisticIcon className={styles.navIconElem} />,
        view: Statistic,
        style: styles.statisticIconLabel,
        visible: this.state.isUserAuthenticated
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

  onUserAuthenticated() {
    this.setState({ isUserAuthenticated: true });
  }

  onUserLogOut() {
    this.setState({ isUserAuthenticated: false });
  }

  toggleSearchOverlay() {
    this.setState({ isSearchVisible: !this.state.isSearchVisible });
  }

  hideFooter() {
    this.setState({ footerVisible: false });
  }

  displayFooter() {
    this.setState({ footerVisible: true });
  }

  renderNavLink({ id, label, icon, path, style, exact }) {
    return (
      <NavLink
        className={styles.navLinkAnchor}
        activeClassName={styles.activeNavLink}
        key={id}
        to={path}
        exact={exact}
        onClick={() => {
          return this.state.isSearchVisible ? this.toggleSearchOverlay() : null;
        }}
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

  renderRoute({ id, path, view: View, exact }) {
    return (
      <Route
        key={id}
        exact={exact}
        path={path}
        render={() => (
          <View
            isUserAuthenticated={this.state.isUserAuthenticated}
            displayFooter={this.displayFooter}
          />
        )}
      />
    );
  }

  renderErrorToast() {
    /**
     * Just some thoughts:
     * if we pass a prop onError to ALL children, when they error they can
     * just call the callback which will display a toast in this component <App />.
     */
    console.log("Toast");
  }

  renderActivityItem({ date, description }, index) {
    return (
      <div key={index} className={styles.activityItem}>
        <div className={styles.activityDate}>
          <span>{date}</span>
        </div>
        <div className={styles.activityTimelineIcon}>
          <div className={styles.line} />
          <div className={styles.timelinePoint} />
          <div className={styles.line} />
        </div>
        <div className={styles.activityDescription}>{description}</div>
      </div>
    );
  }

  renderDrawerContent() {
    const activityItems = [
      { date: "JAN 01", description: "You sent a thing to a thing" },
      { date: "JAN 01", description: "You sent a thing to a thing" },
      { date: "JAN 01", description: "You sent a thing to a thing" },
      { date: "JAN 01", description: "You sent a thing to a thing" },
      { date: "JAN 01", description: "You sent a thing to a thing" },
      { date: "JAN 01", description: "You sent a thing to a thing" },
      { date: "JAN 01", description: "You sent a thing to a thing" },
      { date: "JAN 01", description: "You sent a thing to a thing" }
    ];
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
          {activityItems.map((item, index) => {
            return this.renderActivityItem(item, index);
          })}
        </div>
      </div>
    );
  }

  render() {
    return (
      <AuthenticationContext.Provider
        value={state => {
          if (state === "login") {
            this.onUserAuthenticated();
          } else if (state === "logout") {
            this.onUserLogOut();
          }
        }}
      >
        <ErrorContext.Provider value={() => this.renderErrorToast()}>
          <Router>
            {!this.state.checkingUserAuthenticationStatus ? (
              <div className={styles.app}>
                <div className={styles.appContainer} onClick={this.hideFooter}>
                  <div className={styles.sidebar}>
                    <div className={styles.logo}>
                      <span className={styles.logoName}>{`<PR />`}</span>
                    </div>
                    <div className={styles.navLinks}>
                      {this.getNavLinks()
                        .filter(link => link.visible)
                        .map(link => this.renderNavLink(link))}
                    </div>
                  </div>
                  <div className={styles.rightContentContainer}>
                    <Header
                      onActivityIconClick={() =>
                        this.setState({
                          activityVisible: !this.state.activityVisible
                        })
                      }
                      isUserAuthenticated={this.state.isUserAuthenticated}
                      toggleSearchOverlay={this.toggleSearchOverlay}
                    />
                    <Drawer
                      isVisible={this.state.activityVisible}
                      drawerContent={this.renderDrawerContent()}
                    />
                    <div className={styles.content}>
                      <SearchOverlay
                        isSearchVisible={this.state.isSearchVisible}
                        toggleSearchOverlay={this.toggleSearchOverlay}
                        onClick={() => {
                          return this.state.isSearchVisible
                            ? this.toggleSearchOverlay()
                            : null;
                        }}
                      />
                      <div className={styles.mainContent}>
                        {this.getNavLinks().map(link => this.renderRoute(link))}
                      </div>
                    </div>
                  </div>
                </div>
                <Footer
                  isVisible={this.state.footerVisible}
                  hideFooter={this.hideFooter}
                />
              </div>
            ) : null}
          </Router>
        </ErrorContext.Provider>
      </AuthenticationContext.Provider>
    );
  }
}

export default App;
