import React, { Component } from 'react'
import glamourus, { withTheme } from 'glamorous'
import moment from 'moment'
import InfiniteCalendar, { Calendar, withRange } from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css' // Make sure to import the default stylesheet
import Modal from 'react-modal'
import { Scrollbars } from 'react-custom-scrollbars'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  menuSelectorLapse,
  showRegion,
  showSearchRegion,
  selectedRegion,
  regionSuggestions,
  showMarket,
  showSearchMarket,
  marketsSuggestions,
  selectedMarket,
  modalCalendar,
  setCalendarDateStart,
  setCalendarDateEnd,
  setSelectedTimeLapse,
  regionInputChange,
  marketInputChange,
  regionRequest,
  marketsRequest,
  fillMarketsWithResquest,
  setStateChartOptionsErlang,
  setStateChartOptionsPayload,
  setStateChartOptionsCcr,
  setStateChartOptionsPcr,
  setStateChartOptionsUsers,
  statisticsErlangRequest,
  changeConsultState,
  setStateChartOptions,
} from '../../actions.js'
import ReactTooltip from "react-tooltip";

const { Div, Span, Input, Button } = glamourus

class Breadcrumb extends Component {
  constructor(props) {
    super(props)
    this.renderThumb = this.renderThumb.bind(this)
    this.handleShowSelectorLapse = this.handleShowSelectorLapse.bind(this)
    this.handleHideSelectors = this.handleHideSelectors.bind(this)
    this.handleSetTimeLapse = this.handleSetTimeLapse.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleSetRangeTime = this.handleSetRangeTime.bind(this)
    this.handleShowMarket = this.handleShowMarket.bind(this)
    this.handleHideMarket = this.handleHideMarket.bind(this)
    this.handleRegionChangeShowSuggestions = this.handleRegionChangeShowSuggestions.bind(
      this
    )
    this.handleMarketChangeShowSuggestions = this.handleMarketChangeShowSuggestions.bind(
      this
    )

    this.timeLapseSelector = this.timeLapseSelector.bind(this)
    this.handleSearchElementRegion = this.handleSearchElementRegion.bind(this)
    this.handleSearchElementMarket = this.handleSearchElementMarket.bind(this)

    this.handleChangeMarket = this.handleChangeMarket.bind(this)

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleSetRegion = this.handleSetRegion.bind(this)
    this.handleSetMarket = this.handleSetMarket.bind(this)
    this.handleCleanInputs = this.handleCleanInputs.bind(this)
    this.handleOnclickBreadcrumb = this.handleOnclickBreadcrumb.bind(this)
    this.handleMoreDetails = this.handleMoreDetails.bind(this)
    this.handleConsult = this.handleConsult.bind(this)
  }

