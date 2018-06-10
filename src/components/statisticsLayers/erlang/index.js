import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
import { Scrollbars } from 'react-custom-scrollbars'
import Chart from './components/chart'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Breadcrumb from './components/breadcrumb'
import ContextualMenu from './components/contextualMenu'
import RefreshData from './components/refreshData'
import {
  setStateChartOptions,
  setConfigChart,
  setPreloaderState,
  menuSelectorLapse,
  menuSelectorService,
  setSetStateGroupMenu,
  statisticsRequest,
} from './actions.js'
const { Div } = glamorous

class Erlang extends Component {
  constructor(props) {
    super(props)
    this.renderThumb = this.renderThumb.bind(this)
    this.handleHideMenusOusideEvent = this.handleHideMenusOusideEvent.bind(this)
    this.handleChartOptions = this.handleChartOptions.bind(this)
    this.initiateRequests = this.initiateRequests.bind(this)
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

    if (this.props.dropMenuShowSelectorService)
      this.props.actions.menuSelectorService(false)

    if (this.props.stateGroupOption) {
      this.props.actions.setSetStateGroupMenu(false)
    }
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
    let KPISELECTED = this.props.KPISELECTED
    let ACTUALCONFIG = this.props.ACTUALCONFIG
    let THEME = this.props.THEME
    let IDSECTOR = this.props.IDSECTOR
    let IDSERVICE = this.props.IDSERVICE
    let SINCETHEDATE = this.props.SINCETHEDATE
    let UNTILTHEDATE = this.props.UNTILTHEDATE
    let STATION = this.props.STATION
    let SECTOR = this.props.SECTOR
    let TYPECHART = this.props.TYPECHART
    let IDGROUP = this.props.IDGROUP
    let ADITIONALCHARTOPTIONS = this.props.ADITIONALCHARTOPTIONS
    let SERVICENAME = this.props.SERVICENAME

    //Se convertierte las cadenas de texto a formato Titulo
    let REGION = this.props.REGION.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })

    if (this.props.IDREGION !== null) {
      this.props.actions.statisticsRequest({
        KPISELECTED,
        ACTUALCONFIG,
        THEME,
        TYPECHART,
        IDSECTOR,
        IDSERVICE,
        SINCETHEDATE,
        UNTILTHEDATE,
        REGION,
        STATION,
        SECTOR,
        IDGROUP,
        ADITIONALCHARTOPTIONS,
        SERVICENAME,
      })
    }
  }

  //No se pinda el cintillo de color fucsia para cuando se grafica, revisar si se puede renderizar luego de aplicar estados

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
          onUpdate={this.handleUpdate}
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
              ESTADISTICAS PARA ERLANG
            </Div>
          </Div>
          <Breadcrumb initiateRequests={this.initiateRequests} />
          <div>
            <div>
              <Chart
                contour="contour"
                typeChart="highstock"
                config={this.props.config}
                completeFetchData={this.props.completeFetchData}
                theme={this.props.THEME}
                handleChartOptions={this.handleChartOptions}
                initiateRequests={this.initiateRequests}
              />
            </div>
          </div>
        </Scrollbars>
      </Div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stateChartOptions: state.statisticsErlang.stateChartOptions,
    config: state.statisticsErlang.config,
    completeFetchData: state.statisticsErlang.completeFetchData,
    dropMenuShowSelectorLapse: state.statisticsErlang.dropMenuShowSelectorLapse,
    dropMenuShowSelectorService:
      state.statisticsErlang.dropMenuShowSelectorService,
    stateGroupOption: state.statisticsErlang.stateGroupOption,
    KPISELECTED:
      state.statisticsErlang.selectorChartOptions.column1.kpiSelected,
    ACTUALCONFIG: state.statisticsErlang.config,
    THEME: state.statisticsErlang.theme,
    IDREGION: state.statisticsErlang.selectedRegion.ID,
    IDSECTOR: state.statisticsErlang.selectedSector.ID,
    IDSERVICE: state.statisticsErlang.selectedService.ID,
    SINCETHEDATE: state.statisticsErlang.selectedTimeLapse.since,
    UNTILTHEDATE: state.statisticsErlang.selectedTimeLapse.until,
    REGION: state.statisticsErlang.selectedRegion.REGION,
    STATION: state.statisticsErlang.selectedStation.STATION,
    SECTOR: state.statisticsErlang.selectedSector.SECTOR,
    TYPECHART:
      state.statisticsErlang.selectorChartOptions.column1.typeChartSelected,
    IDGROUP: state.statisticsErlang.selectedGroup.ID,
    ADITIONALCHARTOPTIONS: state.statisticsErlang.selectorChartOptions,
    SERVICENAME: state.statisticsErlang.selectedService.SERVICE,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setStateChartOptions,
        setConfigChart,
        setPreloaderState,
        menuSelectorLapse,
        menuSelectorService,
        setSetStateGroupMenu,
        statisticsRequest,
      },
      dispatch
    ),
  }
}

const ErlangConnect = connect(mapStateToProps, mapDispatchToProps)(
  withTheme(Erlang)
)

export default ErlangConnect
