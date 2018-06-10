import React, { Component } from "react";
import glamorous, { withTheme } from "glamorous";
import { connect } from "react-redux";
import FontAwesome from "react-fontawesome";
import io from "socket.io-client";
import {
  setUnhideNav,
  setHideNav,
  setOpenAMenuNotifications,
  setClosedMenuNotifications,
  setOpenAMenuAlerts,
  setClosedMenuAlerts,
  setOpenAMenuSettings,
  setClosedMenuSettings,
  setOpenAMenuUser,
  setClosedMenuUser,
  setNotificationsResetCount,
  setAlertResetCount,
  fullScreenMode,
  getAlertsToolbar,
  getAlertsToolbarSuccess,
  markReadAlerts,
  setAlertCount
} from "./actions";

import {
  setDropMenuRegionSelector,
  setHoverLeaveRegionLock
} from "../dashboard/actions";
import { setSetStateGroupMenu } from "../statisticsLayers/erlang/actions";
import { setSetStateGroupMenu as setSetStateGroupMenuCcrPcr } from "../statisticsLayers/ccrPcr/actions";
import { setSetStateGroupMenu as setSetStateGroupMenuPayload } from "../statisticsLayers/payload/actions";
import { setSetStateGroupMenu as setSetStateGroupMenuThroughput } from "../statisticsLayers/throughput/actions";
import { setSetStateGroupMenu as setSetStateGroupMenuUsers } from "../statisticsLayers/users/actions";
import { setSetStateGroupMenu as setSetStateGroupMenuClusters } from "../statisticsLayers/clusters/actions";
import { setSetStateGroupMenu as setSetStateGroupMenuMarkets } from "../statisticsLayers/markets/actions";
import { setSetStateGroupMenu as setSetStateGroupMenuStates } from "../statisticsLayers/states/actions";

import { unsetClientResquest } from "../client/actions";

// Importando componentes del toolbar
import Logo from "./components/logo";
import AlertBadge from "./components/alertBadge";

import UserDropdownMenu from "./components/userDropdownMenu";
import SettingsDropdownMenu from "./components/settingsDropdownMenu";

import { setModalOpenState, setAlertData } from "../moreAlertDetails/actions";

