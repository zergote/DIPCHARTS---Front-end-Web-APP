import React, { Component } from 'react'
import Highcharts from './components/highcharts/'
import Highstock from './components/highstock/'

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
      <this.importTypeChart
        typeChart={this.props.typeChart}
        config={this.props.config}
        completeFetchData={this.props.completeFetchData}
        theme={this.props.theme}
      />
    )
  }
}

export default Chart
