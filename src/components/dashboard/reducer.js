import {
  SET_CHANGE_TO_OTHER_VIEW_MTD_KPI,
  SET_CHANGE_TO_OTHER_VIEW_TOP_ERLANG,
  SET_CHANGE_TO_OTHER_VIEW_TOP_PAYLOAD,
  SET_CHANGE_TO_OTHER_VIEW_NEW_STATIONS,
  SET_HOVER_LEAVE_REGION_LOCK,
  SET_DROP_MENU_REGION_SELECTOR,
  SET_STATE_HI_MESSAGE,
  SET_COMPLETE_FETCH_DATA_PAYLOAD_MTD,
  SET_COMPLETE_FETCH_DATA_ERLANG_MTD,
  SET_COMPLETE_FETCH_DATA_PAYLOAD_BY_MONTH,
  SET_COMPLETE_FETCH_DATA_ERLANG_BY_MONTH,
  ERLANG_UNTIL_30_DAYS_SUCCESS,
  PAYLOAD_UNTIL_30_DAYS_SUCCESS,
  ERLANG_LATEST_12_MONTHS_SUCCESS,
  PAYLOAD_LATEST_12_MONTHS_SUCCESS,
  SUM_KPI_MONTH_COMP_SUCCESS,
  TOP_STATION_ERLANG_SUCCESS,
  TOP_STATION_PAYLOAD_SUCCESS,
  SET_FIRST_STATION_ERLANG,
  SET_SECOND_STATION_ERLANG,
  SET_THIRD_STATION_ERLANG,
  SET_FIRST_STATION_PAYLOAD,
  SET_SECOND_STATION_PAYLOAD,
  SET_THIRD_STATION_PAYLOAD,
  REGION_DASHBOARD_SUCCESS,
  SELECTED_DASHBOARD_REGION,
  SET_ERLANG_SUM_MES_ACTUAL,
  SET_ERLANG_SUM_MES_ANTERIOR,
  SET_PAYLOAD_SUM_MES_ACTUAL,
  SET_PAYLOAD_SUM_MES_ANTERIOR,
  GET_ALERTS_DASHBOARD_SUCCESS
} from "./constants";
import moment from "moment";
require("moment/locale/es.js");
moment.locale("es");

let mesAnterior =
  moment()
    .subtract(2, "month")
    .format("DD/MMM") +
  "-" +
  moment()
    .subtract(1, "month")
    .format("DD/MMM");

let mesActual =
  moment()
    .subtract(1, "month")
    .format("DD/MMM") +
  "-" +
  moment()
    .subtract(0, "month")
    .format("DD/MMM");
