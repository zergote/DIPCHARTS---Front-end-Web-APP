import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
import FontAwesome from 'react-fontawesome'
import ReactHighcharts from 'react-highcharts'
const { Div } = glamorous

class TopErlang extends Component {
  constructor(props) {
    super(props)
    this.renderWinnerStations = this.renderWinnerStations.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.renderChart = this.renderChart.bind(this)
  }

  handleMouseEnter() {
    this.props.setChangeToOtherViewTopErlang(true)
    this.props.setChangeToOtherViewMTDKPI(false)
    this.props.setChangeToOtherViewTopPayload(false)
  }
  handleMouseLeave() {
    this.props.setChangeToOtherViewTopErlang(false)
  }

  renderChart(tconfig) {
    return <ReactHighcharts config={tconfig} />
  }

  renderWinnerStations() {
    return (
      <Div
        css={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Div
          css={{
            display: 'flex',
            flexDirection: 'row',
            margin: '2em 0em 0em 0em',
          }}
        >
          <FontAwesome
            name="star"
            size="lg"
            style={{
              margin: '-.37em 0em 0em 0em',
              paddingLeft: '0.3em',
              color: this.props.theme.fontColorTop,
              textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
              maxWidth: '50%',
            }}
          />
          <Div
            css={{
              margin: '-0.5em 0em 2em 0em',
              paddingLeft: '1.1em',
              fontSize: '12.5px',
              letterSpacing: '0.2em',
              color: this.props.theme.fontColorTop,
            }}
          >
            {this.props.firstStationErlang.name}{' '}
            <Div
              css={{
                display: 'inline',
                textDecoration: 'underline',
                color: this.props.theme.fontColorTop,
              }}
            >
              {this.props.firstStationErlang.value}ERL<FontAwesome
                name="phone"
                size="lg"
                style={{
                  margin: '-.37em .4em 0em .2em',
                  color: this.props.theme.fontColorTop,
                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                  maxWidth: '50%',
                }}
              />
            </Div>
          </Div>
        </Div>
        <Div
          css={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <FontAwesome
            name="star-half-o"
            size="lg"
            style={{
              margin: '-.37em 0em 0em 0em',
              paddingLeft: '0.3em',
              color: this.props.theme.fontColorTop,
              textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
              maxWidth: '50%',
            }}
          />
          <Div
            css={{
              margin: '-0.5em 0em 2em 0em',
              paddingLeft: '1.1em',
              fontSize: '12.5px',
              letterSpacing: '0.1em',
              color: this.props.theme.fontColorTop,
            }}
          >
            {this.props.secondStationErlang.name}{' '}
            <Div
              css={{
                display: 'inline',
                textDecoration: 'underline',
                color: this.props.theme.fontColorTop,
              }}
            >
              {this.props.secondStationErlang.value}ERL<FontAwesome
                name="phone"
                size="lg"
                style={{
                  margin: '-.37em .4em 0em .2em',
                  color: this.props.theme.fontColorTop,
                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                  maxWidth: '50%',
                }}
              />
            </Div>
          </Div>
        </Div>
        <Div
          css={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <FontAwesome
            name="star-o"
            size="lg"
            style={{
              margin: '-.37em 0em 0em 0em',
              paddingLeft: '0.3em',
              color: this.props.theme.fontColorTop,
              textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
              maxWidth: '50%',
            }}
          />
          <Div
            css={{
              margin: '-0.5em 0em 2em 0em',
              paddingLeft: '1.1em',
              fontSize: '12.5px',
              letterSpacing: '0em',
              color: this.props.theme.fontColorTop,
            }}
          >
            {this.props.thirdStationErlang.name}{' '}
            <Div
              css={{
                display: 'inline',
                textDecoration: 'underline',
                color: this.props.theme.fontColorTop,
              }}
            >
              {this.props.thirdStationErlang.value}ERL<FontAwesome
                name="phone"
                size="lg"
                style={{
                  margin: '-.37em .4em 0em .2em',
                  color: this.props.theme.fontColorTop,
                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                  maxWidth: '50%',
                }}
              />
            </Div>
          </Div>
        </Div>
      </Div>
    )
  }

  render() {
    let changeToOtherView = this.props.changeToOtherViewTopErlang
    return (
      <Div onClick={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <Div
          css={{
            margin: '0.5em 0em 0em 0em',
            paddingTop: '0.2em',
            background: this.props.theme.headerTop,
            height: '1.3em',
            textAlign: 'center',
            boxShadow: '0px 1px 9px 1px rgba(0,0,0,0.75)',
            cursor: 'pointer',
            fontSize: '12.5px',
          }}
        >
          TOP ESTACIONES EN ERLANG ULTIMOS 30 DIAS
        </Div>
        {changeToOtherView ? (
          <Div
            css={{
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: this.props.theme.border,
            }}
          >
            {this.renderChart(this.props.configTopErlang)}
          </Div>
        ) : (
          <Div
            css={{
              margin: '0em 0em 0em 0em',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            {this.renderWinnerStations()}
          </Div>
        )}
      </Div>
    )
  }
}

export default withTheme(TopErlang)
