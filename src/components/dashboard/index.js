import React, { Component } from "react";
import glamorous, { withTheme } from "glamorous";
import { Scrollbars } from "react-custom-scrollbars";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import StreamTable from "./components/streamTable";

import PayloadMTD from "./components/payloadMTD";
import PayloadLastByMonth from "./components/payloadLastByMonth";
import ErlangMTD from "./components/erlangMTD";
import ErlangLastByMonth from "./components/erlangLastByMonth";
import TopPayload from "./components/topPayload";
import TopErlang from "./components/topErlang";
import MTDKpis from "./components/MTDKpis";
import { setModalOpenState, setAlertData } from "../moreAlertDetails/actions";

import {
  setChangeToOtherViewMTDKPI,
  setDropMenuRegionSelector,
  setChangeToOtherViewNewStations,
  setChangeToOtherViewTopPayload,
  setChangeToOtherViewTopErlang,
  setStateHiMessage,
  setSelectedDashboardRegion,
  getRegionsDashboard,
  getTopStationsErlang,
  getTopStationsPayload,
  getSumKpiMonthComp,
  getErlangUntil30Days,
  getPayloadUntil30Days,
  getErlangLatest12Month,
  getPayloadLatest12Month,
  setHoverLeaveRegionLock,
  getAlertsDashboard,
  getAlertsDashboardSuccess
} from "./actions";

import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";

