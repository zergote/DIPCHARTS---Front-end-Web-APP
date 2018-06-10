import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
import { Scrollbars } from 'react-custom-scrollbars'
import Chart from './components/chart'
import ChartConsult from './components/chartConsult'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Breadcrumb from './components/breadcrumb'
import ContextualMenu from './components/contextualMenu'
import RefreshData from './components/refreshData'
import {
  setChartOptionsErlang,
  setChartOptionsPayload,
  setChartOptionsCcr,
  setChartOptionsPcr,
  setChartOptionsUser,
  setStateChartOptionsErlang,
  setStateChartOptionsPayload,
  setStateChartOptionsCcr,
  setStateChartOptionsPcr,
  setStateChartOptionsUsers,
  setStateChartOptions,
  setConfigChartErlang,
  setConfigChartPayload,
  setConfigChartCcr,
  setConfigChartPcr,
  setConfigChartUsers,
  setConfigChartConsult,
  setPreloaderStateErlang,
  setPreloaderStatePayload,
  setPreloaderStateCcr,
  setPreloaderStatePcr,
  setPreloaderStateUsers,
  menuSelectorLapse,
  statisticsErlangRequest,
  statisticsPayloadRequest,
  statisticsCcrRequest,
  statisticsPcrRequest,
  statisticsUsersRequest,
  statisticsRequest,
  showCluster,
  showSearchCluster,
  selectedCluster,
  showSearchRegion,
  setSetStateGroupMenu,
  changeConsultState,
} from './actions.js'

const { Div } = glamorous

class Clusters extends Component {
  constructor(props) {
    super(props)
    this.renderThumb = this.renderThumb.bind(this)
    this.handleHideMenusOusideEvent = this.handleHideMenusOusideEvent.bind(this)

    this.handleChartOptionsErlang = this.handleChartOptionsErlang.bind(this)
    this.handleChartOptionsPayload = this.handleChartOptionsPayload.bind(this)
    this.handleChartOptionsCcr = this.handleChartOptionsCcr.bind(this)
    this.handleChartOptionsPcr = this.handleChartOptionsPcr.bind(this)
    this.handleChartOptionsUsers = this.handleChartOptionsUsers.bind(this)
    this.handleChartOptions = this.handleChartOptions.bind(this)

    this.initiateRequests = this.initiateRequests.bind(this)
    this.initiateRequestsErlang = this.initiateRequestsErlang.bind(this)
    this.initiateRequestsPayload = this.initiateRequestsPayload.bind(this)
    this.initiateRequestsCcr = this.initiateRequestsCcr.bind(this)
    this.initiateRequestsPcr = this.initiateRequestsPcr.bind(this)
    this.initiateRequestsUsers = this.initiateRequestsUsers.bind(this)
    this.initiateRequestsConsult = this.initiateRequestsConsult.bind(this)
    this.handleHideMenuStates = this.handleHideMenuStates.bind(this)
    this.initateRequestBasicLastMonth = this.initateRequestBasicLastMonth.bind(
      this
    )
    this.cleanChart = this.cleanChart.bind(this)
  }

  componentWillUnmount() {
    this.cleanChart()
    this.props.actions.showCluster(false)
    this.props.actions.showSearchCluster(false)
    this.props.actions.selectedCluster('')
    this.props.actions.changeConsultState(false)
  }

