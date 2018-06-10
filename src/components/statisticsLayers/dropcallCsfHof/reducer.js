import {
  SET_STATE_CHART_OPTIONS_DROPCALLCSFHOF,
  SET_PRELOADER_STATE_DROPCALLCSFHOF,
  //Breadcrumb constants
  MENU_SELECTOR_LAPSE_DROPCALLCSFHOF,
  MENU_SELECTOR_SERVICE_DROPCALLCSFHOF,
  SELECTED_SERVICE_DROPCALLCSFHOF,
  MODAL_CALENDAR_DROPCALLCSFHOF,
  SET_CALENDAR_DATE_START_DROPCALLCSFHOF,
  SET_CALENDAR_DATE_END_DROPCALLCSFHOF,
  SET_SELECTED_TIME_LAPSE_DROPCALLCSFHOF,
  SHOW_CLUSTER_DROPCALLCSFHOF,
  SEARCH_CLUSTER_DROPCALLCSFHOF,
  CLUSTER_SUGGESTIONS_DROPCALLCSFHOF,
  SELECTED_CLUSTER_DROPCALLCSFHOF,
  SHOW_REGION_DROPCALLCSFHOF,
  SEARCH_REGION_DROPCALLCSFHOF,
  REGION_SUGGESTIONS_DROPCALLCSFHOF,
  SELECTED_REGION_DROPCALLCSFHOF,
  REGION_INPUT_CHANGE_DROPCALLCSFHOF,
  CLUSTER_INPUT_CHANGE_DROPCALLCSFHOF,
  SERVICE_SUCCESS_DROPCALLCSFHOF,
  REGION_SUCCESS_DROPCALLCSFHOF,
  CLUSTER_SUCCESS_DROPCALLCSFHOF,
  STATISTICS_SUCCESS_DROPCALLCSFHOF,
  SET_CONFIG_CLEAN_SERIES_DROPCALLCSFHOF,
  SET_CHART_OPTIONS_DROPCALLCSFHOF,
  SELECTED_GROUP_DROPCALLCSFHOF,
  SET_STATE_GROUP_MENU_DROPCALLCSFHOF,
} from './constants'
import moment from 'moment'

