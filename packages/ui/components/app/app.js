import React, { Component } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch
} from "react-router-dom";

import Home from "ui/views/home/home";
import Search from "ui/views/search/search";
import Activity from "ui/views/activity/activity";
import Statistic from "ui/views/statistic/statistic";
import About from "ui/views/about/about";
import Callback from "ui/views/callback/callback";
import SearchOverlay from "ui/components/search-overlay/search-overlay";
import LedgerDrawer from "ui/components/ledger-drawer/ledger-drawer";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import ActivityIcon from "@material-ui/icons/History";
import StatisticIcon from "@material-ui/icons/ShowChart";
import AboutIcon from "@material-ui/icons/Info";

import Header from "ui/components/header/header";
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
      isSearchVisible: false,
      userData: {}
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
            checkingUserAuthenticationStatus: false,
            userData: data.data
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
        exact: true,
        icon: <SearchIcon className={styles.navIconElem} />,
        view: Search,
        style: styles.searchIconLabel,
        visible: true
      },
      {
        id: "activity",
        label: "Activity",
        path: "/activity",
        exact: true,
        icon: <ActivityIcon className={styles.navIconElem} />,
        view: Activity,
        style: styles.activityIconLabel,
        visible: this.state.isUserAuthenticated
      },
      {
        id: "statistic",
        label: "Stats",
        path: "/statistic",
        exact: true,
        icon: <StatisticIcon className={styles.navIconElem} />,
        view: Statistic,
        style: styles.statisticIconLabel,
        visible: this.state.isUserAuthenticated
      },
      {
        id: "about",
        label: "About",
        path: "/about",
        exact: true,
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
            userData={this.state.userData}
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

  renderAppRoute() {
    return (
      <div className={styles.app}>
        <div className={styles.appContainer}>
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
            <LedgerDrawer
              isVisible={this.state.activityVisible}
              userData={this.state.userData}
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
              <div>
                <Switch>
                  <Route
                    exact
                    path="/auth/github/callback"
                    component={Callback}
                  />
                  <Route
                    exact={false}
                    path="/"
                    render={() => this.renderAppRoute()}
                  />
                </Switch>
              </div>
            ) : null}
          </Router>
        </ErrorContext.Provider>
      </AuthenticationContext.Provider>
    );
  }
}

export default App;
