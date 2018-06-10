// Este contenedor valida si el usuario esta logueado o no y da acceso a
// la pagina principal de la aplicación.
import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import glamorous, { ThemeProvider } from "glamorous";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "react-router-modal/css/react-router-modal.css";
import {
  setClosedMenuNotifications,
  setClosedMenuAlerts,
  setClosedMenuSettings,
  setClosedMenuUser
} from "../components/toolbar/actions.js";

import { setSetStateGroupMenu } from "../components/statisticsLayers/erlang/actions";
import { setSetStateGroupMenu as setSetStateGroupMenuCcrPcr } from "../components/statisticsLayers/ccrPcr/actions";
import { setSetStateGroupMenu as setSetStateGroupMenuPayload } from "../components/statisticsLayers/payload/actions";
import { setSetStateGroupMenu as setSetStateGroupMenuThroughput } from "../components/statisticsLayers/throughput/actions";
import { setSetStateGroupMenu as setSetStateGroupMenuUsers } from "../components/statisticsLayers/users/actions";
import { setSetStateGroupMenu as setSetStateGroupMenuClusters } from "../components/statisticsLayers/clusters/actions";
import { setSetStateGroupMenu as setSetStateGroupMenuMarkets } from "../components/statisticsLayers/markets/actions";
import { setSetStateGroupMenu as setSetStateGroupMenuStates } from "../components/statisticsLayers/states/actions";

import {
  DashboardLayer,
  GroupsLayer,
  ReportsLayer,
  StatusLayer,
  ShortcutsLayer,
  UsersLayer
} from "./";

//Importando Sublayers de estadisticas
import Erlang from "../components/statisticsLayers/erlang/";
import Payload from "../components/statisticsLayers/payload/";
import Throughput from "../components/statisticsLayers/throughput/";
import CcrPcr from "../components/statisticsLayers/ccrPcr/";
import Users from "../components/statisticsLayers/users/";
import DropcallCsfHof from "../components/statisticsLayers/dropcallCsfHof/";

//Importando Sublayer de mercados
import Markets from "../components/statisticsLayers/markets/";
import States from "../components/statisticsLayers/states/";
import Clusters from "../components/statisticsLayers/clusters/";

//Importando elementos principales
import Toolbar from "../components/toolbar";
import Sidebar from "../components/sidebar";
import LoginSignupLayer from "./LoginSignupLayer";
import MoreAlertDetails from "../components/moreAlertDetails";

import { checkAuthorization } from "../lib/check-auth.js";
import { setThemeFromLocalStorage } from "../components/uiThemes/actions";
const { Div } = glamorous;

class MainLayer extends Component {
  constructor(props) {
    super(props);
    this.handleRefHideAllMenus = this.handleRefHideAllMenus.bind(this);
  }

  handleRefHideAllMenus() {
    this.props.actions.setClosedMenuNotifications();
    this.props.actions.setClosedMenuAlerts();
    this.props.actions.setClosedMenuSettings();
    this.props.actions.setClosedMenuUser();
    if (this.props.stateGroupOptionErlang)
      this.props.actions.setSetStateGroupMenu(false);
    if (this.props.stateGroupOptionCcrPcr)
      this.props.actions.setSetStateGroupMenuCcrPcr(false);
    if (this.props.stateGroupOptionPayload)
      this.props.actions.setSetStateGroupMenuPayload(false);
    if (this.props.stateGroupOptionThroughput)
      this.props.actions.setSetStateGroupMenuThroughput(false);
    if (this.props.stateGroupOptionUsers)
      this.props.actions.setSetStateGroupMenuUsers(false);
    if (this.props.stateGroupOptionCluster)
      this.props.actions.setSetStateGroupMenuClusters(false);
    if (this.props.stateGroupOptionMarkets)
      this.props.actions.setSetStateGroupMenuMarkets(false);
    if (this.props.stateGroupOptionStates)
      this.props.actions.setSetStateGroupMenuStates(false);
  }