  cleanChart() {
    let config
    config = this.props.ACTUALCONFIG_ERLANG
    config.series = [
      {
        name: 'ERLANG',
        data: [],
        yAxis: 0,
        type: 'line',
        tooltip: {
          valueDecimals: 2,
        },
      },
    ]
    this.props.actions.setConfigChartErlang(config)

    config = this.props.ACTUALCONFIG_PAYLOAD
    config.series = [
      {
        name: 'PAYLOAD',
        data: [],
        yAxis: 0,
        type: 'line',
        tooltip: {
          valueDecimals: 2,
        },
      },
    ]
    this.props.actions.setConfigChartPayload(config)

    config = this.props.ACTUALCONFIG_CCR
    config.series = [
      {
        name: 'CCR',
        data: [],
        yAxis: 0,
        type: 'line',
        tooltip: {
          valueDecimals: 2,
        },
      },
    ]
    this.props.actions.setConfigChartCcr(config)

    config = this.props.ACTUALCONFIG_PCR
    config.series = [
      {
        name: 'PCR',
        data: [],
        yAxis: 0,
        type: 'line',
        tooltip: {
          valueDecimals: 2,
        },
      },
    ]
    this.props.actions.setConfigChartPcr(config)

    config = this.props.ACTUALCONFIG_USERS
    config.series = [
      {
        name: 'USUARIOS',
        data: [],
        yAxis: 0,
        type: 'line',
        tooltip: {
          valueDecimals: 2,
        },
      },
    ]
    this.props.actions.setConfigChartUsers(config)

    config = this.props.ACTUALCONFIG
    config.series = [
      {
        name: 'KPI',
        data: [],
        yAxis: 0,
        type: 'line',
        tooltip: {
          valueDecimals: 2,
        },
      },
    ]
    this.props.actions.setConfigChartConsult(config)
  }

  renderThumb() {
    return (
      <div
        style={{
          backgroundColor: this.props.theme.fontColor,
          width: '1em',
        }}
      />
    )
  }

  handleHideMenusOusideEvent() {
    if (this.props.dropMenuShowSelectorLapse)
      this.props.actions.menuSelectorLapse(false)
    if (this.props.stateGroupOption) {
      this.props.actions.setSetStateGroupMenu(false)
    }
  }

  handleChartOptionsErlang(value) {
    this.props.actions.setStateChartOptionsErlang(value)
  }
  handleChartOptionsPayload(value) {
    this.props.actions.setStateChartOptionsPayload(value)
  }
  handleChartOptionsCcr(value) {
    this.props.actions.setStateChartOptionsCcr(value)
  }
  handleChartOptionsPcr(value) {
    this.props.actions.setStateChartOptionsPcr(value)
  }
  handleChartOptionsUsers(value) {
    this.props.actions.setStateChartOptionsUsers(value)
  }

  handleChartOptions(value) {
    this.props.actions.setStateChartOptions(value)
  }

  //Funcion que se envía como callback para obtener la nueva configuración para la grafica
  handleSetConfig(ConfigValue) {
    this.props.actions.setConfigChart(ConfigValue)
  }

  //Funcion que se envia como callback para obtener estado de carga de los datos
  handleSetPreloadState(fetchState) {
    this.props.actions.setPreloaderState(fetchState)
  }

  initiateRequests() {
    if (this.props.consult) {
      this.initiateRequestsConsult()
      if (
        Object.keys(this.props.clusters).length > 0 &&
        this.props.CLUSTER === undefined
      ) {
        this.props.actions.showCluster(true)
        this.props.actions.showSearchCluster(true)
      }
    } else {
      this.initateRequestBasicLastMonth()
    }
  }

  initateRequestBasicLastMonth() {
    this.initiateRequestsErlang()
    this.initiateRequestsPayload()
    this.initiateRequestsCcr()
    this.initiateRequestsPcr()
    this.initiateRequestsUsers()
  }

  handleHideMenuStates() {
    if (
      this.props.CLUSTER === undefined ||
      this.props.CLUSTER === 'SIN CONEXION'
    ) {
      this.props.actions.showCluster(false)
    }
    this.props.actions.showSearchCluster(false)
    this.props.actions.showSearchRegion(false)
  }

