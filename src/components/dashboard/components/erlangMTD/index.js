import React, { Component } from 'react'
import glamorous from 'glamorous'
import Chart from './components/chart'
const { Div } = glamorous

class ErlangMTD extends Component {
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
          ERLANG CONSUMIDOS POR HORA EN ULTIMOS 30 DIAS
        </Div>
        <Chart
          typeChart="highstock"
          theme="default"
          config={this.props.config}
          completeFetchData={this.props.completeFetchData}
        />
      </Div>
    )
  }
}

export default ErlangMTD
