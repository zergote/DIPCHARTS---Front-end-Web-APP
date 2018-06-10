import React, { Component } from "react";
import glamorous, { withTheme } from "glamorous";
import Modal from "react-modal";
import { connect } from "react-redux";
import { setModalOpenState, statisticsRequest } from "./actions";
import Highstock from "./components/highstock/";
import moment from "moment";
require("moment/locale/es.js");
moment.locale("es");

const { Div, Span, Button } = glamorous;

class MoreAlertDetails extends Component {
  constructor() {
    super();
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.customStyles = this.customStyles.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  customStyles() {
    return {
      content: {
        width: "80%",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: this.props.theme.primaryLevelBgColor,
        border: `1px solid ${this.props.theme.tertiaryLevelBgColor}`
      },
      overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: 3
      }
    };
  }
  afterOpenModal() {
    let KPISELECTED = this.props.KPISELECTED;
    let ACTUALCONFIG = this.props.ACTUALCONFIG;
    let THEME = this.props.THEME;
    let IDSERVICE = this.props.IDSERVICE;
    let SINCETHEDATE = this.props.SINCETHEDATE;
    let UNTILTHEDATE = this.props.UNTILTHEDATE;
    let STATION = this.props.STATION;
    let KPIVALUE = this.props.KPIVALUE;

    if (this.props.IDREGION !== null) {
      this.props.statisticsRequest({
        KPISELECTED,
        ACTUALCONFIG,
        THEME,
        IDSERVICE,
        SINCETHEDATE,
        UNTILTHEDATE,
        STATION,
        KPIVALUE
      });
    }
  }

  closeModal() {
    this.props.setModalOpenState(false);
  }

  formatDate(value) {
    return moment(value, "YYYYMMDD").format("DD/MM/YYYY");
  }

  chartViewRender(value) {
    return (
      <Div>
        {value ? (
          <Highstock
            config={this.props.config}
            completeFetchData={this.props.completeFetchData}
            theme={this.props.themeChart}
          />
        ) : null}
      </Div>
    );
  }

