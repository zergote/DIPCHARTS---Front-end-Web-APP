import {
  SET_STATE_CHART_OPTIONS_CCRPCR,
  SET_PRELOADER_STATE_CCRPCR,
  //Breadcrumb constants
  MENU_SELECTOR_LAPSE_CCRPCR,
  MENU_SELECTOR_SERVICE_CCRPCR,
  SELECTED_SERVICE_CCRPCR,
  MODAL_CALENDAR_CCRPCR,
  SET_CALENDAR_DATE_START_CCRPCR,
  SET_CALENDAR_DATE_END_CCRPCR,
  SET_SELECTED_TIME_LAPSE_CCRPCR,
  SHOW_STATION_CCRPCR,
  SEARCH_STATION_CCRPCR,
  STATION_SUGGESTIONS_CCRPCR,
  SELECTED_STATION_CCRPCR,
  SHOW_SECTOR_CCRPCR,
  SEARCH_SECTOR_CCRPCR,
  SECTOR_SUGGESTIONS_CCRPCR,
  SELECTED_SECTOR_CCRPCR,
  SHOW_REGION_CCRPCR,
  SEARCH_REGION_CCRPCR,
  REGION_SUGGESTIONS_CCRPCR,
  SELECTED_REGION_CCRPCR,
  REGION_INPUT_CHANGE_CCRPCR,
  STATION_INPUT_CHANGE_CCRPCR,
  SECTOR_INPUT_CHANGE_CCRPCR,
  SERVICE_SUCCESS_CCRPCR,
  REGION_SUCCESS_CCRPCR,
  STATION_SUCCESS_CCRPCR,
  SECTOR_SUCCESS_CCRPCR,
  STATISTICS_SUCCESS_CCRPCR,
  SET_CONFIG_CLEAN_SERIES_CCRPCR,
  SET_CHART_OPTIONS_CCRPCR,
  SELECTED_GROUP_CCRPCR,
  SET_STATE_GROUP_MENU_CCRPCR
} from "./constants";
import moment from "moment";