const initialState = {
  hiMessage: true,
  hoverLeaveLock: true,
  changeToOtherViewMTDKPI: false,
  changeToOtherViewTopErlang: false,
  changeToOtherViewTopPayload: false,
  changeToOtherViewNewStations: false,

  selectedRegion: { ID: null, REGION: "REGIONES..." },

  regions: {
    sinconexion: { ID: null, REGION: "CARGANDO..." }
  },

  dropMenuShowSelectorRegion: false,

  completeFetchDataPayloadMTD: true,
  completeFetchDataErlangMTD: true,
  completeFetchDataPayloaByMonth: true,
  completeFetchDataErlangByMonth: true,

  configErlangMTD: {
    chart: {
      type: "line",
      height: "29%",
      //margin: [100, 30, 60, 30],
      alignTicks: false,
      events: {
        load: function() {
          //  var
          if (this.series.length > 0) {
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
      }
    },
    rangeSelector: {
      enabled: true,
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
          type: "all",
          text: "Todo"
        }
      ],
      selected: 1 // all
    },
    scrollbar: {
      enabled: false
    },
    /*legend: {
      enabled: true
    } */
    legend: {
      enabled: true,
      layout: "horizontal",
      align: "left",
      verticalAlign: "top",
      floating: true,
      x: 330,
      y: -2,
      borderColor: "#262626",
      borderRadius: "3",
      borderWidth: "1",
      itemStyle: {
        fontSize: "11px"
      }
    },
    exporting: {
      enabled: false,
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
      enabled: true,
      series: {
        includeInCSVExport: false
      }
    },
    credits: {
      enabled: false,
      text: "Corporación Digitel, C.A.",
      /* eslint-disable */
      href: 'javascript:window.open("http://www.digitel.com.ve/", "_blank")'
      /* eslint-enable */
    },
    title: {
      text: null
    },
    yAxis: [
      {
        // Primary yAxis
        gridLineWidth: 1,
        labels: {
          format: "{value}ERL"
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
        name: "Erlang",
        data: [],
        yAxis: 0,
        type: "line",
        color: "#E07E39",
        tooltip: {
          valueDecimals: 2
        }
      }
    ]
  },
  configPayloadMTD: {
    chart: {
      type: "line",
      height: "29%",
      //margin: [60, 40, 60, 40],
      alignTicks: false,
      events: {
        load: function() {
          //  var
          if (this.series.length > 0) {
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
      }
    },
    rangeSelector: {
      enabled: true,
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
          type: "all",
          text: "Todo"
        }
      ],
      selected: 1 // all
    },
    scrollbar: {
      enabled: false
    },
    /*legend: {
      enabled: true
    } */
    legend: {
      enabled: true,
      layout: "horizontal",
      align: "left",
      verticalAlign: "top",
      floating: true,
      x: 330,
      y: -2,
      borderColor: "#262626",
      borderRadius: "3",
      borderWidth: "1",
      itemStyle: {
        fontSize: "11px"
      }
    },
    exporting: {
      enabled: false,
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
      enabled: true,
      series: {
        includeInCSVExport: false
      }
    },
    credits: {
      enabled: false,
      text: "Corporación Digitel, C.A.",
      /* eslint-disable */
      href: 'javascript:window.open("http://www.digitel.com.ve/", "_blank")'
      /* eslint-enable */
    },
    title: {
      text: null
    },
    yAxis: [
      {
        // Primary yAxis
        gridLineWidth: 1,
        labels: {
          format: "{value}MB"
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
        name: "Payload",
        data: [],
        yAxis: 0,
        type: "line",
        tooltip: {
          valueDecimals: 2
        }
      }
    ]
  },
  configPayloadByMonth: {
    chart: {
      type: "line",
      height: "29%",
      margin: [30, 55, 30, 10],
      alignTicks: false,
      events: {
        load: function() {
          //  var
          if (this.series.length > 0) {
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
      }
    },
    rangeSelector: {
      enabled: true,
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
          type: "all",
          text: "Todo"
        }
      ],
      selected: 1 // all
    },
    scrollbar: {
      enabled: false
    },
    /*legend: {
      enabled: true
    } */
    legend: {
      enabled: true,
      layout: "horizontal",
      align: "left",
      verticalAlign: "top",
      floating: true,
      x: 0,
      y: -2,
      borderColor: "#262626",
      borderRadius: "3",
      borderWidth: "1",
      itemStyle: {
        fontSize: "11px"
      }
    },
    exporting: {
      enabled: false,
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
      enabled: true,
      series: {
        includeInCSVExport: false
      }
    },
    credits: {
      enabled: false,
      text: "Corporación Digitel, C.A.",
      /* eslint-disable */
      href: 'javascript:window.open("http://www.digitel.com.ve/", "_blank")'
      /* eslint-enable */
    },
    title: {
      text: null
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          color: "#565656",
          format: "{point.y:,.2f}",
          crop: false,
          overflow: "none"
        }
      }
    },
    yAxis: [
      {
        // Primary yAxis
        gridLineWidth: 1,
        labels: {
          format: "{value}TB"
        },
        title: {
          text: "",
          fontWeight: "bold"
        },
        opposite: true
      }
    ],
    xAxis: {
      categories: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ],
      crosshair: true
    },
    series: [
      {
        name: "Payload",
        data: [],
        yAxis: 0,
        type: "column",
        color: "#00D0CB",
        tooltip: {
          valueDecimals: 2
        }
      }
    ]
  },

  configErlangByMonth: {
    chart: {
      type: "line",
      height: "29%",
      margin: [30, 87, 30, 10],
      alignTicks: false,
      events: {
        load: function() {
          //  var
          if (this.series.length > 0) {
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
      }
    },
    rangeSelector: {
      enabled: true,
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
          type: "all",
          text: "Todo"
        }
      ],
      selected: 1 // all
    },
    scrollbar: {
      enabled: false
    },
    /*legend: {
      enabled: true
    } */
    legend: {
      enabled: true,
      layout: "horizontal",
      align: "left",
      verticalAlign: "top",
      floating: true,
      x: 0,
      y: -2,
      borderColor: "#262626",
      borderRadius: "3",
      borderWidth: "1",
      itemStyle: {
        fontSize: "11px"
      }
    },
    exporting: {
      enabled: false,
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
      enabled: true,
      series: {
        includeInCSVExport: false
      }
    },
    credits: {
      enabled: false,
      text: "Corporación Digitel, C.A.",
      /* eslint-disable */
      href: 'javascript:window.open("http://www.digitel.com.ve/", "_blank")'
      /* eslint-enable */
    },
    title: {
      text: null
    },
    yAxis: [
      {
        // Primary yAxis
        gridLineWidth: 1,
        labels: {
          format: "{value}ERL"
        },
        title: {
          text: "",
          fontWeight: "bold"
        },
        opposite: true
      }
    ],
    xAxis: {
      categories: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ],
      crosshair: true
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          color: "#565656",
          format: "{point.y:,.2f}",
          crop: false,
          overflow: "none"
        }
      }
    },
    series: [
      {
        name: "Erlang",
        data: [],
        yAxis: 0,
        type: "column",
        color: "#E07E39",
        tooltip: {
          valueDecimals: 2
        }
      }
    ]
  },

  payloadMesActualMTD: 1,
  payloadMesAnteriorMTD: 1,
  erlangMesActualMTD: 1,
  erlangMesAnteriorMTD: 1,

  configMTDKPIs: {
    chart: {
      type: "bar",
      zoomType: "x",
      //height: '29%',
      margin: [60, 70, 60, 70]
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
          type: "all",
          text: "Todo"
        }
      ],
      selected: 1 // all
    },
    legend: {
      enabled: true
    },
    scrollbar: {
      enabled: false
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
      enabled: false,
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
      enabled: true,
      series: {
        includeInCSVExport: false
      }
    },
    credits: {
      enabled: false,
      text: "Corporación Digitel, C.A.",
      /* eslint-disable */
      href: 'javascript:window.open("http://www.digitel.com.ve/", "_blank")'
      /* eslint-enable */
    },
    title: {
      text: null
    },
    subtitle: {
      text: "Comparación De Tráfico En Un Mes"
    },
    xAxis: {
      categories: [mesAnterior, mesActual],
      labels: {
        style: {
          fontSize: "10px"
        }
      },
      title: {
        text: null
      }
    },
    yAxis: [
      {
        // Primary yAxis
        min: 0,

        gridLineWidth: 1,
        labels: {
          format: "{value}TB",
          overflow: "justify",
          style: {
            fontSize: "9px"
          }
        },
        title: {
          text: "",
          fontWeight: "bold",
          align: "high"
        },
        opposite: false
      },
      {
        // Secondary yAxis
        min: 0,

        gridLineWidth: 1,
        labels: {
          format: "{value}ERL",
          overflow: "justify",
          style: {
            fontSize: "9px"
          }
        },
        title: {
          text: "",
          fontWeight: "bold",
          align: "high"
        },
        opposite: true
      }
    ],
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          crop: false,
          overflow: "none"
        }
      }
    },
    series: [
      {
        name: "Payload",
        data: [],
        yAxis: 0,
        tooltip: {
          valueDecimals: 0
        }
      },
      {
        name: "Erlang",
        data: [],
        yAxis: 1,
        tooltip: {
          valueDecimals: 0
        }
      }
    ]
  },
  firstStationErlang: {
    name: "CARGANDO..",
    value: 0
  },
  secondStationErlang: {
    name: "CARGANDO...",
    value: 0
  },
  thirdStationErlang: {
    name: "CARGANDO...",
    value: 0
  },
  configTopErlang: {
    chart: {
      type: "bar",
      zoomType: "x",
      //height: 300,
      margin: [80, 60, 60, 150]
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
          type: "all",
          text: "Todo"
        }
      ],
      selected: 1 // all
    },
    legend: {
      enabled: true,
      reversed: true
    },
    scrollbar: {
      enabled: false
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
      enabled: false,
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
      enabled: false,
      series: {
        includeInCSVExport: false
      }
    },
    credits: {
      enabled: false,
      text: "Corporación Digitel, C.A.",
      /* eslint-disable */
      href: 'javascript:window.open("http://www.digitel.com.ve/", "_blank")'
      /* eslint-enable */
    },
    title: {
      text: null
    },
    subtitle: {
      text: "Estaciones Con Mejor Trafico En Voz"
    },
    yAxis: [
      {
        // Primary yAxis
        min: 0,
        gridLineWidth: 1,
        labels: {
          overflow: "justify",
          format: "{value}ERL"
        },
        title: {
          text: "",
          fontWeight: "bold",
          align: "high"
        },
        opposite: true,
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: "bold",
            color: "gray"
          }
        }
      }
    ],
    xAxis: {
      categories: []
    },
    plotOptions: {
      bar: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
          crop: false,
          overflow: "none",
          style: { fontSize: "10px", textShadow: "0px" }
        }
      }
    },
    series: [
      {
        name: "Voz 3G",
        data: [],
        stack: "Voz",
        color: "#8085e9",
        tooltip: {
          valueDecimals: 2
        }
      },
      {
        name: "Voz 2G",
        data: [],
        stack: "Voz",
        color: "#E07E39",
        tooltip: {
          valueDecimals: 2
        }
      }
    ]
  },
  firstStationPayload: {
    name: "CARGANDO...",
    value: 0
  },
  secondStationPayload: {
    name: "CARGANDO...",
    value: 0
  },
  thirdStationPayload: {
    name: "CARGANDO...",
    value: 0
  },
  configTopPayload: {
    chart: {
      type: "bar",
      zoomType: "x",
      //height: 300,
      margin: [80, 60, 60, 150]
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
          type: "all",
          text: "Todo"
        }
      ],
      selected: 1 // all
    },
    legend: {
      enabled: true
    },
    scrollbar: {
      enabled: false,
      reversed: true
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
      enabled: false,
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
      enabled: false,
      series: {
        includeInCSVExport: false
      }
    },
    credits: {
      enabled: false,
      text: "Corporación Digitel, C.A.",
      /* eslint-disable */
      href: 'javascript:window.open("http://www.digitel.com.ve/", "_blank")'
      /* eslint-enable */
    },
    title: {
      text: null
    },
    subtitle: {
      text: "Estaciones Con Mejor Trafico En Datos"
    },
    yAxis: [
      {
        // Primary yAxis
        min: 0,
        gridLineWidth: 1,
        labels: {
          overflow: "justify",
          format: "{value}TB"
        },
        title: {
          text: "",
          fontWeight: "bold",
          align: "high"
        },
        opposite: true,
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: "bold",
            color: "gray"
          }
        }
      }
    ],
    xAxis: {
      categories: []
    },
    plotOptions: {
      bar: {
        stacking: "normal",
        dataLabels: {
          enabled: false,
          crop: false,
          overflow: "none",
          style: { fontSize: "10px", textShadow: "0px" }
        }
      }
    },
    series: [
      {
        name: "Datos 2G",
        data: [],
        stack: "Datos",
        color: "#00D0CB",
        tooltip: {
          valueDecimals: 2
        }
      },
      {
        name: "Datos 3G",
        data: [],
        stack: "Datos",
        color: "#8085e9",
        tooltip: {
          valueDecimals: 2
        }
      },
      {
        name: "Datos 4G",
        data: [],
        stack: "Datos",
        color: "#f45b5b",
        tooltip: {
          valueDecimals: 2
        }
      }
    ]
  },
  alerts: []
};