const ReactGridLayoutW = WidthProvider(ReactGridLayout);
const { Div, H1, Span } = glamorous;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: []
    };
    this.renderThumb = this.renderThumb.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.renderSelectorRegion = this.renderSelectorRegion.bind(this);
    this.handleShowSelectorRegion = this.handleShowSelectorRegion.bind(this);
    this.handleSetSelectedRegion = this.handleSetSelectedRegion.bind(this);
    this.handleHideMenuRegion = this.handleHideMenuRegion.bind(this);
  }

  handleShowSelectorRegion() {
    if (this.props.userLevel === 0 || this.props.userLevel === 1) {
      this.props.actions.setDropMenuRegionSelector(true);
      setTimeout(() => {
        this.props.actions.setHoverLeaveRegionLock(false);
      }, 100);
    }
  }

  renderSelectorRegion() {
    return (
      <Div
        css={{
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          right: ".6em",
          margin: "0.6em 0em 0em 0em"
        }}
      >
        <Span
          css={{
            float: "left",
            fontSize: "12px",
            fontWeight: "bold",
            lineHeight: "36px",
            minWidth: "4.4em",
            padding: "0 10px 0 30px",
            position: "relative",
            background: this.props.theme.tertiaryLevelBgColor,
            color: this.props.theme.fontColor,
            transition: "all 0.7s",
            textAlign: "center",
            ":after": {
              content: " ",
              position: "absolute",
              top: ".1em",
              right: "-18px",
              width: "34px",
              height: "34px",
              transform: "scale(0.707) rotate(45deg)",
              zIndex: 1,
              boxShadow:
                "2px -2px 0 2px rgba(0, 0, 0, 0.4),3px -3px 0 2px rgba(255, 255, 255, 0.1)",
              borderRadius: " 0 5px 0 50px",
              background: this.props.theme.tertiaryLevelBgColor,
              transition: "all 0.7s"
            },
            ":before": {
              background: this.props.theme.primaryLevelBgColor,
              boxShadow: "0 0 0 1px #00c"
            }
          }}
        >
          ESTAS VIENDO UN RESUMEN DE LA REGION
        </Span>
        <Span
          css={{
            float: "left",
            fontSize: "12px",
            fontWeight: "bold",
            lineHeight: "36px",
            minWidth: "9em",
            padding: "0 10px 0 30px",
            position: "relative",
            background: this.props.dropMenuShowSelectorRegion
              ? "#3b5998"
              : "#FF4136",
            color: this.props.dropMenuShowSelectorRegion
              ? this.props.theme.regionFontColorHover
              : this.props.theme.regionFontColor,
            transition: "all 0.7s",
            textAlign: "center",
            boxShadow: " inset 0 2px 3px rgba(0,0,0,0.7)",
            ":hover": {
              background: "#3b5998",
              cursor: "pointer",
              color: this.props.theme.regionFontColorHover,
              ":after": {
                background: " #3b5998"
              }
            }
          }}
          onClick={this.handleShowSelectorRegion}
        >
          {this.props.selectedRegion.REGION.toUpperCase()}
        </Span>
        <Div
          css={{
            display: this.props.dropMenuShowSelectorRegion ? "block" : "none",
            position: "absolute",
            marginTop: "2.31em",
            backgroundColor: "#f9f9f9",
            minWidth: "9em",
            marginLeft: "19.1em",
            boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
            zIndex: 20
          }}
        >
          {Object.keys(this.props.regions).map(key => {
            return (
              <Div
                key={key}
                css={{
                  display:
                    this.props.selectedRegion.ID === this.props.regions[key].ID
                      ? "none"
                      : "block",
                  fontSize: "12px",
                  fontWeight: "bold",
                  minWidth: "9em",
                  color: "#B6B6B6",
                  background: "#262626",
                  padding: "0.750em 1em",
                  textAlign: "center",
                  cursor: "pointer",
                  ":hover": {
                    background: "#3b5998"
                  }
                }}
                onClick={() =>
                  this.handleSetSelectedRegion(this.props.regions[key])
                }
              >
                {this.props.regions[key].REGION.toUpperCase()}
              </Div>
            );
          })}
        </Div>
      </Div>
    );
  }

  renderThumb() {
    return (
      <div
        style={{
          backgroundColor: "#B6B6B6",
          width: "1em"
        }}
      />
    );
  }

  handleSetSelectedRegion(region) {
    this.props.actions.setDropMenuRegionSelector(false);
    this.props.actions.setSelectedDashboardRegion(region);
    setTimeout(() => {
      this.props.actions.getTopStationsErlang({
        ID_REGION: region.ID,
        ACTUALCONFIG: this.props.configTopErlang
      });
      this.props.actions.getTopStationsPayload({
        ID_REGION: region.ID,
        ACTUALCONFIG: this.props.configTopPayload
      });
      this.props.actions.getSumKpiMonthComp({
        ID_REGION: region.ID,
        ACTUALCONFIG: this.props.configMTDKPIs
      });
      this.props.actions.getErlangUntil30Days({
        ID_REGION: region.ID,
        ACTUALCONFIG: this.props.configErlangMTD
      });
      this.props.actions.getPayloadUntil30Days({
        ID_REGION: region.ID,
        ACTUALCONFIG: this.props.configPayloadMTD
      });
      this.props.actions.getErlangLatest12Month({
        ID_REGION: region.ID,
        ACTUALCONFIG: this.props.configErlangByMonth
      });
      this.props.actions.getPayloadLatest12Month({
        ID_REGION: region.ID,
        ACTUALCONFIG: this.props.configPayloadByMonth
      });
    }, 100);
  }

  componentWillMount() {
    if (Object.keys(this.props.regions).length < 2) {
      this.props.actions.getRegionsDashboard({
        ID_REGION: this.props.idRegion
      });
    }
    if (this.props.configErlangMTD.series[0].data.length === 0) {
      this.props.actions.getAlertsDashboard();
      this.props.actions.setSelectedDashboardRegion({
        ID: this.props.idRegion,
        REGION: this.props.region
      });
      this.props.actions.getTopStationsErlang({
        ID_REGION: this.props.idRegion,
        ACTUALCONFIG: this.props.configTopErlang
      });
      this.props.actions.getTopStationsPayload({
        ID_REGION: this.props.idRegion,
        ACTUALCONFIG: this.props.configTopPayload
      });
      this.props.actions.getSumKpiMonthComp({
        ID_REGION: this.props.idRegion,
        ACTUALCONFIG: this.props.configMTDKPIs
      });
      this.props.actions.getErlangUntil30Days({
        ID_REGION: this.props.idRegion,
        ACTUALCONFIG: this.props.configErlangMTD
      });
      this.props.actions.getPayloadUntil30Days({
        ID_REGION: this.props.idRegion,
        ACTUALCONFIG: this.props.configPayloadMTD
      });
      this.props.actions.getErlangLatest12Month({
        ID_REGION: this.props.idRegion,
        ACTUALCONFIG: this.props.configErlangByMonth
      });
      this.props.actions.getPayloadLatest12Month({
        ID_REGION: this.props.idRegion,
        ACTUALCONFIG: this.props.configPayloadByMonth
      });
    }

    // Obtener layout de bd o del localstorage
    // Se agrega la layaout inicial si no se obtiene una desde el
    // mecanismo de almacenamiento
    this.setState({
      layout: getFromLS("layout") || [
        {
          w: 4,
          h: 1,
          x: 0,
          y: 0,
          i: "1",
          minW: 4,
          maxH: 1,
          moved: false,
          static: true
        },
        {
          w: 4,
          h: 1,
          x: 4,
          y: 0,
          i: "2",
          minW: 4,
          maxH: 1,
          moved: false,
          static: true
        },
        {
          w: 4,
          h: 1,
          x: 8,
          y: 0,
          i: "3",
          minW: 4,
          maxH: 1,
          moved: false,
          static: true
        }
      ]
    });
    setTimeout(() => {
      this.props.actions.setStateHiMessage(false);
    }, 10000);
  }

  componentWillUnmount() {
    //Guardar layour en bd
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    saveToLS("layout", layout);
    this.setState({ layout });
  }

  handleHideMenuRegion() {
    if (
      this.props.dropMenuShowSelectorRegion &&
      this.props.hoverLeaveLock === false
    ) {
      this.props.actions.setDropMenuRegionSelector(false);

      this.props.actions.setHoverLeaveRegionLock(true);
    }
  }

  render() {
    return (
      <Div
        css={{
          width: "auto",
          display: "flex",
          flexDirection: "row"
        }}
        onClick={this.handleHideMenuRegion}
      >
        <StreamTable
          navShow={this.props.navShow}
          setModalOpenState={this.props.actions.setModalOpenState}
          setAlertData={this.props.actions.setAlertData}
          alerts={this.props.alerts}
          getAlertsDashboardSuccess={
            this.props.actions.getAlertsDashboardSuccess
          }
          user={this.props.user}
        />
        <Scrollbars
          style={{
            width: "auto",
            minWidth: "60em",
            height: "93.7vh",
            background: this.props.theme.quaternaryBgColor,
            color: this.props.theme.fontColor,
            flex: 1
          }}
          renderThumbHorizontal={this.renderThumb}
          renderThumbVertical={this.renderThumb}
          onUpdate={this.handleUpdate}
          autoHide
          // Hide delay in ms
          autoHideTimeout={1000}
          // Duration for hide animation in ms.
          autoHideDuration={200}
        >
          <Div
            css={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <H1
              css={{
                margin: ".5em 0 0.1em 0.5em",
                fontFamily: '"Roboto Condensed", sans-serif',
                fontSize: "23px",
                fontWeight: "bold"
              }}
            >
              {this.props.hiMessage
                ? `HOLA DE NUEVO ${this.props.userName.toUpperCase()}!`
                : "DASHBOARD"}
            </H1>
            {this.renderSelectorRegion()}
          </Div>
          <ReactGridLayoutW
            ref="rgl"
            {...this.props}
            layout={this.state.layout}
            onLayoutChange={this.onLayoutChange}
            navChanges={this.props.navShow}
            verticalCompact={true}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                background: this.props.theme.dbMTD,
                color: "black",
                zIndex: 1,
                boxShadow: `inset 0 0 5px ${this.props.theme.border}`
              }}
              key="1"
            >
              <MTDKpis
                payloadMesActualMTD={this.props.payloadMesActualMTD}
                payloadMesAnteriorMTD={this.props.payloadMesAnteriorMTD}
                erlangMesActualMTD={this.props.erlangMesActualMTD}
                erlangMesAnteriorMTD={this.props.erlangMesAnteriorMTD}
                changeToOtherViewMTDKPI={this.props.changeToOtherViewMTDKPI}
                setChangeToOtherViewMTDKPI={
                  this.props.actions.setChangeToOtherViewMTDKPI
                }
                setChangeToOtherViewTopErlang={
                  this.props.actions.setChangeToOtherViewTopErlang
                }
                setChangeToOtherViewTopPayload={
                  this.props.actions.setChangeToOtherViewTopPayload
                }
                configMTDKPIs={this.props.configMTDKPIs}
              />
            </div>
            <div
              style={{
                width: "10px",
                height: "10px",
                background: this.props.theme.dbTopEL,
                color: "black",
                zIndex: 1,
                boxShadow: `inset 0 0 5px ${this.props.theme.border}`
              }}
              key="2"
            >
              <TopErlang
                changeToOtherViewTopErlang={
                  this.props.changeToOtherViewTopErlang
                }
                setChangeToOtherViewMTDKPI={
                  this.props.actions.setChangeToOtherViewMTDKPI
                }
                setChangeToOtherViewTopErlang={
                  this.props.actions.setChangeToOtherViewTopErlang
                }
                setChangeToOtherViewTopPayload={
                  this.props.actions.setChangeToOtherViewTopPayload
                }
                configTopErlang={this.props.configTopErlang}
                firstStationErlang={this.props.firstStationErlang}
                secondStationErlang={this.props.secondStationErlang}
                thirdStationErlang={this.props.thirdStationErlang}
              />
            </div>
            <div
              style={{
                width: "10px",
                height: "10px",
                background: this.props.theme.dbTopPL,
                color: "black",
                zIndex: 1,
                boxShadow: `inset 0 0 5px ${this.props.theme.border}`
              }}
              key="3"
            >
              <TopPayload
                changeToOtherViewTopPayload={
                  this.props.changeToOtherViewTopPayload
                }
                setChangeToOtherViewMTDKPI={
                  this.props.actions.setChangeToOtherViewMTDKPI
                }
                setChangeToOtherViewTopErlang={
                  this.props.actions.setChangeToOtherViewTopErlang
                }
                setChangeToOtherViewTopPayload={
                  this.props.actions.setChangeToOtherViewTopPayload
                }
                configTopPayload={this.props.configTopPayload}
                firstStationPayload={this.props.firstStationPayload}
                secondStationPayload={this.props.secondStationPayload}
                thirdStationPayload={this.props.thirdStationPayload}
              />
            </div>
          </ReactGridLayoutW>
          <Div
            css={{
              width: "auto",
              height: "auto",
              background: this.props.theme.headerChart,
              color: this.props.theme.headerColor,
              margin: "-.23em .6em .7em .6em",
              padding: ".1em 0em 0em 0em",
              borderRadius: "4px 4px 4px 4px"
            }}
          >
            <ErlangMTD
              config={this.props.configErlangMTD}
              completeFetchData={this.props.completeFetchDataErlangMTD}
            />
          </Div>
          <Div
            css={{
              width: "auto",
              height: "auto",
              background: this.props.theme.headerChart,
              color: this.props.theme.headerColor,
              margin: ".6em .6em .6em .6em",
              padding: ".1em 0em 0em 0em",
              borderRadius: "4px 4px 4px 4px"
            }}
          >
            <PayloadMTD
              config={this.props.configPayloadMTD}
              completeFetchData={this.props.completeFetchDataPayloadMTD}
            />
          </Div>
          <Div
            css={{
              width: "auto",
              height: "auto",
              background: this.props.theme.headerChart,
              color: this.props.theme.headerColor,
              margin: ".6em .6em .6em .6em",
              padding: ".1em 0em 0em 0em",
              borderRadius: "4px 4px 4px 4px"
            }}
          >
            <ErlangLastByMonth
              config={this.props.configErlangByMonth}
              completeFetchData={this.props.completeFetchDataErlangByMonth}
            />
          </Div>
          <Div
            css={{
              width: "auto",
              height: "auto",
              background: this.props.theme.headerChart,
              color: this.props.theme.headerColor,
              margin: ".6em .6em .6em .6em",
              padding: ".1em 0em 0em 0em",
              borderRadius: "4px 4px 4px 4px"
            }}
          >
            <PayloadLastByMonth
              config={this.props.configPayloadByMonth}
              completeFetchData={this.props.completeFetchDataPayloaByMonth}
            />
          </Div>
        </Scrollbars>
      </Div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-5")) || false;
    } catch (e) {
      /*Ignore*/
    }
  }
  if (ls) {
    return ls[key];
  } else {
    return false;
  }
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-5",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

