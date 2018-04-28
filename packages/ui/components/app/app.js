import React, { Component } from "react";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import Search from "ui/views/search";
import Account from "ui/views/account";
import Wallet from "ui/views/wallet";
import Repo from "ui/views/repo";

import SearchIcon from "component/search-icon/search-icon";
import PersonIcon from "component/person-icon/person-icon";
import WalletIcon from "component/wallet-icon/wallet-icon";

import Header from "ui/components/header/header";

import classNames from "classnames";
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
        icon: <SearchIcon small />,
        view: Search,
        visible: true
      },
      {
        id: "account",
        label: "Account",
        path: "/account",
        exact: false,
        icon: <PersonIcon />,
        view: Account,
        visible: true
      },
      {
        id: "wallet",
        label: "Wallet",
        path: "/wallet",
        exact: false,
        icon: <WalletIcon small />,
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
        <div className={styles.navLink}>
          {icon}
          <span className={styles.navLinkLabel}>{label}</span>
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
            <Header />
            <div className={styles.content}>
              <div className={styles.navBar}>
                {this.getNavLinks().map(link => this.renderNavLink(link))}
              </div>
              <div className={styles.mainContent}>
                {this.getNavLinks().map(link => this.renderRoute(link))}
                <Route path="/search/:id" component={() => <Repo />} />
              </div>
            </div>
          </div>
        </Router>
      </ErrorContext.Provider>
    );
  }
}

export default App;