const initialState = {
  completeFetchData: true,
  stateChartOptions: false,
  theme: 'default',
  config: {
    chart: {
      type: 'line',
      zoomType: 'xy',
      alignTicks: false,
      events: {
        load: function() {
          //  var
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
        },
      },
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
          type: 'month',
          count: 3,
          text: 'Trimestre',
        },
        {
          type: 'year',
          count: 1,
          text: 'Año',
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
      series: {
        includeInCSVExport: false,
      },
    },
    credits: {
      enabled: true,
      text: 'Corporación Digitel, C.A.',
      /* eslint-disable */
      href: 'javascript:window.open("http://www.digitel.com.ve/", "_blank")',
      /* eslint-enable */
    },
    title: {
      text: 'GRAFICA',
      fontWeight: 'bold',
    },
    yAxis: [
      {
        // Primary yAxis
        gridLineWidth: 1,
        labels: {
          format: '{value}',
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
        name: 'DROPCALL',
        data: [],
        yAxis: 0,
        type: 'line',
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  },

  //Breadcrumb state
  timeLapses: {
    day: {
      label: 'HOY',
      since: moment().format('YYYYMMDD'),
      until: moment().format('YYYYMMDD'),
    },
    week: {
      label: 'ULTIMA SEMANA',
      since: moment()
        .subtract(6, 'd')
        .format('YYYYMMDD'),
      until: moment().format('YYYYMMDD'),
    },
    month: {
      label: 'ULTIMO MES',
      since: moment()
        .subtract(1, 'months')
        .format('YYYYMMDD'),
      until: moment().format('YYYYMMDD'),
    },
    quarterly: {
      label: 'UlTIMO TRIMESTRE',
      since: moment()
        .subtract(3, 'months')
        .format('YYYYMMDD'),
      until: moment().format('YYYYMMDD'),
    },
    custom: {
      label: 'PERSONALIZADO',
      since: moment().format('YYYYMMDD'),
      until: moment().format('YYYYMMDD'),
    },
  },

  services: {
    service2gVoz: { ID: 1, SERVICE: '2G', IDTECHNOLOGY: 1 },
    service3gVoz: { ID: 3, SERVICE: '3G', IDTECHNOLOGY: 2 },
  },

  regions: { sinconexion: { ID: null, REGION: 'CARGANDO...' } },

  clusters: { sinconexion: { ID: null, CLUST: 'CARGANDO...' } },

  selectedTimeLapse: {
    label: moment().format('DD/MM/YY'),
    since: moment().format('YYYYMMDD'),
    until: moment().format('YYYYMMDD'),
  },

  selectedService: { ID: 1, SERVICE: '2G', IDTECHNOLOGY: 1 },
  openModalCalendar: false,

  dropMenuShowSelectorLapse: false,
  dropMenuShowSelectorService: false,

  showRegion: true,
  showCluster: false,

  selectedRegion: { ID: null, REGION: 'REGIONES...' },
  regionSuggestions: true,
  showSearchRegion: false,

  selectedCluster: { ID: null, CLUST: 'CLUSTERS...' },
  clusterSuggestions: true,
  showSearchCluster: false,

  regionInput: '',
  clusterInput: '',

  selectorChartOptions: {
    kpisForThisChart: ['DROP_CALLS', 'CSF', 'HOF'],
    optionsTypeChart: ['line', 'column', 'area', 'spline', 'areaspline'],

    column1: {
      service: { ID: 1, SERVICE: '2G', IDTECHNOLOGY: 1 },
      kpiSelected: ['DROP_CALLS'],
      typeChartSelected: ['line', 'line'],
    },

    column2: {
      service: { ID: 3, SERVICE: '3G', IDTECHNOLOGY: 2 },
      kpiSelected: [],
      typeChartSelected: ['line', 'line'],
    },

    column3: {
      service: {},
      kpiSelected: [],
      typeChartSelected: ['line', 'line'],
    },
  },

  stateGroupOption: false,
  stateGroupOptionHover: false,
  groupOptions: {
    groupRegion: { ID: 0, GROUP: 'región' },
    groupSubRegion: { ID: 1, GROUP: 'subregión' },
  },
  selectedGroup: { ID: 0, GROUP: 'región' },
}

const reducer = function setStateSidebar(state = initialState, action) {
  switch (action.type) {
    case SET_STATE_CHART_OPTIONS_DROPCALLCSFHOF:
      return {
        ...state,
        stateChartOptions: action.value,
      }

    case STATISTICS_SUCCESS_DROPCALLCSFHOF:
      return {
        ...state,
        config: action.config,
      }

    case SET_PRELOADER_STATE_DROPCALLCSFHOF:
      return {
        ...state,
        completeFetchData: action.stateFetch,
      }

    //Breadcrumb reducer
    case MENU_SELECTOR_LAPSE_DROPCALLCSFHOF:
      return {
        ...state,
        dropMenuShowSelectorLapse: action.value,
      }
    case MENU_SELECTOR_SERVICE_DROPCALLCSFHOF:
      return {
        ...state,
        dropMenuShowSelectorService: action.value,
      }
    case SHOW_REGION_DROPCALLCSFHOF:
      return {
        ...state,
        showRegion: action.value,
      }
    case SEARCH_REGION_DROPCALLCSFHOF:
      return {
        ...state,
        showSearchRegion: action.value,
      }
    case REGION_SUGGESTIONS_DROPCALLCSFHOF:
      return {
        ...state,
        regionSuggestions: action.value,
      }
    case SELECTED_REGION_DROPCALLCSFHOF:
      return {
        ...state,
        selectedRegion: action.region,
      }
    case SELECTED_SERVICE_DROPCALLCSFHOF:
      let newSelectorChartOptions = state.selectorChartOptions
      newSelectorChartOptions.column2.service =
        newSelectorChartOptions.column1.service
      newSelectorChartOptions.column2.kpiSelected = []
      newSelectorChartOptions.column2.typeChartSelected = ['line', 'line']

      newSelectorChartOptions.column1.service = action.value
      newSelectorChartOptions.column1.kpiSelected = ['DROP_CALLS']
      newSelectorChartOptions.column1.typeChartSelected = ['line', 'line']

      console.log(newSelectorChartOptions)
      return {
        ...state,
        selectedService: action.value,
        selectorChartOptions: { ...newSelectorChartOptions },
      }
    case SHOW_CLUSTER_DROPCALLCSFHOF:
      return {
        ...state,
        showCluster: action.value,
      }
    case SEARCH_CLUSTER_DROPCALLCSFHOF:
      return {
        ...state,
        showSearchCluster: action.value,
      }
    case CLUSTER_SUGGESTIONS_DROPCALLCSFHOF:
      return {
        ...state,
        clusterSuggestions: action.value,
      }

    case SELECTED_CLUSTER_DROPCALLCSFHOF:
      return {
        ...state,
        selectedCluster: action.cluster,
      }

    case MODAL_CALENDAR_DROPCALLCSFHOF:
      return {
        ...state,
        openModalCalendar: action.value,
      }
    case SET_CALENDAR_DATE_START_DROPCALLCSFHOF:
      return {
        ...state,
        calendarDateStart: action.value,
      }
    case SET_CALENDAR_DATE_END_DROPCALLCSFHOF:
      return {
        ...state,
        calendarDateEnd: action.value,
      }
    case SET_SELECTED_TIME_LAPSE_DROPCALLCSFHOF:
      return {
        ...state,
        selectedTimeLapse: action.value,
      }

    case REGION_INPUT_CHANGE_DROPCALLCSFHOF:
      return {
        ...state,
        regionInput: action.value,
      }
    case CLUSTER_INPUT_CHANGE_DROPCALLCSFHOF:
      return {
        ...state,
        clusterInput: action.value,
      }
    case SERVICE_SUCCESS_DROPCALLCSFHOF:
      return {
        ...state,
        services: action.value,
      }
    case REGION_SUCCESS_DROPCALLCSFHOF:
      return {
        ...state,
        regions: action.regions,
      }
    case CLUSTER_SUCCESS_DROPCALLCSFHOF:
      return {
        ...state,
        clusters: action.clusters,
      }

    case SET_CONFIG_CLEAN_SERIES_DROPCALLCSFHOF:
      let newConfig = state.config
      newConfig.series = []
      newConfig.yAxis = []
      return {
        ...state,
        config: { ...newConfig },
      }
    case SET_CHART_OPTIONS_DROPCALLCSFHOF:
      return {
        ...state,
        selectorChartOptions: action.value,
      }
    case SELECTED_GROUP_DROPCALLCSFHOF:
      return {
        ...state,
        selectedGroup: action.group,
      }
    case SET_STATE_GROUP_MENU_DROPCALLCSFHOF:
      return {
        ...state,
        stateGroupOption: action.value,
      }

    default:
      return state
  }
}

export default reducer
