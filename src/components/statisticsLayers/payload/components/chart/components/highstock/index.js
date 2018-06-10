import React, { Component } from 'react'
import ReactHighstock from 'react-highcharts/ReactHighstock.src'
import { RotaingPlaneLoading } from 'styled-spinkit'
import HighchartsExporting from 'highcharts/modules/exporting'
//import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsDataExporting from 'highcharts/modules/export-data'
//import Accessibility from 'highcharts/modules/accessibility'
import highchartsNoDataToDisplay from 'highcharts/modules/no-data-to-display'
import HighchartsOffilineExporting from 'highcharts/modules/offline-exporting'
import glamorous from 'glamorous'
require('highcharts/modules/boost')(ReactHighstock.Highcharts)

const { Div } = glamorous

class Highstock extends Component {
  renderingToGraph(props) {
    //Proporciona mas tipos de graficas
    //HighchartsMore(ReactHighstock.Highcharts)

    //Boton de exportacion
    HighchartsExporting(ReactHighstock.Highcharts)

    //Exporta las graficas sin conectarse al servidor de highcharts
    HighchartsOffilineExporting(ReactHighstock.Highcharts)

    //Agrega separador antes de agregar los items para la exportacion de los datos en csv y xls
    ReactHighstock.Highcharts.getOptions(
      ReactHighstock.Highcharts
    ).exporting.buttons.contextButton.menuItems.push({
      separator: true,
    })

    HighchartsDataExporting(ReactHighstock.Highcharts)

    //Agrega utilidad para permitir que se puedan ver las graficas desde navegadores de internet de versiones antiguas
    //Accessibility(ReactHighstock.Highcharts)

    //Muestra noticia indicando si no hay datos que mostrar
    highchartsNoDataToDisplay(ReactHighstock.Highcharts)

    //Elimina el primer item del menu de exportacion "Print chart"
    ReactHighstock.Highcharts.getOptions(
      ReactHighstock.Highcharts
    ).exporting.buttons.contextButton.menuItems.shift()

    //Elimina el separador inicial del menu de exportacion
    ReactHighstock.Highcharts.getOptions(
      ReactHighstock.Highcharts
    ).exporting.buttons.contextButton.menuItems.shift()

    //Elimina el ultimo item del menu de exportacion "View table"
    ReactHighstock.Highcharts.getOptions(
      ReactHighstock.Highcharts
    ).exporting.buttons.contextButton.menuItems.pop()

    //Modificar idioma de grafica
    ReactHighstock.Highcharts.setOptions({
      lang: {
        months: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        shortMonths: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic',
        ],

        weekdays: [
          'Domingo',
          'Lunes',
          'Martes',
          'Miercoles',
          'Jueves',
          'Viernes',
          'Sabado',
        ],
        resetZoom: 'Reestablecer zoom',
        resetZoomTitle: 'Reestablece nivel del zoom 1:1',
        rangeSelectorFrom: 'Desde',
        rangeSelectorTo: 'Hasta',
        printChart: 'Imprimir gráfica',
        loading: 'Cargando...',
        noData: 'No hay datos que mostrar',
        downloadSVG: 'Descargar SVG',
        downloadPDF: 'Descargar PDF',
        downloadPNG: 'Descargar PNG',
        downloadJPEG: 'Descargar JPEG',
        downloadCSV: 'Descargar CSV',
        downloadXLS: 'Descargar XLS',
      },
    })
    //Modificar opciones del menu de exportacion