const reducer = function setStateSidebar(state = initialState, action) {
  switch (action.type) {
    case GET_ALERTS_DASHBOARD_SUCCESS:
      return {
        ...state,
        alerts: action.value
      };
    case SET_DROP_MENU_REGION_SELECTOR:
      return {
        ...state,
        dropMenuShowSelectorRegion: action.value
      };
    case SET_CHANGE_TO_OTHER_VIEW_MTD_KPI:
      return {
        ...state,
        changeToOtherViewMTDKPI: action.value
      };
    case SET_CHANGE_TO_OTHER_VIEW_NEW_STATIONS:
      return {
        ...state,
        changeToOtherViewNewStations: action.value
      };
    case SET_CHANGE_TO_OTHER_VIEW_TOP_ERLANG:
      return {
        ...state,
        changeToOtherViewTopErlang: action.value
      };
    case SET_CHANGE_TO_OTHER_VIEW_TOP_PAYLOAD:
      return {
        ...state,
        changeToOtherViewTopPayload: action.value
      };

    case SET_HOVER_LEAVE_REGION_LOCK:
      return {
        ...state,
        hoverLeaveLock: action.value
      };

    case SET_STATE_HI_MESSAGE:
      return {
        ...state,
        hiMessage: action.value
      };
    case REGION_DASHBOARD_SUCCESS:
      return {
        ...state,
        regions: action.regions
      };
    case SELECTED_DASHBOARD_REGION:
      return {
        ...state,
        selectedRegion: action.region
      };
    case TOP_STATION_ERLANG_SUCCESS:
      return {
        ...state,
        configTopErlang: action.config
      };
    case SET_FIRST_STATION_ERLANG:
      return {
        ...state,
        firstStationErlang: action.firstStationErlang
      };
    case SET_SECOND_STATION_ERLANG:
      return {
        ...state,
        secondStationErlang: action.secondStationErlang
      };
    case SET_THIRD_STATION_ERLANG:
      return {
        ...state,
        thirdStationErlang: action.thirdStationErlang
      };
    case TOP_STATION_PAYLOAD_SUCCESS:
      return {
        ...state,
        configTopPayload: action.config
      };
    case SET_FIRST_STATION_PAYLOAD:
      return {
        ...state,
        firstStationPayload: action.firstStationPayload
      };
    case SET_SECOND_STATION_PAYLOAD:
      return {
        ...state,
        secondStationPayload: action.secondStationPayload
      };
    case SET_THIRD_STATION_PAYLOAD:
      return {
        ...state,
        thirdStationPayload: action.thirdStationPayload
      };
    case SUM_KPI_MONTH_COMP_SUCCESS:
      return {
        ...state,
        configMTDKPIs: action.config
      };
    case SET_ERLANG_SUM_MES_ANTERIOR:
      return {
        ...state,
        erlangMesAnteriorMTD: action.erlangMesAnterior
      };
    case SET_ERLANG_SUM_MES_ACTUAL:
      return {
        ...state,
        erlangMesActualMTD: action.erlangMesActual
      };
    case SET_PAYLOAD_SUM_MES_ANTERIOR:
      return {
        ...state,
        payloadMesAnteriorMTD: action.payloadMesAnterior
      };
    case SET_PAYLOAD_SUM_MES_ACTUAL:
      return {
        ...state,
        payloadMesActualMTD: action.payloadMesActual
      };
    case ERLANG_UNTIL_30_DAYS_SUCCESS:
      return {
        ...state,
        configErlangMTD: action.config
      };
    case PAYLOAD_UNTIL_30_DAYS_SUCCESS:
      return {
        ...state,
        configPayloadMTD: action.config
      };

    case ERLANG_LATEST_12_MONTHS_SUCCESS:
      return {
        ...state,
        configErlangByMonth: action.config
      };
    case PAYLOAD_LATEST_12_MONTHS_SUCCESS:
      return {
        ...state,
        configPayloadByMonth: action.config
      };
    case SET_COMPLETE_FETCH_DATA_ERLANG_MTD:
      return {
        ...state,
        completeFetchDataErlangMTD: action.value
      };
    case SET_COMPLETE_FETCH_DATA_PAYLOAD_MTD:
      return {
        ...state,
        completeFetchDataPayloadMTD: action.value
      };
    case SET_COMPLETE_FETCH_DATA_ERLANG_BY_MONTH:
      return {
        ...state,
        completeFetchDataErlangByMonth: action.value
      };
    case SET_COMPLETE_FETCH_DATA_PAYLOAD_BY_MONTH:
      return {
        ...state,
        completeFetchDataPayloaByMonth: action.value
      };
    default:
      return state;
  }
};

export default reducer;