  initiateRequestsConsult() {
    let KPISELECTED = this.props.KPISELECTED
    let ACTUALCONFIG = this.props.ACTUALCONFIG
    let ADITIONALCHARTOPTIONS = this.props.ADITIONALCHARTOPTIONS
    let TYPECHART = this.props.TYPECHART
    let THEME = this.props.THEME
    let SINCETHEDATE = this.props.SINCETHEDATE
    let UNTILTHEDATE = this.props.UNTILTHEDATE
    let CLUSTER = this.props.CLUSTER
    let IDGROUP = this.props.IDGROUP
    //Se convertierte las cadenas de texto a formato Titulo
    let REGION = this.props.REGION.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })

    if (this.props.IDREGION !== null && this.props.CLUSTER !== undefined) {
      this.props.actions.statisticsRequest({
        KPISELECTED,
        ACTUALCONFIG,
        ADITIONALCHARTOPTIONS,
        TYPECHART,
        THEME,
        SINCETHEDATE,
        UNTILTHEDATE,
        CLUSTER,
        REGION,
        IDGROUP,
      })
    }
  }

  initiateRequestsErlang() {
    let KPISELECTED = this.props.KPISELECTED_ERLANG
    let ACTUALCONFIG = this.props.ACTUALCONFIG_ERLANG
    let ADITIONALCHARTOPTIONS = this.props.ADITIONALCHARTOPTIONS_ERLANG
    let TYPECHART = this.props.TYPECHART_ERLANG
    let THEME = this.props.THEME_ERLANG
    let SINCETHEDATE = this.props.SINCETHEDATE
    let UNTILTHEDATE = this.props.UNTILTHEDATE
    let CLUSTER = this.props.CLUSTER
    let IDGROUP = this.props.IDGROUP
    //Se convertierte las cadenas de texto a formato Titulo
    let REGION = this.props.REGION.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
    if (this.props.IDREGION !== null && this.props.CLUSTER !== undefined) {
      this.props.actions.statisticsErlangRequest({
        KPISELECTED,
        ACTUALCONFIG,
        ADITIONALCHARTOPTIONS,
        TYPECHART,
        THEME,
        SINCETHEDATE,
        UNTILTHEDATE,
        CLUSTER,
        REGION,
        IDGROUP,
      })
    }
  }

  initiateRequestsPayload() {
    let KPISELECTED = this.props.KPISELECTED_PAYLOAD
    let ACTUALCONFIG = this.props.ACTUALCONFIG_PAYLOAD
    let ADITIONALCHARTOPTIONS = this.props.ADITIONALCHARTOPTIONS_PAYLOAD
    let TYPECHART = this.props.TYPECHART_PAYLOAD
    let THEME = this.props.THEME_PAYLOAD
    let SINCETHEDATE = this.props.SINCETHEDATE
    let UNTILTHEDATE = this.props.UNTILTHEDATE
    let CLUSTER = this.props.CLUSTER
    let IDGROUP = this.props.IDGROUP

    //Se convertierte las cadenas de texto a formato Titulo
    let REGION = this.props.REGION.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })

    if (this.props.IDREGION !== null && this.props.CLUSTER !== undefined) {
      this.props.actions.statisticsPayloadRequest({
        KPISELECTED,
        ACTUALCONFIG,
        ADITIONALCHARTOPTIONS,
        TYPECHART,
        THEME,
        SINCETHEDATE,
        UNTILTHEDATE,
        CLUSTER,
        REGION,
        IDGROUP,
      })
    }
  }

  initiateRequestsCcr() {
    let KPISELECTED = this.props.KPISELECTED_CCR
    let ACTUALCONFIG = this.props.ACTUALCONFIG_CCR
    let ADITIONALCHARTOPTIONS = this.props.ADITIONALCHARTOPTIONS_CCR
    let TYPECHART = this.props.TYPECHART_CCR
    let THEME = this.props.THEME_CCR
    let SINCETHEDATE = this.props.SINCETHEDATE
    let UNTILTHEDATE = this.props.UNTILTHEDATE
    let CLUSTER = this.props.CLUSTER
    let IDGROUP = this.props.IDGROUP

    //Se convertierte las cadenas de texto a formato Titulo
    let REGION = this.props.REGION.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })

    if (this.props.IDREGION !== null && this.props.CLUSTER !== undefined) {
      this.props.actions.statisticsCcrRequest({
        KPISELECTED,
        ACTUALCONFIG,
        ADITIONALCHARTOPTIONS,
        TYPECHART,
        THEME,
        SINCETHEDATE,
        UNTILTHEDATE,
        CLUSTER,
        REGION,
        IDGROUP,
      })
    }
  }

  initiateRequestsPcr() {
    let KPISELECTED = this.props.KPISELECTED_PCR
    let ACTUALCONFIG = this.props.ACTUALCONFIG_PCR
    let ADITIONALCHARTOPTIONS = this.props.ADITIONALCHARTOPTIONS_PCR
    let TYPECHART = this.props.TYPECHART_PCR
    let THEME = this.props.THEME_PCR
    let SINCETHEDATE = this.props.SINCETHEDATE
    let UNTILTHEDATE = this.props.UNTILTHEDATE
    let CLUSTER = this.props.CLUSTER
    let IDGROUP = this.props.IDGROUP

    //Se convertierte las cadenas de texto a formato Titulo
    let REGION = this.props.REGION.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })

    if (this.props.IDREGION !== null && this.props.CLUSTER !== undefined) {
      this.props.actions.statisticsPcrRequest({
        KPISELECTED,
        ACTUALCONFIG,
        ADITIONALCHARTOPTIONS,
        TYPECHART,
        THEME,
        SINCETHEDATE,
        UNTILTHEDATE,
        CLUSTER,
        REGION,
        IDGROUP,
      })
    }
  }

  initiateRequestsUsers() {
    let KPISELECTED = this.props.KPISELECTED_USERS
    let ACTUALCONFIG = this.props.ACTUALCONFIG_USERS
    let ADITIONALCHARTOPTIONS = this.props.ADITIONALCHARTOPTIONS_USERS
    let TYPECHART = this.props.TYPECHART_USERS
    let THEME = this.props.THEME_ERLANG
    let SINCETHEDATE = this.props.SINCETHEDATE
    let UNTILTHEDATE = this.props.UNTILTHEDATE
    let CLUSTER = this.props.CLUSTER
    let IDGROUP = this.props.IDGROUP
    //Se convertierte las cadenas de texto a formato Titulo
    let REGION = this.props.REGION.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })

    if (this.props.IDREGION !== null && this.props.CLUSTER !== undefined) {
      this.props.actions.statisticsUsersRequest({
        KPISELECTED,
        ACTUALCONFIG,
        ADITIONALCHARTOPTIONS,
        TYPECHART,
        THEME,
        SINCETHEDATE,
        UNTILTHEDATE,
        CLUSTER,
        REGION,
        IDGROUP,
      })
    }
  }

  render() {
    return (
      <Div>
        <RefreshData refresh={this.initiateRequests} />
        <ContextualMenu />
        <Scrollbars
          style={{
            width: '100%',
            minWidth: '60em',
            height: '93.7vh',
            background: this.props.theme.secondaryLevelBgColor,
            color: this.props.theme.fontColor,
          }}
          renderThumbHorizontal={this.renderThumb}
          renderThumbVertical={this.renderThumb}
          autoHide
          // Hide delay in ms
          autoHideTimeout={1000}
          // Duration for hide animation in ms.
          autoHideDuration={200}
          onClick={this.handleHideMenusOusideEvent}
        >
          <Div
            css={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Div
              css={{
                margin: '1em 0 0.1em 0.3em',
                //fontFamily: '"Raleway", Arial, sans-serif',
                fontFamily: '"Roboto Condensed", sans-serif',
                fontSize: '22px',
                fontWeight: 'bold',
              }}
            >
              CLUSTER {this.props.CLUSTER !== undefined ? '>' : null}{' '}
              {this.props.CLUSTER}{' '}
              {this.props.CLUSTER !== undefined ? '>' : null}
              {this.props.consult ? ' MODO CONSULTA' : ' (ULTIMA SEMANA)'}
            </Div>
          </Div>
          <Breadcrumb
            initiateRequests={this.initiateRequests}
            initateRequestBasicLastMonth={this.initateRequestBasicLastMonth}
          />

          {this.props.consult ? (
            <ChartConsult
              handleHideMenuStates={this.handleHideMenuStates}
              contour="contour"
              typeChart="highstock"
              config={this.props.config}
              completeFetchData={this.props.completeFetchData}
              theme={this.props.themeErlang}
              handleChartOptions={this.handleChartOptions}
              initiateRequests={this.initiateRequests}
              handleSetChartOptions={this.props.actions.setChartOptions}
              handleSetStateChartOptions={
                this.props.actions.setStateChartOptions
              }
              selectorChartOptions={this.props.selectorChartOptions}
              stateChartOptions={this.props.stateChartOptions}
              services={this.props.services}
              showClusters={this.props.showClusters}
              showNav={this.props.showNav}
            />
          ) : (
            <Div>
              <Div
                css={{
                  display: 'block',
                  background: '##FFFFFF',
                  backgroundImage:
                    'linear-gradient(to bottom right, #FFFFFF 5%, #FFFFFF 100%)',
                  backgroundBlendMode: 'lighten',
                  borderRadius: '6px',
                  padding: '0em 0.5em 0.5em 0.5em',
                  boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                  margin: '1em',
                }}
              >
                <Chart
                  contour="contour"
                  typeChart="highstock"
                  config={this.props.configErlang}
                  completeFetchData={this.props.completeFetchDataErlang}
                  theme={this.props.themeErlang}
                  handleChartOptions={this.handleChartOptionsErlang}
                  initiateRequests={this.initiateRequestsErlang}
                  handleSetChartOptions={
                    this.props.actions.setChartOptionsErlang
                  }
                  handleSetStateChartOptions={
                    this.props.actions.setStateChartOptionsErlang
                  }
                  selectorChartOptions={this.props.selectorChartOptionsErlang}
                  stateChartOptions={this.props.stateChartOptionsErlang}
                  services={this.props.servicesErlang}
                  showClusters={this.props.showClusters}
                  showNav={this.props.showNav}
                />
                <Div
                  css={{
                    width: '100%',
                    height: '.2em',
                    background: '#262626',
                  }}
                />
                <Chart
                  contour="contour"
                  typeChart="highstock"
                  config={this.props.configPayload}
                  completeFetchData={this.props.completeFetchDataPayload}
                  theme={this.props.themePayload}
                  handleChartOptions={this.handleChartOptionsPayload}
                  initiateRequests={this.initiateRequestsPayload}
                  handleSetChartOptions={
                    this.props.actions.setChartOptionsPayload
                  }
                  handleSetStateChartOptions={
                    this.props.actions.setStateChartOptionsPayload
                  }
                  selectorChartOptions={this.props.selectorChartOptionsPayload}
                  stateChartOptions={this.props.stateChartOptionsPayload}
                  services={this.props.servicesPayload}
                  showClusters={this.props.showClusters}
                  showNav={this.props.showNav}
                />
                <Div
                  css={{
                    width: '100%',
                    height: '.2em',
                    background: '#262626',
                  }}
                />
                <Chart
                  contour="contour"
                  typeChart="highstock"
                  config={this.props.configCcr}
                  completeFetchData={this.props.completeFetchDataCcr}
                  theme={this.props.themeCcr}
                  handleChartOptions={this.handleChartOptionsCcr}
                  initiateRequests={this.initiateRequestsCcr}
                  handleSetChartOptions={this.props.actions.setChartOptionsCcr}
                  handleSetStateChartOptions={
                    this.props.actions.setStateChartOptionsCcr
                  }
                  selectorChartOptions={this.props.selectorChartOptionsCcr}
                  stateChartOptions={this.props.stateChartOptionsCcr}
                  services={this.props.servicesCcr}
                  showClusters={this.props.showClusters}
                  showNav={this.props.showNav}
                />
                <Div
                  css={{
                    width: '100%',
                    height: '.2em',
                    background: '#262626',
                  }}
                />
                <Chart
                  contour="contour"
                  typeChart="highstock"
                  config={this.props.configPcr}
                  completeFetchData={this.props.completeFetchDataPcr}
                  theme={this.props.themePcr}
                  handleChartOptions={this.handleChartOptionsPcr}
                  initiateRequests={this.initiateRequestsPcr}
                  handleSetChartOptions={this.props.actions.setChartOptionsPcr}
                  handleSetStateChartOptions={
                    this.props.actions.setStateChartOptionsPcr
                  }
                  selectorChartOptions={this.props.selectorChartOptionsPcr}
                  stateChartOptions={this.props.stateChartOptionsPcr}
                  services={this.props.servicesPcr}
                  showClusters={this.props.showClusters}
                  showNav={this.props.showNav}
                />

                <Div
                  css={{
                    width: '100%',
                    height: '.2em',
                    background: '#262626',
                  }}
                />

                <Chart
                  contour="contour"
                  typeChart="highstock"
                  config={this.props.configUsers}
                  completeFetchData={this.props.completeFetchDataUsers}
                  theme={this.props.themeUsers}
                  handleChartOptions={this.handleChartOptionsUsers}
                  initiateRequests={this.initiateRequestsUsers}
                  handleSetChartOptions={this.props.actions.setChartOptionsUser}
                  handleSetStateChartOptions={
                    this.props.actions.setStateChartOptionsUsers
                  }
                  selectorChartOptions={this.props.selectorChartOptionsUsers}
                  stateChartOptions={this.props.stateChartOptionsUsers}
                  services={this.props.servicesUsers}
                  showClusters={this.props.showClusters}
                  showNav={this.props.showNav}
                />
              </Div>
            </Div>
          )}
        </Scrollbars>
      </Div>
    )
  }
}