  handleConsult() {
    this.tooltip.hideTooltip()
    if (this.props.state.consult) {
      let value = {
        label:
          moment()
            .subtract(6, 'd')
            .format('YYYYMMDD') +
          ' - ' +
          moment().format('DD/MM/YY'),
        since: moment()
          .subtract(6, 'd')
          .format('YYYYMMDD'),
        until: moment().format('YYYYMMDD'),
      }

      this.props.actions.setSelectedTimeLapse(value)
      this.props.actions.changeConsultState(false)
    } else {
      let value = {
        label: moment().format('DD/MM/YY'),
        since: moment().format('YYYYMMDD'),
        until: moment().format('YYYYMMDD'),
      }
      this.props.actions.changeConsultState(true)
      this.props.actions.setSelectedTimeLapse(value)
    }
    this.props.actions.showSearchMarket(false)
    if (this.props.state.selectedMarket === '')
      this.props.actions.showMarket(false)
    if (
      this.props.state.consult === true &&
      this.props.state.configErlang.series.length === 1
    ) {
      this.props.actions.showMarket(false)
    }
  }
  componentWillMount() {
    if (Object.keys(this.props.state.regions).length === 1) {
      this.props.actions.regionRequest(
        this.props.user,
        this.props.state.selectedGroup.ID
      )
      setTimeout(() => {
        let IDREGION = this.props.state.selectedRegion.ID
        let IDGROUP = this.props.state.selectedGroup.ID
        this.props.actions.marketsRequest(IDREGION, IDGROUP)
      }, 2000)
    }
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

  handleOnclickBreadcrumb() {
    this.props.actions.setStateChartOptionsErlang(false)
    this.props.actions.setStateChartOptionsPayload(false)
    this.props.actions.setStateChartOptionsCcr(false)
    this.props.actions.setStateChartOptionsPcr(false)
    this.props.actions.setStateChartOptionsUsers(false)
  }
  handleCleanInputs() {
    this.props.actions.regionInputChange('')
    this.props.actions.marketInputChange('')
  }

  handleShowSelectorLapse() {
    this.tooltip.hideTooltip()
    this.props.actions.menuSelectorLapse(true)
    this.props.actions.showSearchRegion(false)
  }

  handleHideSelectors() {
    if (this.props.state.dropMenuShowSelectorLapse === true)
      this.props.actions.menuSelectorLapse(false)
  }

  handleSetTimeLapse(value) {
    if (value.label === 'HOY') {
      this.props.actions.setSelectedTimeLapse({
        label: moment(value.since).format('DD/MM/YY'),
        since: value.since,
        until: value.until,
      })
      this.props.actions.menuSelectorLapse(false)
      if (this.props.state.selectedMarket === '') return
      setTimeout(() => {
        this.props.initiateRequests()
      }, 5)
    } else if (value.label === 'ULTIMA SEMANA') {
      this.props.actions.setSelectedTimeLapse({
        label:
          moment(value.since).format('DD/MM/YY') +
          ' - ' +
          moment(value.until).format('DD/MM/YY'),
        since: value.since,
        until: value.until,
      })
      this.props.actions.menuSelectorLapse(false)
      if (this.props.state.selectedMarket === '') return
      setTimeout(() => {
        this.props.initiateRequests()
      }, 5)
    } else if (value.label === 'ULTIMO MES') {
      this.props.actions.setSelectedTimeLapse({
        label:
          moment(value.since).format('DD/MM/YY') +
          ' - ' +
          moment(value.until).format('DD/MM/YY'),
        since: value.since,
        until: value.until,
      })
      this.props.actions.menuSelectorLapse(false)
      if (this.props.state.selectedMarket === '') return
      setTimeout(() => {
        this.props.initiateRequests()
      }, 5)
    } else if (value.label === 'UlTIMO TRIMESTRE') {
      this.props.actions.setSelectedTimeLapse({
        label:
          moment(value.since).format('DD/MM/YY') +
          ' - ' +
          moment(value.until).format('DD/MM/YY'),
        since: value.since,
        until: value.until,
      })
      this.props.actions.menuSelectorLapse(false)
      if (this.props.state.selectedMarket === '') return
      setTimeout(() => {
        this.props.initiateRequests()
      }, 5)
    } else if (value.label === 'PERSONALIZADO') {
      this.props.actions.menuSelectorLapse(false)
      this.handleOpenModal()
    }
  }

  handleOpenModal() {
    this.props.actions.modalCalendar(true)
  }

  handleCloseModal() {
    this.props.actions.modalCalendar(false)
  }

  handleSetRangeTime(objectDatesEvent) {
    if (objectDatesEvent.eventType === 3) {
      this.props.actions.setCalendarDateStart(moment(objectDatesEvent.start))
      this.props.actions.setCalendarDateEnd(moment(objectDatesEvent.end))
      this.props.actions.setSelectedTimeLapse({
        label:
          moment(objectDatesEvent.start).format('DD/MM/YY') +
          ' - ' +
          moment(objectDatesEvent.end).format('DD/MM/YY'),
        since: moment(objectDatesEvent.start).format('YYYYMMDD'),
        until: moment(objectDatesEvent.end).format('YYYYMMDD'),
      })
      if (this.props.state.selectedMarket === '') return
      setTimeout(() => {
        this.handleCloseModal()
        this.props.initiateRequests()
      }, 500)
    }
  }

  timeLapseSelector() {
    return (
      <Div data-tip="Fecha" css={{ display: 'inline-block' }}>
        <Modal
          style={customStyles}
          contentLabel="Calendario"
          isOpen={this.props.state.openModalCalendar}
          onRequestClose={this.handleCloseModal}
        >
          <InfiniteCalendar
            onSelect={this.handleSetRangeTime}
            allowRanges={true}
            selected={{
              start: this.props.state.selectedTimeLapse.since,
              end: this.props.state.selectedTimeLapse.until,
            }}
            width={800}
            height={400}
            max={new Date()}
            maxDate={new Date()}
            Component={withRange(Calendar)}
            locale={{
              locale: require('date-fns/locale/es'),
              headerFormat: 'dddd, D MMM',
              weekdays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
              blank: 'No hay fecha seleccionada',
              todayLabel: {
                long: 'Hoy',
                short: 'Hoy',
              },
            }}
            theme={{
              selectionColor: '#262626',
              textColor: {
                default: '#333',
                active: '#CCCCCC',
              },
              weekdayColor: '#333333',
              headerColor: '#3b5998',
              floatingNav: {
                background: '#434343',
                color: '#CCCCCC',
                chevron: '#FFA726',
              },
            }}
          />
        </Modal>

        <Span
          css={{
            float: 'left',
            fontSize: '12px',
            fontWeight: 'bold',
            lineHeight: '36px',
            minWidth: '4.4em',
            padding: '0 10px 0 30px',
            position: 'relative',
            background: this.props.theme.breadcrumbBg,
            color: this.props.theme.fontColor,
            transition: 'all 0.7s',
            textAlign: 'center',
            ':after': {
              content: ' ',
              position: 'absolute',
              top: '.1em',
              right: '-18px',
              width: '34px',
              height: '34px',
              transform: 'scale(0.707) rotate(45deg)',
              zIndex: 1,
              boxShadow:
                '2px -2px 0 2px rgba(0, 0, 0, 0.4),3px -3px 0 2px rgba(255, 255, 255, 0.1)',
              borderRadius: ' 0 5px 0 50px',
              background: this.props.theme.breadcrumbBg,
              transition: 'all 0.7s',
            },
            ':before': {
              background: this.props.theme.primaryLevelBgColor,
              boxShadow: '0 0 0 1px #00c',
            },
            ':hover': {
              cursor: 'pointer',
              background: '#3b5998',
              color: this.props.theme.breadcrumbFontColorHover,
              ':after': {
                background: ' #3b5998',
              },
            },
          }}
          onClick={this.handleShowSelectorLapse}
        >
          {this.props.state.selectedTimeLapse.label}
        </Span>
        <Div
          css={{
            display: this.props.state.dropMenuShowSelectorLapse
              ? 'block'
              : 'none',
            position: 'absolute',
            marginTop: '2.35em',
            marginLeft: '0em',
            backgroundColor: this.props.theme.headerColor,
            minWidth: '4.4em',
            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
            zIndex: 20,
          }}
        >
          {Object.keys(this.props.state.timeLapses).map(key => {
            return (
              <Div
                key={key}
                css={{
                  display:
                    this.props.state.selectedTimeLapses ===
                    this.props.state.timeLapses[key]
                      ? 'none'
                      : 'block',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: this.props.theme.fontColor,
                  background: this.props.theme.secondaryLevelBgColor,
                  padding: '0.750em 1em',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  ':hover': {
                    cursor: 'pointer',
                    background: this.props.theme.primaryLevelBgColor,
                  },
                }}
                onClick={() =>
                  this.handleSetTimeLapse(this.props.state.timeLapses[key])
                }
              >
                {this.props.state.timeLapses[key].label}
              </Div>
            )
          })}
        </Div>
      </Div>
    )
  }

  handleSearchElementRegion() {
    this.tooltip.hideTooltip()
    if (this.props.user.USER_LEVEL < 2) {
      this.handleCleanInputs()
      this.props.actions.showSearchRegion(true)
      this.props.actions.showMarket(false)
      this.props.actions.showSearchMarket(false)
      this.props.actions.setStateChartOptions(false)
    }
  }

  handleRegionChangeShowSuggestions(event) {
    if (event.target.value) {
      this.props.actions.regionSuggestions(true)
      this.props.actions.regionInputChange(event.target.value)
    } else {
      this.props.actions.regionInputChange('')
      //this.props.actions.regionSuggestions(false)
    }
  }

  handleSetRegion(value) {
    let ID = value.ID
    let REGION = value.REGION.toUpperCase()
    this.props.actions.fillMarketsWithResquest({
      sinconexion: { ID: null, MERCADO: 'CARGANDO...' },
    })
    this.props.actions.selectedRegion({ ID, REGION })
    this.props.actions.showSearchRegion(false)
    this.handleChangeMarket()
    let IDREGION = value.ID
    let IDGROUP = this.props.state.selectedGroup.ID
    setTimeout(() => {
      this.props.actions.showSearchMarket(true)
      this.props.actions.marketsRequest(IDREGION, IDGROUP)
    }, 5)
  }

  elementRegion() {
    return (
      <Div data-tip="Región" css={{ display: 'inline-block' }}>
        {!this.props.state.showSearchRegion ? (
          <Span
            onClick={this.handleSearchElementRegion}
            css={{
              float: 'left',
              fontSize: '12px',
              fontWeight: 'bold',
              lineHeight: '36px',
              padding: '0 10px 0 30px',
              position: 'relative',
              background: this.props.theme.breadcrumbBg,
              color: this.props.theme.fontColor,
              transition: 'all 0.7s',
              textAlign: 'center',
              borderRadius:
                this.props.state.showMarket === true ||
                this.props.state.showSearchMarket === true ||
                this.props.state.consult === false
                  ? '0px'
                  : '5px',
              ':after': {
                content:
                  this.props.state.showMarket === true ||
                  this.props.state.showSearchMarket === true
                    ? ' '
                    : '',
                position: 'absolute',
                top: '.1em',
                right: '-18px',
                width: '34px',
                height: '34px',
                transform: 'scale(0.707) rotate(45deg)',
                zIndex: 1,
                boxShadow:
                  '2px -2px 0 2px rgba(0, 0, 0, 0.4),3px -3px 0 2px rgba(255, 255, 255, 0.1)',
                borderRadius: ' 0 5px 0 50px',
                background: this.props.theme.breadcrumbBg,
                transition: 'all 0.7s',
              },
              ':before': {
                background: this.props.theme.primaryLevelBgColor,
                boxShadow: '0 0 0 1px #00c',
              },
              ':hover': {
                cursor: 'pointer',
                background: '#3b5998',
                color: this.props.theme.breadcrumbFontColorHover,
                ':after': {
                  background: ' #3b5998',
                },
              },
            }}
          >
            {this.props.state.selectedRegion.REGION}
          </Span>
        ) : (
          <Span
            css={{
              float: 'left',
              fontSize: '12px',
              fontWeight: 'bold',
              lineHeight: '36px',
              padding: '0 10px 0 30px',
              position: 'static',
              background: this.props.theme.breadcrumbBg,
              color: 'red',
              transition: 'all 0.7s',
              borderRadius: '0px',
              ':after': {
                content: '',
                position: 'absolute',
                top: '.1em',
                right: '-18px',
                width: '34px',
                height: '34px',
                transform: 'scale(0.707) rotate(45deg)',
                zIndex: 1,
                boxShadow:
                  '2px -2px 0 2px rgba(0, 0, 0, 0.4),3px -3px 0 2px rgba(255, 255, 255, 0.1)',
                borderRadius: ' 0 5px 0 50px',
                background: this.props.theme.breadcrumbBg,
                transition: 'all 0.7s',
              },
              ':before': {
                background: this.props.theme.primaryLevelBgColor,
                boxShadow: '0 0 0 1px #00c',
              },
              ':hover': {
                cursor: 'pointer',
                background: '#3b5998',
                color: this.props.theme.breadcrumbFontColorHover,
                ':after': {
                  background: ' #3b5998',
                },
              },
            }}
          >
            <Div
              css={{
                display: 'block',
                width: '14em',
                position: 'relative',
              }}
            >
              <Input
                autoFocus
                onChange={this.handleRegionChangeShowSuggestions}
                type="text"
                name="SearchRegion"
                placeholder={
                  this.props.state.selectedGroup.ID === 0
                    ? '  Buscar región'
                    : '  Buscar subregión'
                }
              />

              <Scrollbars
                style={{
                  display: this.props.state.regionSuggestions
                    ? 'block'
                    : 'none',
                  width: '14.75em',
                  height: '13em',
                  background: this.props.theme.secondaryLevelBgColor,
                  color: this.props.theme.fontColor,
                  flex: 1,
                  position: 'absolute',
                  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                  zIndex: 1,
                }}
                renderThumbHorizontal={this.renderThumb}
                renderThumbVertical={this.renderThumb}
                autoHide={false}
                // Hide delay in ms
                autoHideTimeout={1000}
                // Duration for hide animation in ms.
                autoHideDuration={200}
              >
                {Object.keys(this.props.state.regions)
                  .sort()
                  .map(key => {
                    if (
                      this.props.state.regions[
                        key
                      ].REGION.toUpperCase().indexOf(
                        this.props.state.regionInput.toUpperCase()
                      ) > -1
                    ) {
                      return (
                        <Div
                          key={key}
                          css={{
                            fontSize: '12px',
                            color: this.props.theme.fontColor,
                            background: this.props.theme.secondaryLevelBgColor,
                            padding: '0.1em 1em',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            ':hover': {
                              cursor: 'pointer',
                              background: this.props.theme.primaryLevelBgColor,
                            },
                          }}
                          onClick={() =>
                            this.handleSetRegion(this.props.state.regions[key])
                          }
                        >
                          {this.props.state.regions[key].REGION.toUpperCase()}
                        </Div>
                      )
                    } else {
                      return null
                    }
                  })}
              </Scrollbars>
            </Div>
          </Span>
        )}
      </Div>
    )
  }

  handleShowMarket() {
    this.props.actions.menuSelectorMarket(true)
  }

  handleHideMarket() {
    this.props.actions.menuSelectorMarket(false)
  }

  handleMarketChangeShowSuggestions(event) {
    if (event.target.value) {
      this.props.actions.marketsSuggestions(true)
      this.props.actions.marketInputChange(event.target.value)
    } else {
      this.props.actions.marketInputChange('')
    }
  }

  handleChangeMarket() {
    this.props.actions.showMarket(true)
    this.props.actions.showSearchMarket(true)
    //this.props.actions.selectedMarket('')
  }

  handleSearchElementMarket() {
    this.tooltip.hideTooltip()
    this.props.actions.setStateChartOptions(false)
    this.handleCleanInputs()
    setTimeout(() => {
      if (this.props.state.showMarket) {
        this.props.actions.showSearchMarket(true)
        this.props.actions.showSearchRegion(false)
      }
    }, 10)
  }

  handleSetMarket(value) {
    let ID = value.ID
    let MERCADO = value.MERCADO.toUpperCase()
    this.props.actions.selectedMarket({ ID, MERCADO })
    this.props.actions.showSearchMarket(false)
    setTimeout(() => {
      if (this.props.state.consult) {
        this.props.initiateRequests()
      } else {
        this.props.initateRequestBasicLastMonth()
      }
    }, 5)
  }

  elementMarket() {
    return (
      <Div
        data-tip="Mercado"
        css={{
          display: 'inline-block',
        }}
      >
        {!this.props.state.showSearchMarket ? (
          <Span
            onClick={this.handleSearchElementMarket}
            css={{
              float: 'left',
              fontSize: '12px',
              fontWeight: 'bold',
              lineHeight: '36px',
              padding: '0 10px 0 30px',
              position: 'relative',
              background: this.props.theme.breadcrumbBg,
              color: this.props.theme.fontColor,
              transition: 'all 0.7s',
              textAlign: 'center',
              borderRadius: '5px',
              ':after': {
                content: '',
                position: 'absolute',
                top: '.1em',
                right: '-18px',
                width: '34px',
                height: '34px',
                transform: 'scale(0.707) rotate(45deg)',
                zIndex: 1,
                boxShadow:
                  '2px -2px 0 2px rgba(0, 0, 0, 0.4),3px -3px 0 2px rgba(255, 255, 255, 0.1)',
                borderRadius: ' 0 5px 0 50px',
                background: this.props.theme.breadcrumbBg,
                transition: 'all 0.7s',
              },
              ':before': {
                background: this.props.theme.primaryLevelBgColor,
                boxShadow: '0 0 0 1px #00c',
              },
              ':hover': {
                cursor: 'pointer',
                background: '#3b5998',
                color: this.props.theme.breadcrumbFontColorHover,
                ':after': {
                  background: ' #3b5998',
                },
              },
            }}
          >
            <FontAwesome
              name="minus"
              onClick={this.handleChangeMarket}
              style={{
                margin: '0.49em 0.4em 0em 0.4em',
                textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
              }}
            />
            {this.props.state.selectedMarket.MERCADO}
          </Span>
        ) : (
          <Span
            css={{
              float: 'left',
              fontSize: '12px',
              fontWeight: 'bold',
              lineHeight: '36px',
              padding: '0 10px 0 30px',
              position: 'static',
              background: this.props.theme.breadcrumbBg,
              color: 'red',
              transition: 'all 0.7s',
              borderRadius: '0px',
              ':after': {
                content: '',
                position: 'absolute',
                top: '.1em',
                right: '-18px',
                width: '34px',
                height: '34px',
                transform: 'scale(0.707) rotate(45deg)',
                zIndex: 1,
                background: 'linear-gradient(135deg, #777, #333)',
                boxShadow:
                  '2px -2px 0 2px rgba(0, 0, 0, 0.4),3px -3px 0 2px rgba(255, 255, 255, 0.1)',
                borderRadius: ' 0 5px 0 50px',
                color: this.props.theme.fontColor,
                transition: 'all 0.7s',
              },
              ':before': {
                background: this.props.theme.primaryLevelBgColor,
                boxShadow: '0 0 0 1px #00c',
              },
              ':hover': {
                cursor: 'pointer',
                background: '#3b5998',
                color: this.props.theme.breadcrumbFontColorHover,
                ':after': {
                  background: ' #3b5998',
                },
              },
            }}
          >
            <Div
              css={{
                display: 'block',
                position: 'relative',
              }}
            >
              <FontAwesome
                name="minus"
                onClick={this.handleChangeMarket}
                style={{
                  margin: '0.49em 0.4em 0em 0.4em',
                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                }}
              />
              <Input
                autoFocus
                onChange={this.handleMarketChangeShowSuggestions}
                type="text"
                name="SearchMarket"
                placeholder="  Buscar market"
              />

              <Scrollbars
                style={{
                  display: this.props.state.marketsSuggestions
                    ? 'block'
                    : 'none',
                  width: '14.5em',
                  height: '13em',
                  marginLeft: '2em',
                  background: this.props.theme.secondaryLevelBgColor,
                  color: this.props.theme.fontColor,
                  flex: 1,
                  position: 'absolute',
                  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                  zIndex: 1,
                }}
                renderThumbHorizontal={this.renderThumb}
                renderThumbVertical={this.renderThumb}
                autoHide={false}
                // Hide delay in ms
                autoHideTimeout={1000}
                // Duration for hide animation in ms.
                autoHideDuration={200}
              >
                {Object.keys(this.props.state.markets)
                  .sort()
                  .map(key => {
                    if (
                      this.props.state.markets[
                        key
                      ].MERCADO.toUpperCase().indexOf(
                        this.props.state.marketInput.toUpperCase()
                      ) > -1
                    ) {
                      return (
                        <Div
                          key={key}
                          css={{
                            fontSize: '12px',
                            color: this.props.theme.fontColor,
                            background: this.props.theme.secondaryLevelBgColor,
                            padding: '0.1em 1em',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            ':hover': {
                              cursor: 'pointer',
                              background: this.props.theme.primaryLevelBgColor,
                            },
                          }}
                          onClick={() =>
                            this.handleSetMarket(this.props.state.markets[key])
                          }
                        >
                          {this.props.state.markets[key].MERCADO.toUpperCase()}
                        </Div>
                      )
                    } else {
                      return null
                    }
                  })}
              </Scrollbars>
            </Div>
          </Span>
        )}
      </Div>
    )
  }

  handleKeyDown(event) {
    if (event.keyCode === 13 /*enter*/) {
      if (this.props.state.showSearchRegion) {
        let filterRegions = Object.keys(this.props.state.regions)
          .sort()
          .map(key => {
            if (
              this.props.state.regions[key].REGION.toUpperCase().indexOf(
                this.props.state.regionInput.toUpperCase()
              ) > -1
            ) {
              return this.props.state.regions[key]
            } else {
              return undefined
            }
          })
        if (filterRegions.sort()[0] === undefined) {
          this.handleSetRegion(this.props.state.regions.sort()[0])
        } else {
          this.handleSetRegion(filterRegions.sort()[0])
        }
        this.props.actions.regionInputChange('')
      }
      if (this.props.state.showSearchMarket) {
        let filterMarkets = Object.keys(this.props.state.markets)
          .sort()
          .map(key => {
            if (
              this.props.state.markets[key].MERCADO.toUpperCase().indexOf(
                this.props.state.stateInput.toUpperCase()
              ) > -1
            ) {
              return this.props.state.markets[key]
            } else {
              return undefined
            }
          })
        if (filterMarkets.sort()[0] === undefined) {
          this.handleSetMarket(this.props.state.markets.sort()[0])
        } else {
          this.handleSetMarket(filterMarkets.sort()[0])
        }
        this.props.actions.marketInputChange('')
      }
    }
    if (event.keyCode === 27 /*esc*/) {
      this.props.actions.showSearchRegion(false)
      this.props.actions.showSearchMarket(false)
      this.props.actions.menuSelectorLapse(false)
      if (this.props.state.selectedMarket === '')
        this.props.actions.showMarket(false)
    }
  }

  handleMoreDetails() {
    if (!this.props.state.showMarket) {
      let IDREGION = this.props.state.selectedRegion.ID
      let IDGROUP = this.props.state.selectedGroup.ID
      this.props.actions.marketsRequest(IDREGION, IDGROUP)
      this.props.actions.setStateChartOptions(false)
    }
  }

  render() {
    return (
      <Div
        css={{
          display: 'inline-block',
          boxShadow: '0 0 15px 1px rgba(0, 0, 0, 0.35)',
          //overflowX: 'hidden',
          //overflowY: 'auto',
          borderRadius: '5px',
          position: 'relative',
          margin: '0em 0em -1em 0em',
          background:
            this.props.theme.tertiaryLevelBgColor === '#d3d3d3'
              ? '#d3d3d3'
              : 'transparent',
        }}
        onKeyDown={this.handleKeyDown}
        onClick={this.handleOnclickBreadcrumb}
      >
        <Button
          data-tip={
            this.props.state.consult
              ? 'Ir a vista básica'
              : 'Ir a vista avanzada'
          }
          css={{
            float: 'left',
            fontSize: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            lineHeight: '36px',
            position: 'static',
            background: this.props.theme.breadcrumbBg,
            width: '8em',
            color: this.props.theme.fontColor,
            transition: 'all .1s ease',
            borderRadius: '0px',
            boxShadow:
              '0px 7px 0px rgba(219,31,5,1), 0px 9px 25px rgba(0,0,0,.7)',
            ':hover': {
              cursor: 'pointer',
              background: '#3b5998',
              color: this.props.theme.breadcrumbFontColorHover,
              boxShadow:
                '0px 3px 0px rgba(219,31,5,1), 0px 3px 6px rgba(0,0,0,.9)',
              position: 'relative',
            },
          }}
          onClick={this.handleConsult}
        >
          {this.props.state.consult ? 'BASICA' : 'AVANZADA'}
        </Button>
        {this.props.state.consult ? (
          <span>
            {this.timeLapseSelector()}
            {this.elementRegion()}
            {this.props.state.showMarket ? this.elementMarket() : null}
            {Object.keys(this.props.state.regions).length === 1 ||
            this.props.state.showSector ||
            this.props.state.showSearchRegion ||
            this.props.state.showSearchMarket ||
            this.props.state.showMarket ? null : (
              <FontAwesome
                name="exclamation-circle"
                onClick={this.handleMoreDetails}
                size="lg"
                style={{
                  background: this.props.theme.secondaryLevelBgColor,
                  margin: '0.49em 0.4em 0em 0.4em',
                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  position:'absolute',
                  top:'0em'
                }}
              />
            )}
          </span>
        ) : (
          <span>
            {this.elementRegion()}
            {this.props.state.showMarket ? this.elementMarket() : null}
            {Object.keys(this.props.state.regions).length === 1 ||
            this.props.state.showSector ||
            this.props.state.showSearchRegion ||
            this.props.state.showSearchMarket ||
            this.props.state.showMarket ? null : (
              <FontAwesome
                name="exclamation-circle"
                onClick={this.handleMoreDetails}
                size="lg"
                style={{
                  background: this.props.theme.secondaryLevelBgColor,
                  margin: '0.49em 0.4em 0em 0.4em',
                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  position: 'absolute',
                  top:'0em'
                }}
              />
            )}
          </span>
        )}
          <ReactTooltip
            ref={node => (this.tooltip = node)}
            place="top"
            type="dark"
            effect="solid"
            delayShow={1000}
            scrollHide={true}
            resizeHide={true}
            border={true}
          />
      </Div>
    )
  }
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    margin: '0',
    padding: '0',
    backgroundColor: '#1F1F1F',
    transform: 'translate(-50%, -50%)',
    fontSmoothing: 'subpixel-antialiased',
    backFaseVisibility: 'hidden',
    borderStyle: 'solid',
    borderColor: '#262626',
    borderWidth: '.05em',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(34, 34, 34, 0.65)',
    zIndex: 99,
  },
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        menuSelectorLapse,
        showRegion,
        showSearchRegion,
        selectedRegion,
        regionSuggestions,
        showMarket,
        showSearchMarket,
        marketsSuggestions,
        selectedMarket,
        modalCalendar,
        setCalendarDateStart,
        setCalendarDateEnd,
        setSelectedTimeLapse,
        regionInputChange,
        marketInputChange,
        regionRequest,
        marketsRequest,
        fillMarketsWithResquest,
        setStateChartOptionsErlang,
        setStateChartOptionsPayload,
        setStateChartOptionsCcr,
        setStateChartOptionsPcr,
        setStateChartOptionsUsers,
        statisticsErlangRequest,
        changeConsultState,
        setStateChartOptions,
      },
      dispatch
    ),
  }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  state: state.statisticsMarkets,
  user: state.client.user,
})

const BreadcrumbConnected = connect(mapStateToProps, mapDispatchToProps)(
  withTheme(Breadcrumb)
)

export default BreadcrumbConnected