const initialState = {
  completeFetchData: true,
  stateChartOptions: false,
  theme: "default",
  config: {
    chart: {
      type: "line",
      zoomType: "xy",
      alignTicks: false,
      events: {
        load: function() {
          //  var
          var series = this.series,
            max = series[0].dataMax,
            min = series[0].dataMin;

          series.forEach(function(serie) {
            if (serie.dataMax > max) {
              max = serie.dataMax;
            }

            if (serie.dataMin < min) {
              min = serie.dataMin;
            }
          });

          this.yAxis[0].update({
            min: min,
            max: max
          });
        }
      }
    },
    rangeSelector: {
      buttonTheme: {
        width: 63
      },
      buttons: [
        {
          type: "day",
          count: 1,
          text: "Día"
        },
        {
          type: "week",
          count: 1,
          text: "Semana"
        },
        {
          type: "month",
          count: 1,
          text: "Mes"
        },
        {
          type: "month",
          count: 3,
          text: "Trimestre"
        },
        {
          type: "year",
          count: 1,
          text: "Año"
        },
        {
          type: "all",
          text: "Todo"
        }
      ],
      selected: 1 // all
    },
    legend: {
      enabled: true
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
        dateFormat: "%d/%m/%Y %H:%M"
      },
      xls: {
        dateFormat: "%d/%m/%Y %H:%M"
      }
      //Quita el boton de exportación
      /* buttons: {
             contextButton: {
               enabled: false
             }
           }*/
    },
    noData: {
      style: {
        fontSize: "1.5em"
      }
    },
    navigator: {
      series: {
        includeInCSVExport: false
      }
    },
    credits: {
      enabled: true,
      text: "Corporación Digitel, C.A.",
      /* eslint-disable */
      href: 'javascript:window.open("http://www.digitel.com.ve/", "_blank")'
      /* eslint-enable */
    },
    title: {
      text: "GRAFICA",
      fontWeight: "bold"
    },
    yAxis: [
      {
        // Primary yAxis
        gridLineWidth: 1,
        labels: {
          format: "{value}"
        },
        title: {
          text: "",
          fontWeight: "bold"
        },
        opposite: true
      }
    ],
    series: [
      {
        name: "CCR",
        data: [],
        yAxis: 0,
        type: "line",
        tooltip: {
          valueDecimals: 2
        }
      }
    ]
  },

  //Breadcrumb state
  timeLapses: {
    day: {
      label: "HOY",
      since: moment().format("YYYYMMDD"),
      until: moment().format("YYYYMMDD")
    },
    week: {
      label: "ULTIMA SEMANA",
      since: moment()
        .subtract(6, "d")
        .format("YYYYMMDD"),
      until: moment().format("YYYYMMDD")
    },
    month: {
      label: "ULTIMO MES",
      since: moment()
        .subtract(1, "months")
        .format("YYYYMMDD"),
      until: moment().format("YYYYMMDD")
    },
    quarterly: {
      label: "UlTIMO TRIMESTRE",
      since: moment()
        .subtract(3, "months")
        .format("YYYYMMDD"),
      until: moment().format("YYYYMMDD")
    },
    custom: {
      label: "PERSONALIZADO",
      since: moment().format("YYYYMMDD"),
      until: moment().format("YYYYMMDD")
    }
  },

  services: {
    service2gDatos: { ID: 1, SERVICE: "2G", IDTECHNOLOGY: 1 },
    service3gDatos: { ID: 3, SERVICE: "3G", IDTECHNOLOGY: 2 },
    service4gDatps: { ID: 5, SERVICE: "4G", IDTECHNOLOGY: 3 }
  },

  regions: { sinconexion: { ID: null, REGION: "CARGANDO..." } },

  stations: { sinconexion: { ID: null, STATION: "CARGANDO..." } },

  sectors: { sinconexion: { ID: null, SECTOR: "CARGANDO..." } },

  selectedTimeLapse: {
    label: moment().format("DD/MM/YY"),
    since: moment().format("YYYYMMDD"),
    until: moment().format("YYYYMMDD")
  },

  selectedService: { ID: 1, SERVICE: "2G", IDTECHNOLOGY: 1 },
  openModalCalendar: false,

  dropMenuShowSelectorLapse: false,
  dropMenuShowSelectorService: false,

  showRegion: true,
  showStation: false,
  showSector: false,

  selectedRegion: { ID: null, REGION: "REGIONES..." },
  regionSuggestions: true,
  showSearchRegion: false,

  selectedStation: "",
  stationSuggestions: true,
  showSearchStation: false,

  selectedSector: "",
  sectorSuggestions: true,
  showSearchSector: false,

  regionInput: "",
  stationInput: "",
  sectorInput: "",

  selectorChartOptions: {
    kpisForThisChart: ["CCR", "PCR"],
    optionsTypeChart: ["line", "column", "area", "spline", "areaspline"],

    column1: {
      service: { ID: 1, SERVICE: "2G", IDTECHNOLOGY: 1 },
      kpiSelected: ["CCR", "PCR"],
      typeChartSelected: ["line", "line"]
    },

    column2: {
      service: { ID: 3, SERVICE: "3G", IDTECHNOLOGY: 2 },
      kpiSelected: [],
      typeChartSelected: ["line", "line"]
    },

    column3: {
      service: { ID: 5, SERVICE: "4G", IDTECHNOLOGY: 3 },
      kpiSelected: [],
      typeChartSelected: ["line", "line"]
    }
  },

  stateGroupOption: false,
  stateGroupOptionHover: false,
  groupOptions: {
    groupRegion: { ID: 0, GROUP: "región" },
    groupSubRegion: { ID: 1, GROUP: "subregión" }
  },
  selectedGroup: { ID: 0, GROUP: "región" }
};

