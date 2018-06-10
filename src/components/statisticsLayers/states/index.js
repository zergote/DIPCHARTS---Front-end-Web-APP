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
  showState,
  showSearchState,
  selectedState,
  showSearchRegion,
  setSetStateGroupMenu,
  setConfigChartConsult,
  changeConsultState,
} from './actions.js'

const { Div } = glamorous

class States extends Component {
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
    this.props.actions.showState(false)
    this.props.actions.showSearchState(false)
    this.props.actions.selectedState('')
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
          backgroundColor: '#B6B6B6',
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
        Object.keys(this.props.states).length > 0 &&
        this.props.ESTADO === undefined
      ) {
        this.props.actions.showState(true)
        this.props.actions.showSearchState(true)
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
      this.props.ESTADO === undefined ||
      this.props.ESTADO === 'SIN CONEXION'
    ) {
      this.props.actions.showState(false)
    }
    this.props.actions.showSearchState(false)
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
    let ESTADO = this.props.ESTADO
    let IDGROUP = this.props.IDGROUP
    //Se convertierte las cadenas de texto a formato Titulo
    let REGION = this.props.REGION.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })

    if (this.props.IDREGION !== null && this.props.ESTADO !== undefined) {
      this.props.actions.statisticsRequest({
        KPISELECTED,
        ACTUALCONFIG,
        ADITIONALCHARTOPTIONS,
        TYPECHART,
        THEME,
        SINCETHEDATE,
        UNTILTHEDATE,
        ESTADO,
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
    let ESTADO = this.props.ESTADO
    let IDGROUP = this.props.IDGROUP
    //Se convertierte las cadenas de texto a formato Titulo
    let REGION = this.props.REGION.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
    if (this.props.IDREGION !== null && this.props.ESTADO !== undefined) {
      this.props.actions.statisticsErlangRequest({
        KPISELECTED,
        ACTUALCONFIG,
        ADITIONALCHARTOPTIONS,
        TYPECHART,
        THEME,
        SINCETHEDATE,
        UNTILTHEDATE,
        ESTADO,
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
    let ESTADO = this.props.ESTADO
    let IDGROUP = this.props.IDGROUP

    //Se convertierte las cadenas de texto a formato Titulo
    let REGION = this.props.REGION.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })

    if (this.props.IDREGION !== null && this.props.ESTADO !== undefined) {
      this.props.actions.statisticsPayloadRequest({
        KPISELECTED,
        ACTUALCONFIG,
        ADITIONALCHARTOPTIONS,
        TYPECHART,
        THEME,
        SINCETHEDATE,
        UNTILTHEDATE,
        ESTADO,
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
    let ESTADO = this.props.ESTADO
    let IDGROUP = this.props.IDGROUP

    //Se convertierte las cadenas de texto a formato Titulo
    let REGION = this.props.REGION.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })

    if (this.props.IDREGION !== null && this.props.ESTADO !== undefined) {
      this.props.actions.statisticsCcrRequest({
        KPISELECTED,
        ACTUALCONFIG,
        ADITIONALCHARTOPTIONS,
        TYPECHART,
        THEME,
        SINCETHEDATE,
        UNTILTHEDATE,
        ESTADO,
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
    let ESTADO = this.props.ESTADO
    let IDGROUP = this.props.IDGROUP

    //Se convertierte las cadenas de texto a formato Titulo
    let REGION = this.props.REGION.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })

    if (this.props.IDREGION !== null && this.props.ESTADO !== undefined) {
      this.props.actions.statisticsPcrRequest({
        KPISELECTED,
        ACTUALCONFIG,
        ADITIONALCHARTOPTIONS,
        TYPECHART,
        THEME,
        SINCETHEDATE,
        UNTILTHEDATE,
        ESTADO,
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
    let ESTADO = this.props.ESTADO
    let IDGROUP = this.props.IDGROUP
    //Se convertierte las cadenas de texto a formato Titulo
    let REGION = this.props.REGION.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })

    if (this.props.IDREGION !== null && this.props.ESTADO !== undefined) {
      this.props.actions.statisticsUsersRequest({
        KPISELECTED,
        ACTUALCONFIG,
        ADITIONALCHARTOPTIONS,
        TYPECHART,
        THEME,
        SINCETHEDATE,
        UNTILTHEDATE,
        ESTADO,
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
              ESTADO {this.props.ESTADO !== undefined ? '>' : null}{' '}
              {this.props.ESTADO} {this.props.ESTADO !== undefined ? '>' : null}
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
              showStates={this.props.showStates}
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
                  showStates={this.props.showStates}
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
                  showStates={this.props.showStates}
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
                  showStates={this.props.showStates}
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
                  showStates={this.props.showStates}
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
                  showStates={this.props.showStates}
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
      state.statisticsStates.selectorChartOptionsErlang,
    selectorChartOptionsPayload:
      state.statisticsStates.selectorChartOptionsPayload,
    selectorChartOptionsCcr: state.statisticsStates.selectorChartOptionsCcr,
    selectorChartOptionsPcr: state.statisticsStates.selectorChartOptionsPcr,
    selectorChartOptionsUsers: state.statisticsStates.selectorChartOptionsUsers,
    selectorChartOptions: state.statisticsStates.selectorChartOptions,

    stateChartOptionsErlang: state.statisticsStates.stateChartOptionsErlang,
    stateChartOptionsPayload: state.statisticsStates.stateChartOptionsPayload,
    stateChartOptionsCcr: state.statisticsStates.stateChartOptionsCcr,
    stateChartOptionsPcr: state.statisticsStates.stateChartOptionsPcr,
    stateChartOptionsUsers: state.statisticsStates.stateChartOptionsUsers,
    stateChartOptions: state.statisticsStates.stateChartOptions,

    servicesErlang: state.statisticsStates.servicesErlang,
    servicesPayload: state.statisticsStates.servicesPayload,
    servicesCcr: state.statisticsStates.servicesCcr,
    servicesPcr: state.statisticsStates.servicesPcr,
    servicesUsers: state.statisticsStates.servicesUsers,
    services: state.statisticsStates.services,

    showStates: state.statisticsStates.showStates,

    configErlang: state.statisticsStates.configErlang,
    configPayload: state.statisticsStates.configPayload,
    configCcr: state.statisticsStates.configCcr,
    configPcr: state.statisticsStates.configPcr,
    configUsers: state.statisticsStates.configUsers,
    config: state.statisticsStates.config,

    themeErlang: state.statisticsStates.themeErlang,
    themePayload: state.statisticsStates.themePayload,
    themeCcr: state.statisticsStates.themeCcr,
    themePcr: state.statisticsStates.themePcr,
    themeUsers: state.statisticsStates.themeUsers,

    completeFetchDataErlang: state.statisticsStates.completeFetchDataErlang,
    completeFetchDataPayload: state.statisticsStates.completeFetchDataPayload,
    completeFetchDataCcr: state.statisticsStates.completeFetchDataCcr,
    completeFetchDataPcr: state.statisticsStates.completeFetchDataPcr,
    completeFetchDataUsers: state.statisticsStates.completeFetchDataUsers,
    completeFetchData: state.statisticsStates.completeFetchData,

    dropMenuShowSelectorLapse: state.statisticsStates.dropMenuShowSelectorLapse,

    KPISELECTED_ERLANG:
      state.statisticsStates.selectorChartOptionsErlang.column1.kpiSelected,
    KPISELECTED_PAYLOAD:
      state.statisticsStates.selectorChartOptionsPayload.column1.kpiSelected,
    KPISELECTED_CCR:
      state.statisticsStates.selectorChartOptionsCcr.column1.kpiSelected,
    KPISELECTED_PCR:
      state.statisticsStates.selectorChartOptionsPcr.column1.kpiSelected,
    KPISELECTED_USERS:
      state.statisticsStates.selectorChartOptionsUsers.column1.kpiSelected,
    KPISELECTED:
      state.statisticsStates.selectorChartOptions.column1.kpiSelected,

    ACTUALCONFIG_ERLANG: state.statisticsStates.configErlang,
    ACTUALCONFIG_PAYLOAD: state.statisticsStates.configPayload,
    ACTUALCONFIG_CCR: state.statisticsStates.configCcr,
    ACTUALCONFIG_PCR: state.statisticsStates.configPcr,
    ACTUALCONFIG_USERS: state.statisticsStates.configUsers,
    ACTUALCONFIG: state.statisticsStates.config,

    THEME_ERLANG: state.statisticsStates.themeErlang,
    THEME_PAYLOAD: state.statisticsStates.themePayload,
    THEME_CCR: state.statisticsStates.themeCcr,
    THEME_PCR: state.statisticsStates.themePcr,
    THEME_USERS: state.statisticsStates.themeUsers,
    THEME: state.statisticsStates.theme,

    TYPECHART_ERLANG:
      state.statisticsStates.selectorChartOptionsErlang.column1
        .typeChartSelected,
    TYPECHART_PAYLOAD:
      state.statisticsStates.selectorChartOptionsPayload.column1
        .typeChartSelected,
    TYPECHART_CCR:
      state.statisticsStates.selectorChartOptionsCcr.column1.typeChartSelected,
    TYPECHART_PCR:
      state.statisticsStates.selectorChartOptionsPcr.column1.typeChartSelected,
    TYPECHART_USERS:
      state.statisticsStates.selectorChartOptionsUsers.column1
        .typeChartSelected,
    TYPECHART:
      state.statisticsStates.selectorChartOptions.column1.typeChartSelected,

    ADITIONALCHARTOPTIONS_ERLANG:
      state.statisticsStates.selectorChartOptionsErlang,
    ADITIONALCHARTOPTIONS_PAYLOAD:
      state.statisticsStates.selectorChartOptionsPayload,
    ADITIONALCHARTOPTIONS_CCR: state.statisticsStates.selectorChartOptionsCcr,
    ADITIONALCHARTOPTIONS_PCR: state.statisticsStates.selectorChartOptionsPcr,
    ADITIONALCHARTOPTIONS_USERS:
      state.statisticsStates.selectorChartOptionsUsers,
    ADITIONALCHARTOPTIONS: state.statisticsStates.selectorChartOptions,

    IDREGION: state.statisticsStates.selectedRegion.ID,
    SINCETHEDATE: state.statisticsStates.selectedTimeLapse.since,
    UNTILTHEDATE: state.statisticsStates.selectedTimeLapse.until,
    REGION: state.statisticsStates.selectedRegion.REGION,
    ESTADO: state.statisticsStates.selectedState.ESTADO,
    IDGROUP: state.statisticsStates.selectedGroup.ID,

    consult: state.statisticsStates.consult,
    states: state.statisticsStates.states,

    stateGroupOption: state.statisticsStates.stateGroupOption,
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
        showState,
        showSearchState,
        selectedState,
        showSearchRegion,
        setSetStateGroupMenu,
        setConfigChartConsult,
        changeConsultState,
      },
      dispatch
    ),
  }
}

const StatesConnect = connect(mapStateToProps, mapDispatchToProps)(
  withTheme(States)
)

export default StatesConnect