  render() {
    return (
      <Modal
        isOpen={this.props.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={this.customStyles()}
        contentLabel="Alert Details"
        ariaHideApp={false}
      >
        <Div>
          <Div
            css={{
              textAlign: "center",
              marginTop: "-.7em",
              marginBottom: ".1em",
              color: this.props.theme.fontColor,
              fontFamily: '"Roboto Condensed", sans-serif',
              fontSize: "22px",
              fontWeight: "bold"
            }}
          >
            {this.props.titleDetails}
          </Div>
          <Div
            css={{
              height: "1em",
              width: "100%",
              background: "white",
              borderRadius: "5px 5px 0px 0px"
            }}
          />
          {this.chartViewRender(this.props.chartView)}
        </Div>
        <Div
          css={{
            background: "white"
          }}
        >
          <Div
            css={{
              background: "white",
              margin: "0em 1em 0em 1em"
            }}
          >
            <Span
              css={{
                color: "#262626",
                fontWeight: "bold",
                fontSize: "15px",
                fontFamily: "'Dosis', sans-serif"
              }}
            >
              Estación:{" "}
            </Span>{" "}
            <Span
              css={{
                color: "#262626",
                fontSize: "15px",
                fontFamily: "'Dosis', sans-serif"
              }}
            >
              {this.props.element_name}
            </Span>
            <br />
            <Span
              css={{
                color: "#262626",
                fontWeight: "bold",
                fontSize: "15px",
                fontFamily: "'Dosis', sans-serif"
              }}
            >
              Falla:{" "}
            </Span>{" "}
            <Span
              css={{
                color: "#262626",
                fontSize: "15px",
                fontFamily: "'Dosis', sans-serif"
              }}
            >
              {" "}
              {this.props.title}
            </Span>
            <br />
            <Span
              css={{
                color: "#262626",
                fontWeight: "bold",
                fontSize: "15px",
                fontFamily: "'Dosis', sans-serif"
              }}
            >
              Descripción:{" "}
            </Span>{" "}
            <Span
              css={{
                color: "#262626",
                fontSize: "15px",
                fontFamily: "'Dosis', sans-serif"
              }}
            >
              {this.props.body}
            </Span>
            <br />
            <Span
              css={{
                color: "#262626",
                fontWeight: "bold",
                fontSize: "15px",
                fontFamily: "'Dosis', sans-serif"
              }}
            >
              Fecha de ultima revisión:{" "}
            </Span>{" "}
            <Span
              css={{
                color: "#262626",
                fontSize: "15px",
                fontFamily: "'Dosis', sans-serif"
              }}
            >
              {this.formatDate(this.props.end_date)}
            </Span>{" "}
            <Span
              css={{
                color: "#262626",
                fontWeight: "bold",
                fontSize: "15px",
                fontFamily: "'Dosis', sans-serif"
              }}
            >
              Hora:{" "}
            </Span>{" "}
            <Span
              css={{
                color: "#262626",
                fontSize: "15px",
                fontFamily: "'Dosis', sans-serif"
              }}
            >
              {this.props.end_hour}
            </Span>
            <br />
            <Span
              css={{
                color: "#262626",
                fontWeight: "bold",
                fontSize: "15px",
                fontFamily: "'Dosis', sans-serif"
              }}
            >
              Valor del KPI afectado:{" "}
            </Span>{" "}
            <Span
              css={{
                color: "#262626",
                fontSize: "15px",
                fontFamily: "'Dosis', sans-serif"
              }}
            >
              {this.props.KPIVALUE}
            </Span>
          </Div>
        </Div>
        <Div
          css={{
            display: "flex",
            flexDirection: "row-reverse",
            width: "100%",
            background: "white",
            borderRadius: "0px 0px 5px 5px"
          }}
        >
          <Button
            css={{
              position: "relative",
              verticalAlign: "top",
              minWidth: "8em",
              height: "2em",
              paddingLeft: "1em",
              paddingRight: "1em",
              fontSize: "13px",
              fontWeight: "bold",
              color: "#CCCCCC",
              textAlign: "center",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.25)",
              background: "#333333",
              border: 0,
              borderRadius: "0px 0px 5px 0px",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "#395182"
              }
            }}
            onClick={this.closeModal}
          >
            Cerrar
          </Button>
        </Div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    modalIsOpen: state.moreAlertDetails.modalIsOpen,
    config: state.moreAlertDetails.config,
    completeFetchData: state.moreAlertDetails.completeFetchData,
    themeChart: state.moreAlertDetails.theme,
    titleDetails: state.moreAlertDetails.titleDetails,
    chartView: state.moreAlertDetails.alertData.chartView,
    title: state.moreAlertDetails.alertData.title,
    element_name: state.moreAlertDetails.alertData.element_name,
    body: state.moreAlertDetails.alertData.body,
    start_date: state.moreAlertDetails.alertData.start_date,
    start_hour: state.moreAlertDetails.alertData.start_hour,
    end_hour: state.moreAlertDetails.alertData.end_hour,
    end_date: state.moreAlertDetails.alertData.end_date,
    KPISELECTED: state.moreAlertDetails.alertData.kpi,
    ACTUALCONFIG: state.moreAlertDetails.config,
    IDSERVICE: state.moreAlertDetails.alertData.id_service,
    SINCETHEDATE: state.moreAlertDetails.alertData.start_date,
    UNTILTHEDATE: state.moreAlertDetails.alertData.end_date,
    STATION: state.moreAlertDetails.alertData.element_name,
    KPIVALUE: state.moreAlertDetails.alertData.kpiValue,
    THEME: state.moreAlertDetails.theme
  };
};

const MoreAlertDetailsConected = connect(mapStateToProps, {
  setModalOpenState,
  statisticsRequest
})(withTheme(MoreAlertDetails));

export default MoreAlertDetailsConected;
