import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import Search from "ui/views/search";
import Account from "ui/views/account";
import Wallet from "ui/views/wallet";
import Repo from "ui/views/repo";

import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import WalletIcon from "@material-ui/icons/AccountBalanceWallet";

import Header from "ui/components/header/header";

import styles from "./app.scss";

export const ErrorContext = React.createContext("error");

class App extends Component {
  getNavLinks() {
    return [
      {
        id: "search",
        label: "Search",
        path: "/search",
        exact: false,
        icon: <SearchIcon className={styles.navIconElem} />,
        view: Search,
        visible: true
      },
      {
        id: "account",
        label: "Account",
        path: "/account",
        exact: false,
        icon: <PersonIcon className={styles.navIconElem} />,
        view: Account,
        visible: true
      },
      {
        id: "wallet",
        label: "Wallet",
        path: "/wallet",
        exact: false,
        icon: <WalletIcon className={styles.navIconElem} />,
        view: Wallet,
        visible: true
      }
    ];
  }

  renderNavLink({ id, label, icon, path }) {
    return (
      <NavLink
        className={styles.navLinkAnchor}
        activeClassName={styles.activeNavLink}
        key={id}
        to={path}
      >
        <div className={styles.navIcon}>
          {icon}
          <span className={styles.navIconLabel}>{label}</span>
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
                <Header />
                <div className={styles.content}>
                  <div className={styles.mainContent}>
                    {this.getNavLinks().map(link => this.renderRoute(link))}
                    <Route
                      path="/search/:id"
                      render={routeProps => <Repo {...routeProps} />}
                    />
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