  componentWillMount() {
    checkAuthorization();
    let uiTheme = JSON.parse(localStorage.getItem("uiTheme"));
    if (uiTheme) {
      this.props.actions.setThemeFromLocalStorage(uiTheme);
    }
  }

  render() {
    const { navShow, token } = this.props;
    return (
      <Div>
        {token === null ? (
          <Div>
            <LoginSignupLayer />
          </Div>
        ) : (
          <ThemeProvider theme={this.props.appTheme}>
            <Div>
              <Toolbar />
              <Div css={{ display: "flex" }}>
                <Sidebar hideAllMenusOutside={this.handleRefHideAllMenus} />
                <Div
                  css={{
                    width: "100%",
                    marginLeft: navShow ? 0 : "-16.9em",
                    padding: "0 0.5em 0 0.5em",
                    background: this.props.appTheme.primaryLevelBgColor,
                    color: this.props.appTheme.fontColor,
                    fontFamily: "Arial"
                  }}
                  onClick={() => {
                    this.handleRefHideAllMenus();
                  }}
                >
                  <MoreAlertDetails />
                  <Switch>
                    <Route path="/" exact component={DashboardLayer} />
                    <Route path="/groups" exact component={GroupsLayer} />
                    <Route path="/markets" exact component={Markets} />
                    <Route path="/reports" exact component={ReportsLayer} />
                    <Route path="/statitics/erlang" exact component={Erlang} />
                    <Route
                      path="/statitics/payload"
                      exact
                      component={Payload}
                    />
                    <Route
                      path="/statitics/throughput"
                      exact
                      component={Throughput}
                    />
                    <Route path="/statitics/ccrpcr" exact component={CcrPcr} />
                    <Route path="/statitics/users" exact component={Users} />
                    <Route
                      path="/statitics/dropcallcsfhof"
                      exact
                      component={DropcallCsfHof}
                    />
                    <Route path="/status" exact component={StatusLayer} />
                    <Route path="/shortcuts" exact component={ShortcutsLayer} />
                    <Route path="/states" exact component={States} />
                    <Route path="/clusters" exact component={Clusters} />
                    <Route path="/users" exact component={UsersLayer} />
                  </Switch>
                </Div>
              </Div>
            </Div>
          </ThemeProvider>
        )}
      </Div>
    );
  }
}

const mapStateToProps = state => {
  return {
    navShow: state.toolbar.nav_show,
    stateGroupOptionErlang: state.statisticsErlang.stateGroupOption,
    stateGroupOptionCcrPcr: state.statisticsCcrPcr.stateGroupOption,
    stateGroupOptionPayload: state.statisticsPayload.stateGroupOption,
    stateGroupOptionThroughput: state.statisticsThroughput.stateGroupOption,
    stateGroupOptionUsers: state.statisticsUsers.stateGroupOption,
    stateGroupOptionStates: state.statisticsStates.stateGroupOption,
    stateGroupOptionMarkets: state.statisticsMarkets.stateGroupOption,
    stateGroupOptionCluster: state.statisticsClusters.stateGroupOption,
    token: state.client.token,
    fullscreen: state.toolbar.fullscreen,
    appTheme: state.uiThemes.appliedTheme
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setClosedMenuNotifications,
        setClosedMenuAlerts,
        setClosedMenuSettings,
        setClosedMenuUser,
        setSetStateGroupMenu,
        setSetStateGroupMenuCcrPcr,
        setSetStateGroupMenuPayload,
        setSetStateGroupMenuThroughput,
        setSetStateGroupMenuUsers,
        setSetStateGroupMenuClusters,
        setSetStateGroupMenuMarkets,
        setSetStateGroupMenuStates,
        setThemeFromLocalStorage
      },
      dispatch
    )
  };
};

const MainLayerConnect = connect(mapStateToProps, mapDispatchToProps)(
  MainLayer
);

export default withRouter(MainLayerConnect);
