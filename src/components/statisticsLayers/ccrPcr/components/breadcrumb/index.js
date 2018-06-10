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
  menuSelectorService,
  selectedService,
  showRegion,
  showSearchRegion,
  selectedRegion,
  regionSuggestions,
  showStation,
  showSearchStation,
  stationSuggestions,
  selectedStation,
  showSector,
  showSearchSector,
  sectorSuggestions,
  selectedSector,
  modalCalendar,
  setCalendarDateStart,
  setCalendarDateEnd,
  setSelectedTimeLapse,
  regionInputChange,
  stationInputChange,
  sectorInputChange,
  regionRequest,
  stationRequest,
  sectorRequest,
  fillStationsWithResquest,
  fillSectorsWithResquest,
  setStateChartOptions,
} from '../../actions.js'
import ReactTooltip from "react-tooltip";

const { Div, Span, Input } = glamourus

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
    this.handleShowStation = this.handleShowStation.bind(this)
    this.handleHideStation = this.handleHideStation.bind(this)
    this.handleShowSector = this.handleShowSector.bind(this)
    this.handleHideSector = this.handleHideSector.bind(this)
    this.handleRegionChangeShowSuggestions = this.handleRegionChangeShowSuggestions.bind(
      this
    )
    this.handleStationChangeShowSuggestions = this.handleStationChangeShowSuggestions.bind(
      this
    )
    this.handleSectorChangeShowSuggestions = this.handleSectorChangeShowSuggestions.bind(
      this
    )
    this.timeLapseSelector = this.timeLapseSelector.bind(this)
    this.handleMoreDetails = this.handleMoreDetails.bind(this)
    this.handleSearchElementRegion = this.handleSearchElementRegion.bind(this)
    this.handleSearchElementStation = this.handleSearchElementStation.bind(this)
    this.handleSearchElementSector = this.handleSearchElementSector.bind(this)

    this.handleSetService = this.handleSetService.bind(this)
    this.elementServices = this.elementServices.bind(this)
    this.handleDropShowServices = this.handleDropShowServices.bind(this)
    this.handleRemoveStation = this.handleRemoveStation.bind(this)
    this.handleRemoveSector = this.handleRemoveSector.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleSetRegion = this.handleSetRegion.bind(this)
    this.handleSetStation = this.handleSetStation.bind(this)
    this.handleSetSector = this.handleSetSector.bind(this)
    this.handleCleanInputs = this.handleCleanInputs.bind(this)
    this.handleOnclickBreadcrumb = this.handleOnclickBreadcrumb.bind(this)
  }

  componentWillMount() {
    if (Object.keys(this.props.state.regions).length === 1) {
      this.props.actions.regionRequest(
        this.props.user,
        this.props.state.selectedGroup.ID
      )
      setTimeout(() => {
        this.props.initiateRequests()
      }, 2000)
    }
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

  handleOnclickBreadcrumb() {
    this.props.actions.setStateChartOptions(false)
  }
  handleCleanInputs() {
    this.props.actions.regionInputChange('')
    this.props.actions.stationInputChange('')
    this.props.actions.sectorInputChange('')
  }

  handleShowSelectorLapse() {
    this.tooltip.hideTooltip()
    this.props.actions.menuSelectorLapse(true)
    this.props.actions.showSearchRegion(false)
  }

  handleHideSelectors() {
    if (this.props.state.dropMenuShowSelectorLapse === true)
      this.props.actions.menuSelectorLapse(false)
    if (this.props.state.dropMenuShowSelectorService === true)
      this.props.actions.menuSelectorService(false)
  }

  handleSetTimeLapse(value) {
    if (value.label === 'HOY') {
      this.props.actions.setSelectedTimeLapse({
        label: moment(value.since).format('DD/MM/YY'),
        since: value.since,
        until: value.until,
      })
      this.props.actions.menuSelectorLapse(false)
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

  handleDropShowServices() {
    this.tooltip.hideTooltip()
    this.props.actions.menuSelectorService(true)
    this.props.actions.showSearchRegion(false)
  }

  handleSetService(value) {
    this.handleRemoveStation()
    this.props.actions.selectedService(value)
    this.props.actions.menuSelectorService(false)
    setTimeout(() => {
      this.props.initiateRequests()
    }, 5)
  }

  elementServices() {
    return (
      <Div data-tip="Tecnología" css={{ display: 'inline-block' }}>
        <Span
          css={{
            float: 'left',
            fontSize: '12px',
            fontWeight: 'bold',
            lineHeight: '36px',
            minWidth: '5em',
            padding: '0 10px 0 30px',
            position: 'relative',
            background: this.props.theme.breadcrumbBg,
            color: this.props.theme.fontColor,
            textAlign: 'center',
            transition: 'all 0.7s',
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
              background: '#3b5998',
              color: this.props.theme.breadcrumbFontColorHover,
              ':after': {
                background: ' #3b5998',
              },
            },
          }}
          onClick={this.handleDropShowServices}
        >
          {this.props.state.selectedService.SERVICE}
        </Span>
        <Div
          css={{
            display: this.props.state.dropMenuShowSelectorService
              ? 'block'
              : 'none',
            position: 'absolute',
            marginTop: '2.35em',
            marginLeft:
              this.props.state.selectedTimeLapse.since ===
              this.props.state.selectedTimeLapse.until
                ? '0.3em'
                : '0.3em',
            backgroundColor: this.props.theme.fontColor,
            minWidth: '5em',
            width: '6.1em',
            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
            zIndex: 20,
          }}
        >
          {Object.keys(this.props.state.services)
            .sort()
            .map(key => {
              return (
                <Div
                  key={key}
                  css={{
                    display:
                      this.props.state.selectedService.SERVICE ===
                      this.props.state.services[key].SERVICE
                        ? 'none'
                        : 'block',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: this.props.theme.fontColor,
                    background: this.props.theme.secondaryLevelBgColor,
                    padding: '0.750em 1em',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    textAlign: 'center',
                    ':hover': {
                      background: this.props.theme.primaryLevelBgColor,
                    },
                  }}
                  onClick={() =>
                    this.handleSetService(this.props.state.services[key])
                  }
                >
                  {this.props.state.services[key].SERVICE}
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
      this.props.actions.showStation(false)
      this.props.actions.showSector(false)
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
    this.props.actions.fillStationsWithResquest({
      sinconexion: { ID: null, STATION: 'CARGANDO...' },
    })
    this.props.actions.selectedRegion({ ID, REGION })
    this.props.actions.showSearchRegion(false)
    this.handleRemoveStation()
    setTimeout(() => {
      this.props.initiateRequests()
    }, 5)
  }

  elementRegion() {
    return (
      <Div
        data-tip="Región"
        css={{
          display: 'inline-block',
        }}
      >
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
                this.props.state.showStation === true ||
                this.props.state.showSearchStation === true
                  ? '0px'
                  : '5px',
              ':after': {
                content:
                  this.props.state.showStation === true ||
                  this.props.state.showSearchStation === true
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

  handleShowStation() {
    this.props.actions.menuSelectorStation(true)
  }

  handleHideStation() {
    this.props.actions.menuSelectorStation(false)
  }

  handleStationChangeShowSuggestions(event) {
    if (event.target.value) {
      this.props.actions.stationSuggestions(true)
      this.props.actions.stationInputChange(event.target.value)
    } else {
      this.props.actions.stationInputChange('')
    }
  }

  handleRemoveStation() {
    this.props.actions.showStation(false)
    this.props.actions.showSearchStation(false)
    this.props.actions.selectedStation('')
    this.handleRemoveSector()
    setTimeout(() => {
      this.props.initiateRequests()
    }, 5)
  }

  handleSearchElementStation() {
    this.tooltip.hideTooltip()
    this.handleCleanInputs()
    setTimeout(() => {
      if (this.props.state.showStation) {
        this.props.actions.showSearchStation(true)
        this.props.actions.showSearchRegion(false)
        this.props.actions.showSearchSector(false)
      }
    }, 10)
    if (
      this.props.state.selectedSector === '' &&
      this.props.state.showSector === true
    )
      this.handleRemoveSector()
  }

  handleSetStation(value) {
    let ID = value.ID
    let STATION = value.STATION.toUpperCase()
    this.props.actions.fillSectorsWithResquest({
      sinconexion: { ID: null, SECTOR: 'CARGANDO...' },
    })
    this.props.actions.selectedStation({ ID, STATION })
    this.props.actions.showSearchStation(false)
    setTimeout(() => {
      this.props.initiateRequests()
    }, 5)
    this.handleRemoveSector()
  }

  elementStation() {
    return (
      <Div
        data-tip="Estación"
        css={{
          display: 'inline-block',
        }}
      >
        {!this.props.state.showSearchStation ? (
          <Span
            onClick={this.handleSearchElementStation}
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
                this.props.state.showSector === true ||
                this.props.state.showSearchSector === true
                  ? '0px'
                  : '5px',
              ':after': {
                content:
                  this.props.state.showSector === true ||
                  this.props.state.showSearchSector === true
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
              onClick={this.handleRemoveStation}
              style={{
                margin: '0.49em 0.4em 0em 0.4em',
                textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
              }}
            />
            {this.props.state.selectedStation.STATION}
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
                onClick={this.handleRemoveStation}
                style={{
                  margin: '0.49em 0.4em 0em 0.4em',
                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                }}
              />
              <Input
                autoFocus
                onChange={this.handleStationChangeShowSuggestions}
                type="text"
                name="SearchStation"
                placeholder="  Buscar estación"
              />

              <Scrollbars
                style={{
                  display: this.props.state.stationSuggestions
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
                {Object.keys(this.props.state.stations)
                  .sort()
                  .map(key => {
                    if (
                      this.props.state.stations[
                        key
                      ].STATION.toUpperCase().indexOf(
                        this.props.state.stationInput.toUpperCase()
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
                              background: this.props.theme.primaryLevelBgColor,
                            },
                          }}
                          onClick={() =>
                            this.handleSetStation(
                              this.props.state.stations[key]
                            )
                          }
                        >
                          {this.props.state.stations[key].STATION.toUpperCase()}
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

  handleShowSector() {
    this.props.actions.showSector(true)
  }

  handleHideSector() {
    this.props.actions.showSector(false)
  }
  handleSectorChangeShowSuggestions(event) {
    if (event.target.value) {
      this.props.actions.sectorSuggestions(true)
      this.props.actions.sectorInputChange(event.target.value)
    } else {
      this.props.actions.sectorInputChange('')
    }
  }

  handleSearchElementSector() {
    this.tooltip.hideTooltip()
    this.handleCleanInputs()
    setTimeout(() => {
      if (this.props.state.showSector) {
        this.props.actions.showSearchSector(true)
        this.props.actions.showSearchStation(false)
        this.props.actions.showSearchRegion(false)
      }
    }, 10)
  }

  handleRemoveSector() {
    this.props.actions.showSector(false)
    this.props.actions.showSearchSector(false)
    this.props.actions.selectedSector('')
    setTimeout(() => {
      this.props.initiateRequests()
    }, 5)
  }

  handleSetSector(value) {
    let ID = value.ID
    let SECTOR = value.SECTOR.toUpperCase()
    this.props.actions.selectedSector({ ID, SECTOR })
    this.props.actions.showSearchSector(false)
    setTimeout(() => {
      this.props.initiateRequests()
    }, 5)
  }

  elementSector() {
    return (
      <Div
        data-tip="Sector"
        css={{
          display: 'inline-block',
        }}
      >
        {!this.props.state.showSearchSector ? (
          <Span
            onClick={this.handleSearchElementSector}
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
              borderRadius: '5px',
              textAlign: 'center',
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
              onClick={this.handleRemoveSector}
              style={{
                margin: '0.49em 0.4em 0em 0.4em',
                textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
              }}
            />
            {this.props.state.selectedSector.SECTOR}
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
              background: this.props.theme.primaryLevelBgColor,
              color: 'red',
              transition: 'all 0.7s',
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
                onClick={this.handleRemoveSector}
                style={{
                  margin: '0.49em 0.4em 0em 0.4em',
                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                }}
              />
              <Input
                autoFocus
                onChange={this.handleSectorChangeShowSuggestions}
                type="text"
                name="SearchSector"
                placeholder="  Buscar Sector"
              />

              <Scrollbars
                style={{
                  display: this.props.state.sectorSuggestions
                    ? 'block'
                    : 'none',
                  width: '14.5em',
                  height: '13em',
                  marginLeft: '1.6em',
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
                {Object.keys(this.props.state.sectors)
                  .sort()
                  .map(key => {
                    if (
                      this.props.state.sectors[
                        key
                      ].SECTOR.toUpperCase().indexOf(
                        this.props.state.sectorInput.toUpperCase()
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
                              background: this.props.theme.primaryLevelBgColor,
                            },
                          }}
                          onClick={() =>
                            this.handleSetSector(this.props.state.sectors[key])
                          }
                        >
                          {this.props.state.sectors[key].SECTOR.toUpperCase()}
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

  handleMoreDetails() {
    if (!this.props.state.showStation) {
      let valuesForStations = {
        IDREGION: this.props.state.selectedRegion.ID,
        IDTECHNOLOGY: this.props.state.selectedService.IDTECHNOLOGY,
        IDGROUP: this.props.state.selectedGroup.ID,
      }
      this.props.actions.stationRequest(valuesForStations)
      this.props.actions.showSearchStation(true)
      this.props.actions.showStation(true)
    } else if (
      this.props.state.showStation === true &&
      this.props.state.showSector === false
    ) {
      let valuesForSectors = {
        IDSTATION: this.props.state.selectedStation.ID,
        IDTECHNOLOGY: this.props.state.selectedService.IDTECHNOLOGY,
        IDGROUP: this.props.state.selectedGroup.ID,
      }
      this.props.actions.sectorRequest(valuesForSectors)
      this.props.actions.showSearchSector(true)
      this.props.actions.showSector(true)
    }
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
      if (this.props.state.showSearchStation) {
        let filterStations = Object.keys(this.props.state.stations)
          .sort()
          .map(key => {
            if (
              this.props.state.stations[key].STATION.toUpperCase().indexOf(
                this.props.state.stationInput.toUpperCase()
              ) > -1
            ) {
              return this.props.state.stations[key]
            } else {
              return undefined
            }
          })
        if (filterStations.sort()[0] === undefined) {
          this.handleSetStation(this.props.state.stations.sort()[0])
        } else {
          this.handleSetStation(filterStations.sort()[0])
        }
        this.props.actions.stationInputChange('')
      }
      if (this.props.state.showSearchSector) {
        let filterSectors = Object.keys(this.props.state.sectors)
          .sort()
          .map(key => {
            if (
              this.props.state.sectors[key].SECTOR.toUpperCase().indexOf(
                this.props.state.sectorInput.toUpperCase()
              ) > -1
            ) {
              return this.props.state.sectors[key]
            } else {
              return undefined
            }
          })
        if (filterSectors.sort()[0] === undefined) {
          this.handleSetSector(this.props.state.sectors.sort()[0])
        } else {
          this.handleSetSector(filterSectors.sort()[0])
        }
        this.props.actions.sectorInputChange('')
      }
    }
    if (event.keyCode === 27 /*esc*/) {
      this.props.actions.showSearchRegion(false)
      this.props.actions.showSearchStation(false)
      this.props.actions.showSearchSector(false)
      this.props.actions.menuSelectorLapse(false)
      this.props.actions.menuSelectorService(false)
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
        {this.timeLapseSelector()}
        {this.elementServices()}
        {this.elementRegion()}
        {this.props.state.showStation ? this.elementStation() : null}
        {this.props.state.showSector ? this.elementSector() : null}

        {Object.keys(this.props.state.regions).length === 1 ||
        this.props.state.showSector ||
        this.props.state.showSearchRegion ||
        this.props.state.showSearchStation ||
        this.props.state.showSearchSector ? null : (
          <FontAwesome
            name="search-plus"
            onClick={this.handleMoreDetails}
            size="lg"
            style={{
              background: this.props.theme.secondaryLevelBgColor,
              margin: '0.49em 0.4em 0em 0.4em',
              textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              position: 'absolute',
              top: '0em'
            }}
          />
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
        menuSelectorService,
        selectedService,
        showRegion,
        showSearchRegion,
        selectedRegion,
        regionSuggestions,
        showStation,
        showSearchStation,
        stationSuggestions,
        selectedStation,
        showSector,
        showSearchSector,
        sectorSuggestions,
        selectedSector,
        modalCalendar,
        setCalendarDateStart,
        setCalendarDateEnd,
        setSelectedTimeLapse,
        regionInputChange,
        stationInputChange,
        sectorInputChange,
        regionRequest,
        stationRequest,
        sectorRequest,
        fillStationsWithResquest,
        fillSectorsWithResquest,
        setStateChartOptions,
      },
      dispatch
    ),
  }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  state: state.statisticsCcrPcr,
  user: state.client.user,
})

const BreadcrumbConnected = connect(mapStateToProps, mapDispatchToProps)(
  withTheme(Breadcrumb)
)

export default BreadcrumbConnected