    // ReactHighstock.Highcharts.getOptions().exporting.buttons.contextButton.menuItems.push({
    //   text: 'My new button',
    //   onclick: function () {
    //     alert('OK');
    //   }
    // });
    //Select theme for chart
    switch (props.theme) {
      case 'default':
        // Clear for default theme
        //ReactHighstock.theme = {};

        break
      case 'dark-unica':
        // Load the fonts
        ReactHighstock.Highcharts.createElement(
          'link',
          {
            href: 'https://fonts.googleapis.com/css?family=Unica+One',
            rel: 'stylesheet',
            type: 'text/css',
          },
          null,
          document.getElementsByTagName('head')[0]
        )

        ReactHighstock.theme = {
          colors: [
            '#2b908f',
            '#90ee7e',
            '#f45b5b',
            '#7798BF',
            '#aaeeee',
            '#ff0066',
            '#eeaaee',
            '#55BF3B',
            '#DF5353',
            '#7798BF',
            '#aaeeee',
          ],
          chart: {
            backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
              stops: [[0, '#2a2a2b'], [1, '#3e3e40']],
            },
            style: {
              fontFamily: "'Unica One', sans-serif",
            },
            plotBorderColor: '#606063',
          },
          title: {
            style: {
              color: '#E0E0E3',
              textTransform: 'uppercase',
              fontSize: '20px',
            },
          },
          subtitle: {
            style: {
              color: '#E0E0E3',
              textTransform: 'uppercase',
            },
          },
          xAxis: {
            gridLineColor: '#707073',
            labels: {
              style: {
                color: '#E0E0E3',
              },
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
              style: {
                color: '#A0A0A3',
              },
            },
          },
          yAxis: {
            gridLineColor: '#707073',
            labels: {
              style: {
                color: '#E0E0E3',
              },
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
              style: {
                color: '#A0A0A3',
              },
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
              color: '#F0F0F0',
            },
          },
          plotOptions: {
            series: {
              dataLabels: {
                color: '#B0B0B3',
              },
              marker: {
                lineColor: '#333',
              },
            },
            boxplot: {
              fillColor: '#505053',
            },
            candlestick: {
              lineColor: 'white',
            },
            errorbar: {
              color: 'white',
            },
          },
          legend: {
            itemStyle: {
              color: '#E0E0E3',
            },
            itemHoverStyle: {
              color: '#FFF',
            },
            itemHiddenStyle: {
              color: '#606063',
            },
          },
          credits: {
            style: {
              color: '#666',
            },
          },
          labels: {
            style: {
              color: '#707073',
            },
          },

          drilldown: {
            activeAxisLabelStyle: {
              color: '#F0F0F3',
            },
            activeDataLabelStyle: {
              color: '#F0F0F3',
            },
          },

          navigation: {
            buttonOptions: {
              symbolStroke: '#DDDDDD',
              theme: {
                fill: '#505053',
              },
            },
          },

          // scroll charts
          rangeSelector: {
            buttonTheme: {
              fill: '#505053',
              stroke: '#000000',
              style: {
                color: '#CCC',
              },
              states: {
                hover: {
                  fill: '#707073',
                  stroke: '#000000',
                  style: {
                    color: 'white',
                  },
                },
                select: {
                  fill: '#000003',
                  stroke: '#000000',
                  style: {
                    color: 'white',
                  },
                },
              },
            },
            inputBoxBorderColor: '#505053',
            inputStyle: {
              backgroundColor: '#333',
              color: 'silver',
            },
            labelStyle: {
              color: 'silver',
            },
          },

          navigator: {
            handles: {
              backgroundColor: '#666',
              borderColor: '#AAA',
            },
            outlineColor: '#CCC',
            maskFill: 'rgba(255,255,255,0.1)',
            series: {
              color: '#7798BF',
              lineColor: '#A6C7ED',
            },
            xAxis: {
              gridLineColor: '#505053',
            },
          },

          scrollbar: {
            barBackgroundColor: '#808083',
            barBorderColor: '#808083',
            buttonArrowColor: '#CCC',
            buttonBackgroundColor: '#606063',
            buttonBorderColor: '#606063',
            rifleColor: '#FFF',
            trackBackgroundColor: '#404043',
            trackBorderColor: '#404043',
          },

          // special colors for some of the
          legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
          background2: '#505053',
          dataLabelsColor: '#B0B0B3',
          textColor: '#C0C0C0',
          contrastTextColor: '#F0F0F3',
          maskColor: 'rgba(255,255,255,0.3)',
        }
        break

      case 'grid-light':
        // Load the fonts
        ReactHighstock.Highcharts.createElement(
          'link',
          {
            href: 'https://fonts.googleapis.com/css?family=Dosis:400,600',
            rel: 'stylesheet',
            type: 'text/css',
          },
          null,
          document.getElementsByTagName('head')[0]
        )