const mapStateToProps = state => {
  return {
    showNav: state.toolbar.nav_show,
    selectorChartOptionsErlang:
      state.statisticsClusters.selectorChartOptionsErlang,
    selectorChartOptionsPayload:
      state.statisticsClusters.selectorChartOptionsPayload,
    selectorChartOptionsCcr: state.statisticsClusters.selectorChartOptionsCcr,
    selectorChartOptionsPcr: state.statisticsClusters.selectorChartOptionsPcr,
    selectorChartOptionsUsers:
      state.statisticsClusters.selectorChartOptionsUsers,
    selectorChartOptions: state.statisticsClusters.selectorChartOptions,

    stateChartOptionsErlang: state.statisticsClusters.stateChartOptionsErlang,
    stateChartOptionsPayload: state.statisticsClusters.stateChartOptionsPayload,
    stateChartOptionsCcr: state.statisticsClusters.stateChartOptionsCcr,
    stateChartOptionsPcr: state.statisticsClusters.stateChartOptionsPcr,
    stateChartOptionsUsers: state.statisticsClusters.stateChartOptionsUsers,
    stateChartOptions: state.statisticsClusters.stateChartOptions,

    servicesErlang: state.statisticsClusters.servicesErlang,
    servicesPayload: state.statisticsClusters.servicesPayload,
    servicesCcr: state.statisticsClusters.servicesCcr,
    servicesPcr: state.statisticsClusters.servicesPcr,
    servicesUsers: state.statisticsClusters.servicesUsers,
    services: state.statisticsClusters.services,

    showClusters: state.statisticsClusters.showClusters,

    configErlang: state.statisticsClusters.configErlang,
    configPayload: state.statisticsClusters.configPayload,
    configCcr: state.statisticsClusters.configCcr,
    configPcr: state.statisticsClusters.configPcr,
    configUsers: state.statisticsClusters.configUsers,
    config: state.statisticsClusters.config,

    themeErlang: state.statisticsClusters.themeErlang,
    themePayload: state.statisticsClusters.themePayload,
    themeCcr: state.statisticsClusters.themeCcr,
    themePcr: state.statisticsClusters.themePcr,
    themeUsers: state.statisticsClusters.themeUsers,

    completeFetchDataErlang: state.statisticsClusters.completeFetchDataErlang,
    completeFetchDataPayload: state.statisticsClusters.completeFetchDataPayload,
    completeFetchDataCcr: state.statisticsClusters.completeFetchDataCcr,
    completeFetchDataPcr: state.statisticsClusters.completeFetchDataPcr,
    completeFetchDataUsers: state.statisticsClusters.completeFetchDataUsers,
    completeFetchData: state.statisticsClusters.completeFetchData,

    dropMenuShowSelectorLapse:
      state.statisticsClusters.dropMenuShowSelectorLapse,

    KPISELECTED_ERLANG:
      state.statisticsClusters.selectorChartOptionsErlang.column1.kpiSelected,
    KPISELECTED_PAYLOAD:
      state.statisticsClusters.selectorChartOptionsPayload.column1.kpiSelected,
    KPISELECTED_CCR:
      state.statisticsClusters.selectorChartOptionsCcr.column1.kpiSelected,
    KPISELECTED_PCR:
      state.statisticsClusters.selectorChartOptionsPcr.column1.kpiSelected,
    KPISELECTED_USERS:
      state.statisticsClusters.selectorChartOptionsUsers.column1.kpiSelected,
    KPISELECTED:
      state.statisticsClusters.selectorChartOptions.column1.kpiSelected,

    ACTUALCONFIG_ERLANG: state.statisticsClusters.configErlang,
    ACTUALCONFIG_PAYLOAD: state.statisticsClusters.configPayload,
    ACTUALCONFIG_CCR: state.statisticsClusters.configCcr,
    ACTUALCONFIG_PCR: state.statisticsClusters.configPcr,
    ACTUALCONFIG_USERS: state.statisticsClusters.configUsers,
    ACTUALCONFIG: state.statisticsClusters.config,

    THEME_ERLANG: state.statisticsClusters.themeErlang,
    THEME_PAYLOAD: state.statisticsClusters.themePayload,
    THEME_CCR: state.statisticsClusters.themeCcr,
    THEME_PCR: state.statisticsClusters.themePcr,
    THEME_USERS: state.statisticsClusters.themeUsers,
    THEME: state.statisticsClusters.themeErlang,

    TYPECHART_ERLANG:
      state.statisticsClusters.selectorChartOptionsErlang.column1
        .typeChartSelected,
    TYPECHART_PAYLOAD:
      state.statisticsClusters.selectorChartOptionsPayload.column1
        .typeChartSelected,
    TYPECHART_CCR:
      state.statisticsClusters.selectorChartOptionsCcr.column1
        .typeChartSelected,
    TYPECHART_PCR:
      state.statisticsClusters.selectorChartOptionsPcr.column1
        .typeChartSelected,
    TYPECHART_USERS:
      state.statisticsClusters.selectorChartOptionsUsers.column1
        .typeChartSelected,
    TYPECHART:
      state.statisticsClusters.selectorChartOptions.column1.typeChartSelected,

    ADITIONALCHARTOPTIONS_ERLANG:
      state.statisticsClusters.selectorChartOptionsErlang,
    ADITIONALCHARTOPTIONS_PAYLOAD:
      state.statisticsClusters.selectorChartOptionsPayload,
    ADITIONALCHARTOPTIONS_CCR: state.statisticsClusters.selectorChartOptionsCcr,
    ADITIONALCHARTOPTIONS_PCR: state.statisticsClusters.selectorChartOptionsPcr,
    ADITIONALCHARTOPTIONS_USERS:
      state.statisticsClusters.selectorChartOptionsUsers,
    ADITIONALCHARTOPTIONS: state.statisticsClusters.selectorChartOptions,

    IDREGION: state.statisticsClusters.selectedRegion.ID,
    SINCETHEDATE: state.statisticsClusters.selectedTimeLapse.since,
    UNTILTHEDATE: state.statisticsClusters.selectedTimeLapse.until,
    REGION: state.statisticsClusters.selectedRegion.REGION,
    CLUSTER: state.statisticsClusters.selectedCluster.CLUST,
    IDGROUP: state.statisticsClusters.selectedGroup.ID,

    consult: state.statisticsClusters.consult,
    clusters: state.statisticsClusters.clusters,

    stateGroupOption: state.statisticsClusters.stateGroupOption,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setChartOptionsErlang,
        setChartOptionsPayload,
        setChartOptionsCcr,
        setChartOptionsPcr,
        setChartOptionsUser,
        setStateChartOptionsErlang,
        setStateChartOptionsPayload,
        setStateChartOptionsCcr,
        setStateChartOptionsPcr,
        setStateChartOptionsUsers,
        setStateChartOptions,
        setConfigChartErlang,
        setConfigChartPayload,
        setConfigChartCcr,
        setConfigChartPcr,
        setConfigChartUsers,
        setConfigChartConsult,
        setPreloaderStateErlang,
        setPreloaderStatePayload,
        setPreloaderStateCcr,
        setPreloaderStatePcr,
        setPreloaderStateUsers,
        menuSelectorLapse,
        statisticsErlangRequest,
        statisticsPayloadRequest,
        statisticsCcrRequest,
        statisticsPcrRequest,
        statisticsUsersRequest,
        statisticsRequest,
        showCluster,
        showSearchCluster,
        selectedCluster,
        showSearchRegion,
        setSetStateGroupMenu,
        changeConsultState,
      },
      dispatch
    ),
  }
}

const ClustersConnect = connect(mapStateToProps, mapDispatchToProps)(
  withTheme(Clusters)
)

export default ClustersConnect
