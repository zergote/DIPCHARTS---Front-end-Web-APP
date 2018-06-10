import {
  SET_MODAL_OPEN_STATE,
  SET_PRELOADER_STATE_MORE_ALERT_DETAILS,
  STATISTICS_SUCCESS_MORE_ALERT_DETAILS,
  SET_ALERT_DATA,
  SET_CONFIG_CLEAN_SERIES_MORE_ALERT_DETAILS,
} from './constants'

const initialState = {
  alertData: {
    id: 0,
    element_name: 'MAXPLAZA',
    title: 'Trafico cero payload',
    body: 'La estacion se encuentra sin cursar trafico ',
    start_date: '24122017',
    start_hour: 4,
    end_date: '24122017',
    end_hour: 5,
    kpi: 'PAYLOAD_TOT',
    kpiValue: '0',
    type: 0,
    chartView: true,
    id_service: 2,
    id_region: 5,
  },
  modalIsOpen: false,
  completeFetchData: true,
  theme: 'default',
  config: {
    chart: {
      zoomType: 'x',
      type: 'line',
      height: '29%',
      //margin: [60, 40, 60, 40],
      alignTicks: false,
      events: {
        load: function() {
          //  var
          if (this.series.length > 0) {
            var series = this.series,
              max = series[0].dataMax,
              min = series[0].dataMin

            series.forEach(function(serie) {
              if (serie.dataMax > max) {
                max = serie.dataMax
              }

              if (serie.dataMin < min) {
                min = serie.dataMin
              }
            })

            this.yAxis[0].update({
              min: min,
              max: max,
            })
          }
        },
      },
    },
    rangeSelector: {
      enabled: true,
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
    scrollbar: {
      enabled: false,
    },
    /*legend: {
      enabled: true
    } */
    legend: {
      enabled: true,
      layout: 'horizontal',
      align: 'left',
      verticalAlign: 'top',
      floating: true,
      x: 5,
      y: -2,
      borderColor: '#262626',
      borderRadius: '3',
      borderWidth: '1',
      itemStyle: {
        fontSize: '11px',
      },
    },
    exporting: {
      enabled: true,
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
    yAxis: [
      {
        // Primary yAxis
        gridLineWidth: 1,
        labels: {
          format: '{value}MB',
        },
        title: {
          text: '',
          fontWeight: 'bold',
        },
        opposite: true,
      },
    ],
    series: [
      {
        name: 'KPI',
        data: [],
        yAxis: 0,
        type: 'line',
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  },
  titleDetails: 'DETALLES DEL ALERTA',
}
const reducer = function setStateSidebar(state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_OPEN_STATE:
      return Object.assign({}, state, {
        modalIsOpen: action.value,
      })
    case SET_PRELOADER_STATE_MORE_ALERT_DETAILS:
      return Object.assign({}, state, {
        completeFetchData: action.completeFetchData,
      })
    case STATISTICS_SUCCESS_MORE_ALERT_DETAILS:
      return Object.assign({}, state, {
        config: action.config,
      })
    case SET_ALERT_DATA:
      return Object.assign({}, state, {
        alertData: action.value,
      })
    case SET_CONFIG_CLEAN_SERIES_MORE_ALERT_DETAILS:
      let newConfig = state.config
      newConfig.series = []
      newConfig.yAxis = []
      return {
        ...state,
        config: { ...newConfig },
      }
    default:
      return state
  }
}

export default reducer