        ReactHighstock.theme = {
          colors: [
            '#7cb5ec',
            '#f7a35c',
            '#90ee7e',
            '#7798BF',
            '#aaeeee',
            '#ff0066',
            '#eeaaee',
            '#55BF3B',
            '#DF5353',
            '#7798BF',
            '#aaeeee',
          ],
          chart: {
            backgroundColor: null,
            style: {
              fontFamily: 'Dosis, sans-serif',
            },
          },
          title: {
            style: {
              fontSize: '16px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            },
          },
          tooltip: {
            borderWidth: 0,
            backgroundColor: 'rgba(219,219,216,0.8)',
            shadow: false,
          },
          legend: {
            itemStyle: {
              fontWeight: 'bold',
              fontSize: '13px',
            },
          },
          xAxis: {
            gridLineWidth: 1,
            labels: {
              style: {
                fontSize: '12px',
              },
            },
          },
          yAxis: {
            minorTickInterval: 'auto',
            title: {
              style: {
                textTransform: 'uppercase',
              },
            },
            labels: {
              style: {
                fontSize: '12px',
              },
            },
          },
          plotOptions: {
            candlestick: {
              lineColor: '#404048',
            },
          },

          // General
          background2: '#F0F0EA',
        }

        //Applign theme to chart
        ReactHighstock.Highcharts.setOptions(ReactHighstock.theme)
        break
      case 'sand-signika':
        // Load the fonts
        ReactHighstock.Highcharts.createElement(
          'link',
          {
            href: 'https://fonts.googleapis.com/css?family=Signika:400,700',
            rel: 'stylesheet',
            type: 'text/css',
          },
          null,
          document.getElementsByTagName('head')[0]
        )

        // Add the background image to the container
        ReactHighstock.Highcharts.wrap(
          ReactHighstock.Highcharts.Chart.prototype,
          'getContainer',
          function(proceed) {
            proceed.call(this)
            this.container.style.background = 'url(images/sand.png)'
          }
        )

        ReactHighstock.theme = {
          colors: [
            '#f45b5b',
            '#8085e9',
            '#8d4654',
            '#7798BF',
            '#aaeeee',
            '#ff0066',
            '#eeaaee',
            '#55BF3B',
            '#DF5353',
            '#7798BF',
            '#aaeeee',
          ],
          chart: {
            backgroundColor: null,
            style: {
              fontFamily: 'Signika, serif',
            },
          },
          title: {
            style: {
              color: 'black',
              fontSize: '16px',
              fontWeight: 'bold',
            },
          },
          subtitle: {
            style: {
              color: 'black',
            },
          },
          tooltip: {
            borderWidth: 0,
          },
          legend: {
            itemStyle: {
              fontWeight: 'bold',
              fontSize: '13px',
            },
          },
          xAxis: {
            labels: {
              style: {
                color: '#6e6e70',
              },
            },
          },
          yAxis: {
            labels: {
              style: {
                color: '#6e6e70',
              },
            },
          },
          plotOptions: {
            series: {
              shadow: true,
            },
            candlestick: {
              lineColor: '#404048',
            },
            map: {
              shadow: false,
            },
          },

          // Highstock specific
          navigator: {
            xAxis: {
              gridLineColor: '#D0D0D8',
            },
          },
          rangeSelector: {
            buttonTheme: {
              fill: 'white',
              stroke: '#C0C0C8',
              'stroke-width': 1,
              states: {
                select: {
                  fill: '#D0D0D8',
                },
              },
            },
          },
          scrollbar: {
            trackBorderColor: '#C0C0C8',
          },

          // General
          background2: '#E0E0E8',
        }
        break
      default:
        break
    }

    //Applign theme to chart
    ReactHighstock.Highcharts.setOptions(ReactHighstock.theme)

    //Check the load data and setup config with data
    if (props.completeFetchData === true) {
      return (
        <div>
          <ReactHighstock config={props.config} />
        </div>
      )
    } else {
      return (
        <Div
          css={{
            height: '100%',
            padding: 0,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Div
            css={{
              marginTop: '2em',
              marginBottom: '4em',
            }}
          >
            <RotaingPlaneLoading color="#ED164F" size="55" />
          </Div>
        </Div>
      )
    }
  }

  render() {
    return (
      <this.renderingToGraph
        config={this.props.config}
        completeFetchData={this.props.completeFetchData}
        theme={this.props.theme}
      />
    )
  }
}

export default Highstock
