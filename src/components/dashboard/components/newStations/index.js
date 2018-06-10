import React, { Component } from 'react'
import glamorous from 'glamorous'
import FontAwesome from 'react-fontawesome'
import ReactHighcharts from 'react-highcharts'
const { Div, A } = glamorous

class NewStations extends Component {
  constructor(props) {
    super(props)
    this.renderLastStation = this.renderLastStation.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.renderChart = this.renderChart.bind(this)
  }

  handleMouseEnter() {
    this.props.setChangeToOtherViewNewStations(true)
  }
  handleMouseLeave() {
    this.props.setChangeToOtherViewNewStations(false)
  }

  renderChart(tconfig) {
    return <ReactHighcharts config={tconfig} />
  }

  renderLastStation() {
    return (
      <Div
        css={{
          display: 'flex',
          flexDirection: 'row',
          margin: '3.5em 0em 0em 0em',
        }}
      >
        <FontAwesome
          name="cube"
          size="4x"
          style={{
            margin: '-.37em 0em 0em 0em',
            paddingLeft: '0.3em',
            color: '#262626',
            textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
            maxWidth: '50%',
          }}
        />
        <Div
          css={{
            margin: '.3em 0em 2em 0em',
            paddingLeft: '0.9em',
            fontSize: '13px',
          }}
        >
          Estacion Molorca!
        </Div>
      </Div>
    )
  }

  render() {
    let changeToOtherView = this.props.changeToOtherViewNewStations
    let tconfig = {
      chart: {
        type: 'bar',
        zoomType: 'x',
        height: 300,
      },
      rangeSelector: {
        buttonTheme: {
          width: 63,
        },
        buttons: [
          {
            type: 'day',
            count: 1,
            text: 'Día',
          },
          {
            type: 'week',
            count: 1,
            text: 'Semana',
          },
          {
            type: 'month',
            count: 1,
            text: 'Mes',
          },
          {
            type: 'all',
            text: 'Todo',
          },
        ],
        selected: 1, // all
      },
      legend: {
        enabled: true,
      },
      scrollbar: {
        enabled: false,
      },
      /*legend: {
          enabled:true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor: ('#FFFFFF'),
          shadow: true
        },*/
      exporting: {
        sourceWidth: 1200,
        sourceHeight: 400,
        scale: 4,
        chartOptions: {
          //subtitle: null
        },
        csv: {
          dateFormat: '%d/%m/%Y %H:%M',
        },
        xls: {
          dateFormat: '%d/%m/%Y %H:%M',
        },
        //Quita el boton de exportación
        /* buttons: {
             contextButton: {
               enabled: false
             }
           }*/
      },
      noData: {
        style: {
          fontSize: '1.5em',
        },
      },
      navigator: {
        enabled: true,
        series: {
          includeInCSVExport: false,
        },
      },
      credits: {
        enabled: false,
        text: 'Corporación Digitel, C.A.',
        /* eslint-disable */
        href: 'javascript:window.open("http://www.digitel.com.ve/", "_blank")',
        /* eslint-enable */
      },
      title: {
        text: null,
      },
      subtitle: {
        text: 'Tráfico Respecto Al Mes Anterior',
      },
      yAxis: [
        {
          // Primary yAxis
          min: 0,
          labels: {
            overflow: 'justify',
          },
          gridLineWidth: 1,
          labels: {
            format: '{value}',
          },
          title: {
            text: '',
            fontWeight: 'bold',
            align: 'high',
          },
          opposite: true,
        },
      ],
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: 'Payload',
          data: [
            this.props.payloadMesAnteriorMTD,
            this.props.payloadMesActualMTD,
          ],
          yAxis: 0,
          tooltip: {
            valueDecimals: 2,
          },
        },
        {
          name: 'Erlang',
          data: [
            this.props.erlangMesAnteriorMTD,
            this.props.erlangMesActualMTD,
          ],
          yAxis: 0,
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
    }

    return (
      <Div
        onClick={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        css={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          color: '#1E1F23',
          backgroundImage:
            'linear-gradient(to right, #25B0A9 50%, #FEE603 50%)',
          backgroundPosition: 0,
          backgroundSize: '200%',
          transition: 'all 0.4s',
          zIndex: -1,
          ':hover': {
            backgroundPosition: '-100%',
          },
        }}
      >
        <Div
          css={{
            margin: '0.5em 0em 0em 0em',
            background: 'peru',
            height: '1.3em',
            textAlign: 'center',
            boxShadow: '0px 1px 9px 1px rgba(0,0,0,0.75)',
            cursor: 'pointer',
          }}
        >
          NUEVAS ESTACIONES
        </Div>
        {changeToOtherView ? (
          <Div
            css={{
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: '#282B2A',
            }}
          >
            {this.renderChart(tconfig)}
          </Div>
        ) : (
          <Div
            css={{
              margin: '-0.5em 0em 0em 0em',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Div />
            {this.renderLastStation()}
          </Div>
        )}
      </Div>
    )
  }
}

export default NewStations
