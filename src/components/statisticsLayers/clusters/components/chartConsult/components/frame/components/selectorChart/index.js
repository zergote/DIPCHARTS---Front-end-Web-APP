import React, { Component } from 'react'
import glamorous from 'glamorous'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  setChartOptions,
  setStateChartOptions,
  selectedService,
} from '../../../../../../actions'
const { Div, Button, Input, Select, Label } = glamorous

class SelectorChart extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleAgree = this.handleAgree.bind(this)
    this.handleDisagree = this.handleDisagree.bind(this)
  }

  handleOnChange(event) {
    let value = event.target.value
    let kpis = [
      'ERLANG',
      'PAYLOAD_TOT',
      'CCR',
      'PCR',
      'USERS_HSDPA',
      'USERS_HSUPA',
    ]

    let newSelectorChartOptions = this.props.selectorChartOptions

    if (event.target.dataset.column === '1') {
      if (kpis.includes(value)) {
        if (
          this.props.selectorChartOptions.column1.kpiSelected.includes(value)
        ) {
          newSelectorChartOptions.column1.kpiSelected = this.props.selectorChartOptions.column1.kpiSelected.filter(
            item => item !== value
          )
        } else {
          newSelectorChartOptions.column1.kpiSelected.push(value)
        }
      } else {
        newSelectorChartOptions.column1.typeChartSelected[
          event.target.dataset.index
        ] =
          event.target.value
      }
    } else if (event.target.dataset.column === '2') {
      if (kpis.includes(value)) {
        if (
          this.props.selectorChartOptions.column2.kpiSelected.includes(value)
        ) {
          newSelectorChartOptions.column2.kpiSelected = this.props.selectorChartOptions.column2.kpiSelected.filter(
            item => item !== value
          )
        } else {
          newSelectorChartOptions.column2.kpiSelected.push(value)
        }
      } else {
        newSelectorChartOptions.column2.typeChartSelected[
          event.target.dataset.index
        ] =
          event.target.value
      }
    } else if (event.target.dataset.column === '3') {
      if (kpis.includes(value)) {
        if (
          this.props.selectorChartOptions.column3.kpiSelected.includes(value)
        ) {
          newSelectorChartOptions.column3.kpiSelected = this.props.selectorChartOptions.column3.kpiSelected.filter(
            item => item !== value
          )
        } else {
          newSelectorChartOptions.column3.kpiSelected.push(value)
        }
      } else {
        newSelectorChartOptions.column3.typeChartSelected[
          event.target.dataset.index
        ] =
          event.target.value
      }
    }

    this.props.actions.setChartOptions(newSelectorChartOptions)
    this.forceUpdate()
  }

  handleReset() {
    this.props.actions.selectedService({
      ID: 1,
      SERVICE: '2G',
      IDTECHNOLOGY: 1,
    })
    let originalConfig = {
      kpisForThisChart: [
        'ERLANG',
        'PAYLOAD_TOT',
        'CCR',
        'PCR',
        'USERS_HSDPA',
        'USERS_HSUPA',
      ],
      optionsTypeChart: ['line', 'column', 'area', 'spline', 'areaspline'],

      column1: {
        service: { ID: 1, SERVICE: '2G', IDTECHNOLOGY: 1 },
        kpiSelected: ['ERLANG', 'PAYLOAD_TOT'],
        typeChartSelected: ['line', 'line'],
      },

      column2: {
        service: { ID: 3, SERVICE: '3G', IDTECHNOLOGY: 2 },
        kpiSelected: ['ERLANG', 'PAYLOAD_TOT'],
        typeChartSelected: ['line', 'line'],
      },

      column3: {
        service: { ID: 5, SERVICE: '4G', IDTECHNOLOGY: 3 },
        kpiSelected: ['PAYLOAD_TOT'],
        typeChartSelected: ['line', 'line'],
      },
    }
    this.props.actions.setChartOptions(originalConfig)
    this.forceUpdate()
  }

  handleAgree() {
    this.props.actions.setStateChartOptions(false)
    this.props.initiateRequests()
  }
  handleDisagree() {
    this.props.actions.setStateChartOptions(false)
  }
  render() {
    let translateKpisName2G = {
      CCR: 'CCR',
      PCR: 'PCR',
      ERLANG: 'ERLANG',
      PAYLOAD_TOT: 'PAYLOAD',
    }
    let translateKpisName3G = {
      CCR: 'CCR',
      PCR: 'PCR',
      ERLANG: 'ERLANG',
      PAYLOAD_TOT: 'PAYLOAD',
      USERS_HSDPA: 'USUARIOS HSDP',
      USERS_HSUPA: 'USUARIOS HSUPA',
    }

    let translateKpisName4G = {
      PCR: 'PCR',
      PAYLOAD_TOT: 'PAYLOAD',
      USERS_HSDPA: 'USUARIOS DL',
      USERS_HSUPA: 'USUARIOS UL',
    }

    return (
      <Div
        css={{
          display: this.props.stateChartOptions ? 'visible' : 'none',
          backgroundColor: 'white',
          boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
          borderStyle: 'solid ',
          borderWidth: '1px',
          borderColor: '#414141',
          position: 'absolute',
          borderRadius: '5px',
          top: '7em',
          zIndex: 1,
        }}
      >
        <Div
          css={{
            display: 'flex',
            padding: '1em',
          }}
        >
          {/* KPIS ADICIONALES PARA LA OTRA TECNLOGIA PARA COLUMNA 1*/}

          <Div
            css={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0em 1.2em 0em 0em',
            }}
          >
            <Div
              css={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#171717',
                textDecoration: 'underline',
              }}
            >
              KPI {this.props.selectorChartOptions.column1.service.SERVICE}
            </Div>
            {this.props.selectorChartOptions.kpisForThisChart.map(
              (kpiItem, i) => {
                return (
                  <Label
                    css={{
                      display:
                        this.props.selectorChartOptions.column1.service
                          .SERVICE === '2G' &&
                        (kpiItem === 'USERS_HSDPA' || kpiItem === 'USERS_HSUPA')
                          ? 'none'
                          : 'block',
                      fontSize: '12px',
                      color: '#171717',
                    }}
                    key={i}
                  >
                    <Input
                      type="checkbox"
                      value={kpiItem}
                      data-column="1"
                      data-index={i}
                      checked={this.props.selectorChartOptions.column1.kpiSelected.includes(
                        kpiItem
                      )}
                      onChange={this.handleOnChange}
                    />
                    {translateKpisName2G[kpiItem]}
                  </Label>
                )
              }
            )}
          </Div>

          <Div
            css={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0em 0em 0em 1.2em',
            }}
          >
            <Div
              css={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#171717',
                textDecoration: 'underline',
              }}
            >
              TIPO DE GRAFICA
            </Div>
            {this.props.selectorChartOptions.kpisForThisChart.map(
              (kpiItem, i) => {
                return (
                  <Select
                    css={{
                      display:
                        this.props.selectorChartOptions.column1.service
                          .SERVICE === '2G' &&
                        (kpiItem === 'USERS_HSDPA' || kpiItem === 'USERS_HSUPA')
                          ? 'none'
                          : 'block',
                      fontSize: '12px',
                    }}
                    key={i}
                    value={
                      this.props.selectorChartOptions.column1.typeChartSelected[
                        i
                      ]
                    }
                    data-column="1"
                    data-index={i}
                    onChange={this.handleOnChange}
                    disabled={
                      !this.props.selectorChartOptions.column1.kpiSelected.includes(
                        kpiItem
                      )
                    }
                  >
                    {this.props.selectorChartOptions.optionsTypeChart.map(
                      (typeChartItem, index) => {
                        return (
                          <option key={index} value={typeChartItem}>
                            {typeChartItem.toUpperCase()}
                          </option>
                        )
                      }
                    )}>
                  </Select>
                )
              }
            )}
          </Div>

          {/* SEPARADOR PARA COLUMNA 2*/}

          <Div
            css={{
              display:
                Object.keys(this.props.services).length > 1 &&
                !this.props.showStation
                  ? 'block'
                  : 'none',
              margin: '0em 0em 0em 1em',
              width: '0.1em',
              height: '2.5em',
              background: '#333534',
            }}
          />

          {/* KPIS ADICIONALES PARA LA OTRA TECNLOGIA PARA COLUMNA 2*/}

          <Div
            css={{
              display:
                Object.keys(this.props.services).length > 1 &&
                !this.props.showStation
                  ? 'flex'
                  : 'none',
              flexDirection: 'column',
              padding: '0em 1.2em 0em 1em',
            }}
          >
            <Div
              css={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#171717',
                textDecoration: 'underline',
              }}
            >
              KPI {this.props.selectorChartOptions.column2.service.SERVICE}
            </Div>
            {this.props.selectorChartOptions.kpisForThisChart.map(
              (kpiItem, i) => {
                return (
                  <Label
                    css={{
                      display: 'block',
                      fontSize: '12px',
                      color: '#171717',
                    }}
                    key={i}
                  >
                    <Input
                      type="checkbox"
                      value={kpiItem}
                      data-column="2"
                      data-index={i}
                      checked={this.props.selectorChartOptions.column2.kpiSelected.includes(
                        kpiItem
                      )}
                      onChange={this.handleOnChange}
                    />
                    {translateKpisName3G[kpiItem]}
                  </Label>
                )
              }
            )}
          </Div>

          <Div
            css={{
              display:
                Object.keys(this.props.services).length > 1 &&
                !this.props.showStation
                  ? 'flex'
                  : 'none',
              flexDirection: 'column',
              padding: '0em 0em 0em 1em',
            }}
          >
            <Div
              css={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#171717',
                textDecoration: 'underline',
              }}
            >
              TIPO DE GRAFICA
            </Div>
            {this.props.selectorChartOptions.kpisForThisChart.map(
              (kpiItem, i) => {
                return (
                  <Select
                    css={{
                      display: 'block',
                      fontSize: '12px',
                    }}
                    key={i}
                    value={
                      this.props.selectorChartOptions.column2.typeChartSelected[
                        i
                      ]
                    }
                    data-column="2"
                    data-index={i}
                    disabled={
                      !this.props.selectorChartOptions.column2.kpiSelected.includes(
                        kpiItem
                      )
                    }
                    onChange={this.handleOnChange}
                  >
                    {this.props.selectorChartOptions.optionsTypeChart.map(
                      (typeChartItem, index) => {
                        return (
                          <option key={index} value={typeChartItem}>
                            {typeChartItem.toUpperCase()}
                          </option>
                        )
                      }
                    )}>
                  </Select>
                )
              }
            )}
          </Div>

          {/* SEPARADOR PARA COLUMNA 3*/}

          <Div
            css={{
              display:
                Object.keys(this.props.services).length > 2 &&
                !this.props.showStation
                  ? 'block'
                  : 'none',
              margin: '0em 0em 0em 1em',
              width: '0.1em',
              height: '2.5em',
              background: '#333534',
            }}
          />

          {/* KPIS ADICIONALES PARA LA OTRA TECNLOGIA PARA COLUMNA 3*/}

          <Div
            css={{
              display:
                Object.keys(this.props.services).length > 2 &&
                !this.props.showStation
                  ? 'flex'
                  : 'none',
              flexDirection: 'column',
              padding: '0em 1.2em 0em 1em',
            }}
          >
            <Div
              css={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#171717',
                textDecoration: 'underline',
              }}
            >
              KPI {this.props.selectorChartOptions.column3.service.SERVICE}
            </Div>
            {this.props.selectorChartOptions.kpisForThisChart.map(
              (kpiItem, i) => {
                return (
                  <Label
                    css={{
                      display:
                        this.props.selectorChartOptions.column3.service
                          .SERVICE === '4G' &&
                        (kpiItem === 'CCR' || kpiItem === 'ERLANG')
                          ? 'none'
                          : 'block',
                      fontSize: '12px',
                      color: '#171717',
                    }}
                    key={i}
                  >
                    <Input
                      type="checkbox"
                      value={kpiItem}
                      data-column="3"
                      data-index={i}
                      checked={this.props.selectorChartOptions.column3.kpiSelected.includes(
                        kpiItem
                      )}
                      onChange={this.handleOnChange}
                    />
                    {translateKpisName4G[kpiItem]}
                  </Label>
                )
              }
            )}
          </Div>

          <Div
            css={{
              display:
                Object.keys(this.props.services).length > 2 &&
                !this.props.showStation
                  ? 'flex'
                  : 'none',
              flexDirection: 'column',
              padding: '0em 0em 0em 1em',
            }}
          >
            <Div
              css={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#171717',
                textDecoration: 'underline',
              }}
            >
              TIPO DE GRAFICA
            </Div>
            {this.props.selectorChartOptions.kpisForThisChart.map(
              (kpiItem, i) => {
                return (
                  <Select
                    css={{
                      display:
                        this.props.selectorChartOptions.column3.service
                          .SERVICE === '4G' &&
                        (kpiItem === 'CCR' || kpiItem === 'ERLANG')
                          ? 'none'
                          : 'block',
                      fontSize: '12px',
                    }}
                    key={i}
                    value={
                      this.props.selectorChartOptions.column3.typeChartSelected[
                        i
                      ]
                    }
                    data-column="3"
                    data-index={i}
                    disabled={
                      !this.props.selectorChartOptions.column3.kpiSelected.includes(
                        kpiItem
                      )
                    }
                    onChange={this.handleOnChange}
                  >
                    {this.props.selectorChartOptions.optionsTypeChart.map(
                      (typeChartItem, index) => {
                        return (
                          <option key={index} value={typeChartItem}>
                            {typeChartItem.toUpperCase()}
                          </option>
                        )
                      }
                    )}>
                  </Select>
                )
              }
            )}
          </Div>
        </Div>

        <Div
          css={{
            display: 'flex',
            background: '#333333',
            justifyContent: 'flex-end',
            width: 'auto',
          }}
        >
          <Div
            css={{
              display: 'flex',
              background: '#333333',
              justifyContent: 'flex-end',
              width: 'auto',
            }}
          >
            <Button
              css={{
                position: 'relative',
                verticalAlign: 'top',
                minWidth: '8em',
                height: '2em',
                paddingLeft: '1em',
                paddingRight: '1em',
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#CCCCCC',
                textAlign: 'center',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
                background: ' #333333',
                border: 0,
                cursor: 'pointer',
                ':hover': {
                  backgroundColor: '#395182',
                },
              }}
              onClick={this.handleReset}
            >
              REESTABLECER
            </Button>
            <Button
              css={{
                position: 'relative',
                verticalAlign: 'top',
                minWidth: '8em',
                height: '2em',
                paddingLeft: '1em',
                paddingRight: '1em',
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#CCCCCC',
                textAlign: 'center',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
                background: '#333333',
                border: 0,
                cursor: 'pointer',
                ':hover': {
                  backgroundColor: '#395182',
                },
              }}
              onClick={this.handleAgree}
            >
              ACEPTAR
            </Button>
            <Button
              css={{
                position: 'relative',
                verticalAlign: 'top',
                minWidth: '8em',
                height: '2em',
                paddingLeft: '1em',
                paddingRight: '1em',
                marginRight: '1em',
                fontSize: '11px',
                fontWeight: 'bold',
                color: '#CCCCCC',
                textAlign: 'center',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
                background: '#262626',
                border: 0,
                cursor: 'pointer',
                ':hover': {
                  backgroundColor: '#395182',
                },
              }}
              onClick={this.handleDisagree}
            >
              CERRAR
            </Button>
          </Div>
        </Div>
      </Div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setChartOptions,
        setStateChartOptions,
        selectedService,
      },
      dispatch
    ),
  }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  selectorChartOptions: state.statisticsClusters.selectorChartOptions,
  stateChartOptions: state.statisticsClusters.stateChartOptions,
  selectedService: state.statisticsClusters.selectedService,
  services: state.statisticsClusters.services,
  showStation: state.statisticsClusters.showStation,
})

const SelectorChartConnected = connect(mapStateToProps, mapDispatchToProps)(
  SelectorChart
)

export default SelectorChartConnected
