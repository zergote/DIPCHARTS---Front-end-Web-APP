import React, { Component } from 'react'
import glamorous from 'glamorous'
import Chart from './components/chart'
const { Div } = glamorous

class ErlangLastByMonth extends Component {
  render() {
    return (
      <Div>
        <Div
          css={{
            textAlign: 'center',
            marginTop: '.2em',
            marginBottom: '.1em',
            fontSize: '13px',
          }}
        >
          ERLANG CONSUMIDO POR MES EN ULTIMOS 12 MESES
        </Div>
        <Chart
          typeChart="highcharts"
          theme="default"
          config={this.props.config}
          completeFetchData={this.props.completeFetchData}
        />
      </Div>
    )
  }
}

export default ErlangLastByMonth
