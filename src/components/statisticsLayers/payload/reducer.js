import {
  SET_STATE_CHART_OPTIONS_PAYLOAD,
  SET_PRELOADER_STATE_PAYLOAD,
  //Breadcrumb constants
  MENU_SELECTOR_LAPSE_PAYLOAD,
  MENU_SELECTOR_SERVICE_PAYLOAD,
  SELECTED_SERVICE_PAYLOAD,
  MODAL_CALENDAR_PAYLOAD,
  SET_CALENDAR_DATE_START_PAYLOAD,
  SET_CALENDAR_DATE_END_PAYLOAD,
  SET_SELECTED_TIME_LAPSE_PAYLOAD,
  SHOW_STATION_PAYLOAD,
  SEARCH_STATION_PAYLOAD,
  STATION_SUGGESTIONS_PAYLOAD,
  SELECTED_STATION_PAYLOAD,
  SHOW_SECTOR_PAYLOAD,
  SEARCH_SECTOR_PAYLOAD,
  SECTOR_SUGGESTIONS_PAYLOAD,
  SELECTED_SECTOR_PAYLOAD,
  SHOW_REGION_PAYLOAD,
  SEARCH_REGION_PAYLOAD,
  REGION_SUGGESTIONS_PAYLOAD,
  SELECTED_REGION_PAYLOAD,
  REGION_INPUT_CHANGE_PAYLOAD,
  STATION_INPUT_CHANGE_PAYLOAD,
  SECTOR_INPUT_CHANGE_PAYLOAD,
  SERVICE_SUCCESS_PAYLOAD,
  REGION_SUCCESS_PAYLOAD,
  STATION_SUCCESS_PAYLOAD,
  SECTOR_SUCCESS_PAYLOAD,
  STATISTICS_SUCCESS_PAYLOAD,
  SET_CONFIG_CLEAN_SERIES_PAYLOAD,
  SET_CHART_OPTIONS_PAYLOAD,
  SELECTED_GROUP_PAYLOAD,
  SET_STATE_GROUP_MENU_PAYLOAD,
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
        name: 'PL',
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
    service2gDatos: { ID: 2, SERVICE: '2G', IDTECHNOLOGY: 1 },
    service3gDatos: { ID: 4, SERVICE: '3G', IDTECHNOLOGY: 2 },
    service4gDatps: { ID: 5, SERVICE: '4G', IDTECHNOLOGY: 3 },
  },

  regions: { sinconexion: { ID: null, REGION: 'CARGANDO...' } },

  stations: { sinconexion: { ID: null, STATION: 'CARGANDO...' } },

  sectors: { sinconexion: { ID: null, SECTOR: 'CARGANDO...' } },

  selectedTimeLapse: {
    label: moment().format('DD/MM/YY'),
    since: moment().format('YYYYMMDD'),
    until: moment().format('YYYYMMDD'),
  },

  selectedService: { ID: 2, SERVICE: '2G', IDTECHNOLOGY: 1 },
  openModalCalendar: false,

  dropMenuShowSelectorLapse: false,
  dropMenuShowSelectorService: false,

  showRegion: true,
  showStation: false,
  showSector: false,

  selectedRegion: { ID: null, REGION: 'REGIONES...' },
  regionSuggestions: true,
  showSearchRegion: false,

  selectedStation: '',
  stationSuggestions: true,
  showSearchStation: false,

  selectedSector: '',
  sectorSuggestions: true,
  showSearchSector: false,

  regionInput: '',
  stationInput: '',
  sectorInput: '',

  selectorChartOptions: {
    kpisForThisChart: ['PAYLOAD_TOT', 'PCR'],
    optionsTypeChart: ['line', 'column', 'area', 'spline', 'areaspline'],

    column1: {
      service: { ID: 2, SERVICE: '2G', IDTECHNOLOGY: 1 },
      kpiSelected: ['PAYLOAD_TOT'],
      typeChartSelected: ['line', 'line'],
    },

    column2: {
      service: { ID: 4, SERVICE: '3G', IDTECHNOLOGY: 2 },
      kpiSelected: [],
      typeChartSelected: ['line', 'line'],
    },

    column3: {
      service: { ID: 5, SERVICE: '4G', IDTECHNOLOGY: 3 },
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
    case SET_STATE_CHART_OPTIONS_PAYLOAD:
      return {
        ...state,
        stateChartOptions: action.value,
      }

    case STATISTICS_SUCCESS_PAYLOAD:
      return {
        ...state,
        config: action.config,
      }

    case SET_PRELOADER_STATE_PAYLOAD:
      return {
        ...state,
        completeFetchData: action.stateFetch,
      }

    //Breadcrumb reducer
    case MENU_SELECTOR_LAPSE_PAYLOAD:
      return {
        ...state,
        dropMenuShowSelectorLapse: action.value,
      }
    case MENU_SELECTOR_SERVICE_PAYLOAD:
      return {
        ...state,
        dropMenuShowSelectorService: action.value,
      }
    case SHOW_REGION_PAYLOAD:
      return {
        ...state,
        showRegion: action.value,
      }
    case SEARCH_REGION_PAYLOAD:
      return {
        ...state,
        showSearchRegion: action.value,
      }
    case REGION_SUGGESTIONS_PAYLOAD:
      return {
        ...state,
        regionSuggestions: action.value,
      }
    case SELECTED_REGION_PAYLOAD:
      return {
        ...state,
        selectedRegion: action.region,
      }
    case SELECTED_SERVICE_PAYLOAD:
      let newSelectorChartOptions = state.selectorChartOptions
      newSelectorChartOptions.column1.service = action.value
      newSelectorChartOptions.column1.kpiSelected = ['PAYLOAD_TOT']
      newSelectorChartOptions.column1.typeChartSelected = ['line', 'line']

      Object.filter = (obj, predicate) =>
        Object.keys(obj)
          .filter(key => predicate(obj[key]))
          .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {})

      let resultServices = Object.filter(
        state.services,
        item => item.ID !== action.value.ID
      )

      let arrayOfServices = []

      Object.keys(resultServices).map((item, index) =>
        arrayOfServices.push(resultServices[item])
      )

      if (arrayOfServices.length > 1) {
        if (arrayOfServices[0].ID < arrayOfServices[1].ID) {
          newSelectorChartOptions.column2.service = arrayOfServices[0]
          newSelectorChartOptions.column2.kpiSelected = []
          newSelectorChartOptions.column2.typeChartSelected = ['line', 'line']

          newSelectorChartOptions.column3.service = arrayOfServices[1]
          newSelectorChartOptions.column3.kpiSelected = []
          newSelectorChartOptions.column3.typeChartSelected = ['line', 'line']
        } else {
          newSelectorChartOptions.column2.service = arrayOfServices[1]
          newSelectorChartOptions.column2.kpiSelected = []
          newSelectorChartOptions.column2.typeChartSelected = ['line', 'line']

          newSelectorChartOptions.column3.service = arrayOfServices[0]
          newSelectorChartOptions.column3.kpiSelected = []
          newSelectorChartOptions.column3.typeChartSelected = ['line', 'line']
        }
      } else {
        newSelectorChartOptions.column2.service = arrayOfServices[0]
        newSelectorChartOptions.column2.kpiSelected = []
        newSelectorChartOptions.column2.typeChartSelected = ['line', 'line']
      }

      return {
        ...state,
        selectedService: action.value,
        selectorChartOptions: { ...newSelectorChartOptions },
      }
    case SHOW_STATION_PAYLOAD:
      return {
        ...state,
        showStation: action.value,
      }
    case SEARCH_STATION_PAYLOAD:
      return {
        ...state,
        showSearchStation: action.value,
      }
    case STATION_SUGGESTIONS_PAYLOAD:
      return {
        ...state,
        stationSuggestions: action.value,
      }
    case SELECTED_STATION_PAYLOAD:
      return {
        ...state,
        selectedStation: action.station,
      }
    case SHOW_SECTOR_PAYLOAD:
      return {
        ...state,
        showSector: action.value,
      }
    case SEARCH_SECTOR_PAYLOAD:
      return {
        ...state,
        showSearchSector: action.value,
      }
    case SECTOR_SUGGESTIONS_PAYLOAD:
      return {
        ...state,
        sectorSuggestions: action.value,
      }
    case SELECTED_SECTOR_PAYLOAD:
      return {
        ...state,
        selectedSector: action.sector,
      }
    case MODAL_CALENDAR_PAYLOAD:
      return {
        ...state,
        openModalCalendar: action.value,
      }
    case SET_CALENDAR_DATE_START_PAYLOAD:
      return {
        ...state,
        calendarDateStart: action.value,
      }
    case SET_CALENDAR_DATE_END_PAYLOAD:
      return {
        ...state,
        calendarDateEnd: action.value,
      }
    case SET_SELECTED_TIME_LAPSE_PAYLOAD:
      return {
        ...state,
        selectedTimeLapse: action.value,
      }

    case REGION_INPUT_CHANGE_PAYLOAD:
      return {
        ...state,
        regionInput: action.value,
      }
    case STATION_INPUT_CHANGE_PAYLOAD:
      return {
        ...state,
        stationInput: action.value,
      }
    case SECTOR_INPUT_CHANGE_PAYLOAD:
      return {
        ...state,
        sectorInput: action.value,
      }
    case SERVICE_SUCCESS_PAYLOAD:
      return {
        ...state,
        services: action.value,
      }
    case REGION_SUCCESS_PAYLOAD:
      return {
        ...state,
        regions: action.regions,
      }
    case STATION_SUCCESS_PAYLOAD:
      return {
        ...state,
        stations: action.stations,
      }
    case SECTOR_SUCCESS_PAYLOAD:
      return {
        ...state,
        sectors: action.sectors,
      }
    case SET_CONFIG_CLEAN_SERIES_PAYLOAD:
      let newConfig = state.config
      newConfig.series = []
      newConfig.yAxis = []
      return {
        ...state,
        config: { ...newConfig },
      }
    case SET_CHART_OPTIONS_PAYLOAD:
      return {
        ...state,
        selectorChartOptions: action.value,
      }
    case SELECTED_GROUP_PAYLOAD:
      return {
        ...state,
        selectedGroup: action.group,
      }
    case SET_STATE_GROUP_MENU_PAYLOAD:
      return {
        ...state,
        stateGroupOption: action.value,
      }

    default:
      return state
  }
}

export default reducer