const mapStateToProps = state => {
  return {
    navShow: state.toolbar.nav_show,
    changeToOtherViewMTDKPI: state.dashboard.changeToOtherViewMTDKPI,
    changeToOtherViewTopErlang: state.dashboard.changeToOtherViewTopErlang,
    changeToOtherViewTopPayload: state.dashboard.changeToOtherViewTopPayload,
    changeToOtherViewNewStations: state.dashboard.changeToOtherViewNewStations,
    selectedRegion: state.dashboard.selectedRegion,
    dropMenuShowSelectorRegion: state.dashboard.dropMenuShowSelectorRegion,
    regions: state.dashboard.regions,
    userLevel: state.client.user.USER_LEVEL,
    idRegion: state.client.user.ID_REGION,
    region: state.client.user.REGION,
    completeFetchDataPayloadMTD: state.dashboard.completeFetchDataPayloadMTD,
    completeFetchDataErlangMTD: state.dashboard.completeFetchDataErlangMTD,
    completeFetchDataPayloaByMonth:
      state.dashboard.completeFetchDataPayloaByMonth,
    completeFetchDataErlangByMonth:
      state.dashboard.completeFetchDataErlangByMonth,
    configErlangMTD: state.dashboard.configErlangMTD,
    configPayloadMTD: state.dashboard.configPayloadMTD,
    configErlangByMonth: state.dashboard.configErlangByMonth,
    configPayloadByMonth: state.dashboard.configPayloadByMonth,
    configMTDKPIs: state.dashboard.configMTDKPIs,
    payloadMesActualMTD: state.dashboard.payloadMesActualMTD,
    payloadMesAnteriorMTD: state.dashboard.payloadMesAnteriorMTD,
    erlangMesActualMTD: state.dashboard.erlangMesActualMTD,
    erlangMesAnteriorMTD: state.dashboard.erlangMesAnteriorMTD,
    configTopErlang: state.dashboard.configTopErlang,
    configTopPayload: state.dashboard.configTopPayload,
    firstStationPayload: state.dashboard.firstStationPayload,
    secondStationPayload: state.dashboard.secondStationPayload,
    thirdStationPayload: state.dashboard.thirdStationPayload,
    firstStationErlang: state.dashboard.firstStationErlang,
    secondStationErlang: state.dashboard.secondStationErlang,
    thirdStationErlang: state.dashboard.thirdStationErlang,
    userName: state.client.user.FIRST_NAME,
    user: state.client.user,
    hiMessage: state.dashboard.hiMessage,
    hoverLeaveLock: state.dashboard.hoverLeaveLock,
    alerts: state.dashboard.alerts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setChangeToOtherViewMTDKPI,
        setDropMenuRegionSelector,
        setChangeToOtherViewNewStations,
        setChangeToOtherViewTopPayload,
        setChangeToOtherViewTopErlang,
        setStateHiMessage,
        setSelectedDashboardRegion,
        getRegionsDashboard,
        getTopStationsErlang,
        getTopStationsPayload,
        getSumKpiMonthComp,
        getErlangUntil30Days,
        getPayloadUntil30Days,
        getErlangLatest12Month,
        getPayloadLatest12Month,
        setHoverLeaveRegionLock,
        setModalOpenState,
        setAlertData,
        getAlertsDashboard,
        getAlertsDashboardSuccess
      },
      dispatch
    )
  };
};
const DashboardConnect = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard
);

export default withTheme(withRouter(DashboardConnect));
