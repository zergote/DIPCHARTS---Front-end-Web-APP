import {
  SET_STATE_CHART_OPTIONS_ERLANG,
  SET_PRELOADER_STATE_ERLANG,
  //Breadcrumb constants
  MENU_SELECTOR_LAPSE_ERLANG,
  MENU_SELECTOR_SERVICE_ERLANG,
  SELECTED_SERVICE_ERLANG,
  MODAL_CALENDAR_ERLANG,
  SET_CALENDAR_DATE_START_ERLANG,
  SET_CALENDAR_DATE_END_ERLANG,
  SET_SELECTED_TIME_LAPSE_ERLANG,
  SHOW_STATION_ERLANG,
  SEARCH_STATION_ERLANG,
  STATION_SUGGESTIONS_ERLANG,
  SELECTED_STATION_ERLANG,
  SHOW_SECTOR_ERLANG,
  SEARCH_SECTOR_ERLANG,
  SECTOR_SUGGESTIONS_ERLANG,
  SELECTED_SECTOR_ERLANG,
  SHOW_REGION_ERLANG,
  SEARCH_REGION_ERLANG,
  REGION_SUGGESTIONS_ERLANG,
  SELECTED_REGION_ERLANG,
  REGION_INPUT_CHANGE_ERLANG,
  STATION_INPUT_CHANGE_ERLANG,
  SECTOR_INPUT_CHANGE_ERLANG,
  SERVICE_SUCCESS_ERLANG,
  REGION_SUCCESS_ERLANG,
  STATION_SUCCESS_ERLANG,
  SECTOR_SUCCESS_ERLANG,
  STATISTICS_SUCCESS_ERLANG,
  SET_CONFIG_CLEAN_SERIES_ERLANG,
  SET_CHART_OPTIONS_ERLANG,
  SELECTED_GROUP_ERLANG,
  SET_STATE_GROUP_MENU_ERLANG,
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
        name: 'ERLANG',
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

  stations: { sinconexion: { ID: null, STATION: 'CARGANDO...' } },

  sectors: { sinconexion: { ID: null, SECTOR: 'CARGANDO...' } },

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
    kpisForThisChart: ['ERLANG', 'CCR'],
    optionsTypeChart: ['line', 'column', 'area', 'spline', 'areaspline'],

    column1: {
      service: { ID: 1, SERVICE: '2G', IDTECHNOLOGY: 1 },
      kpiSelected: ['ERLANG'],
      typeChartSelected: ['line', 'line'],
    },

    column2: {
      service: { ID: 3, SERVICE: '3G', IDTECHNOLOGY: 2 },
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
    case SET_STATE_CHART_OPTIONS_ERLANG:
      return {
        ...state,
        stateChartOptions: action.value,
      }

    case STATISTICS_SUCCESS_ERLANG:
      return {
        ...state,
        config: action.config,
      }

    case SET_PRELOADER_STATE_ERLANG:
      return {
        ...state,
        completeFetchData: action.stateFetch,
      }

    //Breadcrumb reducer
    case MENU_SELECTOR_LAPSE_ERLANG:
      return {
        ...state,
        dropMenuShowSelectorLapse: action.value,
      }
    case MENU_SELECTOR_SERVICE_ERLANG:
      return {
        ...state,
        dropMenuShowSelectorService: action.value,
      }
    case SHOW_REGION_ERLANG:
      return {
        ...state,
        showRegion: action.value,
      }
    case SEARCH_REGION_ERLANG:
      return {
        ...state,
        showSearchRegion: action.value,
      }
    case REGION_SUGGESTIONS_ERLANG:
      return {
        ...state,
        regionSuggestions: action.value,
      }
    case SELECTED_REGION_ERLANG:
      return {
        ...state,
        selectedRegion: action.region,
      }
    case SELECTED_SERVICE_ERLANG:
      let newSelectorChartOptions = state.selectorChartOptions
      newSelectorChartOptions.column1.service = action.value
      newSelectorChartOptions.column1.kpiSelected = ['ERLANG']
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
    case SHOW_STATION_ERLANG:
      return {
        ...state,
        showStation: action.value,
      }
    case SEARCH_STATION_ERLANG:
      return {
        ...state,
        showSearchStation: action.value,
      }
    case STATION_SUGGESTIONS_ERLANG:
      return {
        ...state,
        stationSuggestions: action.value,
      }
    case SELECTED_STATION_ERLANG:
      return {
        ...state,
        selectedStation: action.station,
      }
    case SHOW_SECTOR_ERLANG:
      return {
        ...state,
        showSector: action.value,
      }
    case SEARCH_SECTOR_ERLANG:
      return {
        ...state,
        showSearchSector: action.value,
      }
    case SECTOR_SUGGESTIONS_ERLANG:
      return {
        ...state,
        sectorSuggestions: action.value,
      }
    case SELECTED_SECTOR_ERLANG:
      return {
        ...state,
        selectedSector: action.sector,
      }
    case MODAL_CALENDAR_ERLANG:
      return {
        ...state,
        openModalCalendar: action.value,
      }
    case SET_CALENDAR_DATE_START_ERLANG:
      return {
        ...state,
        calendarDateStart: action.value,
      }
    case SET_CALENDAR_DATE_END_ERLANG:
      return {
        ...state,
        calendarDateEnd: action.value,
      }
    case SET_SELECTED_TIME_LAPSE_ERLANG:
      return {
        ...state,
        selectedTimeLapse: action.value,
      }

    case REGION_INPUT_CHANGE_ERLANG:
      return {
        ...state,
        regionInput: action.value,
      }
    case STATION_INPUT_CHANGE_ERLANG:
      return {
        ...state,
        stationInput: action.value,
      }
    case SECTOR_INPUT_CHANGE_ERLANG:
      return {
        ...state,
        sectorInput: action.value,
      }
    case SERVICE_SUCCESS_ERLANG:
      return {
        ...state,
        services: action.value,
      }
    case REGION_SUCCESS_ERLANG:
      return {
        ...state,
        regions: action.regions,
      }
    case STATION_SUCCESS_ERLANG:
      return {
        ...state,
        stations: action.stations,
      }
    case SECTOR_SUCCESS_ERLANG:
      return {
        ...state,
        sectors: action.sectors,
      }
    case SET_CONFIG_CLEAN_SERIES_ERLANG:
      let newConfig = state.config
      newConfig.series = []
      newConfig.yAxis = []
      return {
        ...state,
        config: { ...newConfig },
      }
    case SET_CHART_OPTIONS_ERLANG:
      return {
        ...state,
        selectorChartOptions: action.value,
      }
    case SELECTED_GROUP_ERLANG:
      return {
        ...state,
        selectedGroup: action.group,
      }
    case SET_STATE_GROUP_MENU_ERLANG:
      return {
        ...state,
        stateGroupOption: action.value,
      }

    default:
      return state
  }
}

export default reducer
