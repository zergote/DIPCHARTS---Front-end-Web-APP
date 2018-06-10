import React, { Component } from 'react'
import Highcharts from './components/highcharts/'
import Highstock from './components/highstock/'
import Frame from './components/frame/'

class Chart extends Component {
  importTypeChart(props) {
    if (props.typeChart === 'highcharts') {
      return (
        <Highcharts
          config={props.config}
          completeFetchData={props.completeFetchData}
          theme={props.theme}
        />
      )
    } else {
      return (
        <Highstock
          config={props.config}
          completeFetchData={props.completeFetchData}
          theme={props.theme}
        />
      )
    }
  }

  render() {
    return (
      <Frame
        typeChart={this.props.typeChart}
        config={this.props.config}
        completeFetchData={this.props.completeFetchData}
        theme={this.props.theme}
        handleChartOptions={this.props.handleChartOptions}
        initiateRequests={this.props.initiateRequests}
        handleHideMenuStates={this.props.handleHideMenuStates}
      >
        <this.importTypeChart
          typeChart={this.props.typeChart}
          config={this.props.config}
          completeFetchData={this.props.completeFetchData}
          theme={this.props.theme}
        />
      </Frame>
    )
  }
}

export default Chart