const reducer = function setStateSidebar(state = initialState, action) {
  switch (action.type) {
    case SET_STATE_CHART_OPTIONS_CCRPCR:
      return {
        ...state,
        stateChartOptions: action.value
      };

    case STATISTICS_SUCCESS_CCRPCR:
      return {
        ...state,
        config: action.config
      };

    case SET_PRELOADER_STATE_CCRPCR:
      return {
        ...state,
        completeFetchData: action.stateFetch
      };

    //Breadcrumb reducer
    case MENU_SELECTOR_LAPSE_CCRPCR:
      return {
        ...state,
        dropMenuShowSelectorLapse: action.value
      };
    case MENU_SELECTOR_SERVICE_CCRPCR:
      return {
        ...state,
        dropMenuShowSelectorService: action.value
      };
    case SHOW_REGION_CCRPCR:
      return {
        ...state,
        showRegion: action.value
      };
    case SEARCH_REGION_CCRPCR:
      return {
        ...state,
        showSearchRegion: action.value
      };
    case REGION_SUGGESTIONS_CCRPCR:
      return {
        ...state,
        regionSuggestions: action.value
      };
    case SELECTED_REGION_CCRPCR:
      return {
        ...state,
        selectedRegion: action.region
      };
    case SELECTED_SERVICE_CCRPCR:
      let newSelectorChartOptions = state.selectorChartOptions;
      newSelectorChartOptions.column1.service = action.value;
      if (action.value.SERVICE === "4G") {
        newSelectorChartOptions.column1.kpiSelected = ["PCR"];
      } else {
        newSelectorChartOptions.column1.kpiSelected = ["CCR", "PCR"];
      }

      newSelectorChartOptions.column1.typeChartSelected = ["line", "line"];

      Object.filter = (obj, predicate) =>
        Object.keys(obj)
          .filter(key => predicate(obj[key]))
          .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

      let resultServices = Object.filter(
        state.services,
        item => item.ID !== action.value.ID
      );

      let arrayOfServices = [];

      Object.keys(resultServices).map((item, index) =>
        arrayOfServices.push(resultServices[item])
      );

      if (arrayOfServices.length > 1) {
        if (arrayOfServices[0].ID < arrayOfServices[1].ID) {
          newSelectorChartOptions.column2.service = arrayOfServices[0];
          newSelectorChartOptions.column2.kpiSelected = [];
          newSelectorChartOptions.column2.typeChartSelected = ["line", "line"];

          newSelectorChartOptions.column3.service = arrayOfServices[1];
          newSelectorChartOptions.column3.kpiSelected = [];
          newSelectorChartOptions.column3.typeChartSelected = ["line", "line"];
        } else {
          newSelectorChartOptions.column2.service = arrayOfServices[1];
          newSelectorChartOptions.column2.kpiSelected = [];
          newSelectorChartOptions.column2.typeChartSelected = ["line", "line"];

          newSelectorChartOptions.column3.service = arrayOfServices[0];
          newSelectorChartOptions.column3.kpiSelected = [];
          newSelectorChartOptions.column3.typeChartSelected = ["line", "line"];
        }
      } else {
        newSelectorChartOptions.column2.service = arrayOfServices[0];
        newSelectorChartOptions.column2.kpiSelected = [];
        newSelectorChartOptions.column2.typeChartSelected = ["line", "line"];
      }

      return {
        ...state,
        selectedService: action.value,
        selectorChartOptions: { ...newSelectorChartOptions }
      };
    case SHOW_STATION_CCRPCR:
      return {
        ...state,
        showStation: action.value
      };
    case SEARCH_STATION_CCRPCR:
      return {
        ...state,
        showSearchStation: action.value
      };
    case STATION_SUGGESTIONS_CCRPCR:
      return {
        ...state,
        stationSuggestions: action.value
      };
    case SELECTED_STATION_CCRPCR:
      return {
        ...state,
        selectedStation: action.station
      };
    case SHOW_SECTOR_CCRPCR:
      return {
        ...state,
        showSector: action.value
      };
    case SEARCH_SECTOR_CCRPCR:
      return {
        ...state,
        showSearchSector: action.value
      };
    case SECTOR_SUGGESTIONS_CCRPCR:
      return {
        ...state,
        sectorSuggestions: action.value
      };
    case SELECTED_SECTOR_CCRPCR:
      return {
        ...state,
        selectedSector: action.sector
      };
    case MODAL_CALENDAR_CCRPCR:
      return {
        ...state,
        openModalCalendar: action.value
      };
    case SET_CALENDAR_DATE_START_CCRPCR:
      return {
        ...state,
        calendarDateStart: action.value
      };
    case SET_CALENDAR_DATE_END_CCRPCR:
      return {
        ...state,
        calendarDateEnd: action.value
      };
    case SET_SELECTED_TIME_LAPSE_CCRPCR:
      return {
        ...state,
        selectedTimeLapse: action.value
      };

    case REGION_INPUT_CHANGE_CCRPCR:
      return {
        ...state,
        regionInput: action.value
      };
    case STATION_INPUT_CHANGE_CCRPCR:
      return {
        ...state,
        stationInput: action.value
      };
    case SECTOR_INPUT_CHANGE_CCRPCR:
      return {
        ...state,
        sectorInput: action.value
      };
    case SERVICE_SUCCESS_CCRPCR:
      return {
        ...state,
        services: action.value
      };
    case REGION_SUCCESS_CCRPCR:
      return {
        ...state,
        regions: action.regions
      };
    case STATION_SUCCESS_CCRPCR:
      return {
        ...state,
        stations: action.stations
      };
    case SECTOR_SUCCESS_CCRPCR:
      return {
        ...state,
        sectors: action.sectors
      };
    case SET_CONFIG_CLEAN_SERIES_CCRPCR:
      let newConfig = state.config;
      newConfig.series = [];
      newConfig.yAxis = [];
      return {
        ...state,
        config: { ...newConfig }
      };
    case SET_CHART_OPTIONS_CCRPCR:
      return {
        ...state,
        selectorChartOptions: action.value
      };
    case SELECTED_GROUP_CCRPCR:
      return {
        ...state,
        selectedGroup: action.group
      };
    case SET_STATE_GROUP_MENU_CCRPCR:
      return {
        ...state,
        stateGroupOption: action.value
      };

    default:
      return state;
  }
};

export default reducer;