const { Div } = glamorous;

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.handleStateSidebar = this.handleStateSidebar.bind(this);
    this.handleMenu_settings = this.handleMenu_settings.bind(this);
    this.handleMenu_settings_hover = this.handleMenu_settings_hover.bind(this);
    this.handleMenu_user = this.handleMenu_user.bind(this);
    this.handleMenu_user_hover = this.handleMenu_user_hover.bind(this);
    this.handleHideMenus = this.handleHideMenus.bind(this);
    this.handleHideMenusOusideEvent = this.handleHideMenusOusideEvent.bind(
      this
    );
    this.handleMenu_alerts = this.handleMenu_alerts.bind(this);
    this.handleMenu_alerts_hover = this.handleMenu_alerts_hover.bind(this);
    this.handleFullScreenMode = this.handleFullScreenMode.bind(this);
  }

  handleFullScreenMode() {
    if (this.props.fullscreen) {
      this.props.fullScreenMode(false);
    } else {
      this.props.fullScreenMode(true);
    }
  }

  handleStateSidebar() {
    const socket = io("http://localhost:3000/");
    socket.emit("mark alerts read", this.props.user.ID);
    if (this.props.navShow === true) {
      this.props.setHideNav();
    } else {
      this.props.setUnhideNav();
    }
  }

  handleMenu_alerts_hover() {
    if (
      this.props.menu_notification ||
      this.props.menu_user ||
      this.props.menu_settings ||
      this.props.stateGroupOption ||
      this.props.stateGroupOptionErlang ||
      this.props.stateGroupOptionCcrPcr ||
      this.props.stateGroupOptionPayload ||
      this.props.stateGroupOptionThroughput ||
      this.props.stateGroupOptionUsers ||
      this.props.stateGroupOptionCluster ||
      this.props.stateGroupOptionMarkets ||
      this.props.stateGroupOptionStates
    ) {
      this.props.setOpenAMenuAlerts();
      this.props.setClosedMenuUser();
      this.props.setClosedMenuNotifications();
      this.props.setClosedMenuSettings();
      this.props.setAlertResetCount();
      this.props.setSetStateGroupMenu(false);
      this.props.setSetStateGroupMenuCcrPcr(false);
      this.props.setSetStateGroupMenuPayload(false);
      this.props.setSetStateGroupMenuThroughput(false);
      this.props.setSetStateGroupMenuUsers(false);
      this.props.setSetStateGroupMenuStates(false);
      this.props.setSetStateGroupMenuClusters(false);
      this.props.setSetStateGroupMenuMarkets(false);
    }
  }

  handleMenu_alerts() {
    if (this.props.menu_alert === false) {
      this.props.setOpenAMenuAlerts();
      this.props.setAlertResetCount();
    } else {
      this.props.setClosedMenuAlerts();
    }
  }

  handleMenu_settings_hover() {
    if (
      this.props.menu_user ||
      this.props.menu_notification ||
      this.props.menu_alert ||
      this.props.stateGroupOption ||
      this.props.stateGroupOptionErlang ||
      this.props.stateGroupOptionCcrPcr ||
      this.props.stateGroupOptionPayload ||
      this.props.stateGroupOptionThroughput ||
      this.props.stateGroupOptionUsers ||
      this.props.stateGroupOptionCluster ||
      this.props.stateGroupOptionMarkets ||
      this.props.stateGroupOptionStates
    ) {
      this.props.setOpenAMenuSettings();
      this.props.setClosedMenuUser();
      this.props.setClosedMenuAlerts();
      this.props.setClosedMenuNotifications();
      this.props.setSetStateGroupMenu(false);
      this.props.setSetStateGroupMenuCcrPcr(false);
      this.props.setSetStateGroupMenuPayload(false);
      this.props.setSetStateGroupMenuThroughput(false);
      this.props.setSetStateGroupMenuUsers(false);
      this.props.setSetStateGroupMenuStates(false);
      this.props.setSetStateGroupMenuClusters(false);
      this.props.setSetStateGroupMenuMarkets(false);
    }
  }

  handleMenu_settings() {
    if (this.props.menu_settings === false) {
      this.props.setOpenAMenuSettings();
    } else {
      this.props.setClosedMenuSettings();
    }
  }

  handleMenu_user_hover() {
    if (
      this.props.menu_settings ||
      this.props.menu_alert ||
      this.props.menu_notification ||
      this.props.stateGroupOptionErlang ||
      this.props.stateGroupOptionCcrPcr ||
      this.props.stateGroupOptionPayload ||
      this.props.stateGroupOptionThroughput ||
      this.props.stateGroupOptionUsers ||
      this.props.stateGroupOptionCluster ||
      this.props.stateGroupOptionMarkets ||
      this.props.stateGroupOptionStates
    ) {
      this.props.setOpenAMenuUser();
      this.props.setClosedMenuSettings();
      this.props.setClosedMenuNotifications();
      this.props.setClosedMenuAlerts();
      this.props.setSetStateGroupMenu(false);
      this.props.setSetStateGroupMenuCcrPcr(false);
      this.props.setSetStateGroupMenuPayload(false);
      this.props.setSetStateGroupMenuThroughput(false);
      this.props.setSetStateGroupMenuUsers(false);
      this.props.setSetStateGroupMenuStates(false);
      this.props.setSetStateGroupMenuClusters(false);
      this.props.setSetStateGroupMenuMarkets(false);
    }
  }

  handleMenu_user() {
    if (this.props.menu_user === false) {
      this.props.setOpenAMenuUser();
    } else {
      this.props.setClosedMenuUser();
    }
  }

  handleHideMenus() {
    if (this.props.menu_user) this.props.setClosedMenuUser();
    if (this.props.menu_settings) this.props.setClosedMenuSettings();
    if (this.props.menu_notification) this.props.setClosedMenuNotifications();
    if (this.props.menu_alert) this.props.setClosedMenuAlerts();
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
    //Hide DropMenu For Regions In Dashboard
    if (
      this.props.dropMenuShowSelectorRegion &&
      this.props.hoverLeaveLock === false
    ) {
      this.props.setDropMenuRegionSelector(false);

      this.props.setHoverLeaveRegionLock(true);
    }
  }

  handleHideMenusOusideEvent() {
    this.props.setClosedMenuUser();
    this.props.setClosedMenuSettings();
    this.props.setClosedMenuNotifications();
    this.props.setClosedMenuAlerts();
    this.props.setSetStateGroupMenu(false);
    this.props.setSetStateGroupMenuCcrPcr(false);
    this.props.setSetStateGroupMenuPayload(false);
    this.props.setSetStateGroupMenuThroughput(false);
    this.props.setSetStateGroupMenuUsers(false);
    this.props.setSetStateGroupMenuStates(false);
    this.props.setSetStateGroupMenuClusters(false);
    this.props.setSetStateGroupMenuMarkets(false);
  }

  render() {
    const { navShow } = this.props;
    return (
      <Div
        css={{
          width: "100%",
          minWidth: "78em",
          height: "2.5em",
          background: this.props.theme.tertiaryLevelBgColor,
          position: "relative",
          color: "white",
          display: "flex",
          boxShadow: navShow
            ? "0 0 0em 0 rgba(0,0,0,0.75)"
            : "0 0 1em 0 rgba(0,0,0,0.75)",
          zIndex: 2
        }}
        onClick={this.handleHideMenus}
      >
        <Div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.5em",
            minWidth: "2.5em",
            height: "2.5em",
            background: this.props.theme.tertiaryLevelBgColor,
            cursor: "pointer",
            ":hover": {
              background: this.props.theme.secondaryLevelBgColor
            }
          }}
          onClick={this.handleStateSidebar}
        >
          <FontAwesome
            name="bars"
            size="lg"
            style={{
              textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
              color: this.props.theme.fontColor
            }}
          />
        </Div>
        <Div
          css={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "2.5em",
            justifyContent: "flex-start"
          }}
        >
          <Logo />

          <AlertBadge
            resetCount={this.props.setAlertResetCount}
            alerts_count={this.props.alerts_count}
            stateMenuAlert={this.props.menu_alert}
            changeMenuAlerts={this.handleMenu_alerts}
            changeMenuAlertsHover={this.handleMenu_alerts_hover}
            alerts={this.props.alerts}
            setModalOpenState={this.props.setModalOpenState}
            setHideNav={this.props.setHideNav}
            stateNav={this.props.navShow}
            setUnhideNav={this.props.setUnhideNav}
            setAlertData={this.props.setAlertData}
            setAlertCount={this.props.setAlertCount}
            getAlertsToolbar={this.props.getAlertsToolbar}
            markReadAlerts={this.props.markReadAlerts}
            getAlertsToolbarSuccess={this.props.getAlertsToolbarSuccess}
            user={this.props.user}
          />
          {/*<RefreshData />*/}
        </Div>
        <Div
          css={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "2.5em",
            justifyContent: "flex-end"
          }}
        >
          <UserDropdownMenu
            userName={this.props.user.FIRST_NAME}
            changeMenuUser={this.handleMenu_user}
            changeMenuUserHover={this.handleMenu_user_hover}
            stateMenuUser={this.props.menu_user}
            logoutAction={this.props.unsetClientResquest}
          />
          {this.props.user.USER_LEVEL === 0 ||
          this.props.user.USER_LEVEL === 1 ? (
            <SettingsDropdownMenu
              userLevel={this.props.user.USER_LEVEL}
              changeMenuSettings={this.handleMenu_settings}
              changeMenuSettingsHover={this.handleMenu_settings_hover}
              stateMenuSettings={this.props.menu_settings}
            />
          ) : null}
        </Div>
      </Div>
    );
  }
}
const mapStateToProps = state => {
  return {
    navShow: state.toolbar.nav_show,
    menu_settings: state.toolbar.menu_settings,
    menu_user: state.toolbar.menu_user,
    menu_notification: state.toolbar.menu_notification,
    menu_alert_hover: state.toolbar.menu_alert_hover,
    menu_alert: state.toolbar.menu_alert,
    notifications_count: state.toolbar.notifications_count,
    alerts_count: state.toolbar.alerts_count,
    notifications: state.toolbar.notifications,
    alerts: state.toolbar.alerts,
    stateGroupOptionErlang: state.statisticsErlang.stateGroupOption,
    stateGroupOptionCcrPcr: state.statisticsCcrPcr.stateGroupOption,
    stateGroupOptionPayload: state.statisticsPayload.stateGroupOption,
    stateGroupOptionThroughput: state.statisticsThroughput.stateGroupOption,
    stateGroupOptionUsers: state.statisticsUsers.stateGroupOption,
    stateGroupOptionStates: state.statisticsStates.stateGroupOption,
    stateGroupOptionMarkets: state.statisticsMarkets.stateGroupOption,
    stateGroupOptionCluster: state.statisticsClusters.stateGroupOption,
    user: state.client.user,
    fullscreen: state.toolbar.fullscreen,
    dropMenuShowSelectorRegion: state.dashboard.dropMenuShowSelectorRegion,
    hoverLeaveLock: state.dashboard.hoverLeaveLock
  };
};

const ToolbarConected = connect(mapStateToProps, {
  unsetClientResquest,
  setUnhideNav,
  setHideNav,
  setOpenAMenuNotifications,
  setClosedMenuNotifications,
  setOpenAMenuAlerts,
  setClosedMenuAlerts,
  setOpenAMenuSettings,
  setClosedMenuSettings,
  setOpenAMenuUser,
  setClosedMenuUser,
  setNotificationsResetCount,
  setAlertResetCount,
  setSetStateGroupMenu,
  setSetStateGroupMenuCcrPcr,
  setSetStateGroupMenuPayload,
  setSetStateGroupMenuThroughput,
  setSetStateGroupMenuUsers,
  setSetStateGroupMenuStates,
  setSetStateGroupMenuClusters,
  setSetStateGroupMenuMarkets,
  fullScreenMode,
  setDropMenuRegionSelector,
  setHoverLeaveRegionLock,
  setModalOpenState,
  setAlertData,
  setAlertCount,
  getAlertsToolbar,
  getAlertsToolbarSuccess,
  markReadAlerts
})(Toolbar);

export default withTheme(ToolbarConected);
