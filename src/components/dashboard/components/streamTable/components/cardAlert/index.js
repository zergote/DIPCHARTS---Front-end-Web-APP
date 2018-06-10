import React, { Component } from "react";
import glamorous, { withTheme } from "glamorous";
import FontAwesome from "react-fontawesome";
import moment from "moment";
require("moment/locale/es.js");
moment.locale("es");

moment.fn.fromNowOrNow = function(a) {
  if (Math.abs(moment().diff(this)) < 25000) {
    // 25000 milliseconds
    return "justo ahora";
  }
  return this.fromNow(a);
};

const { Div } = glamorous;
class CardAlert extends Component {
  constructor(props) {
    super(props);
    this.typeColor = this.typeColor.bind(this);
    this.typeIcon = this.typeIcon.bind(this);
    this.alertState = this.alertState.bind(this);
    this.handleMoreDetails = this.handleMoreDetails.bind(this);
    this.dateToString = this.dateToString.bind(this);
    this.agoMoment = this.agoMoment.bind(this);
  }

  handleMoreDetails() {
    this.props.setAlertData(this.props.alertData);
    this.props.setModalOpenState(true);
  }

  typeColor(value) {
    switch (value) {
      case 0:
        return "#2ECC40";
      case 1:
        return "#39CCCC";
      case 2:
        return "#FFDC00";
      case 3:
        return "#FF4136";
      default:
        break;
    }
  }

  typeIcon(value) {
    switch (value) {
      case 0:
        return (
          <FontAwesome
            name="check"
            size="2x"
            style={{
              color: this.props.theme.cardAlertFontColor,
              margin: "0.49em 0.4em 0em 0.4em",
              textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
              cursor: "pointer"
            }}
          />
        );
      case 1:
        return (
          <FontAwesome
            name="bullhorn"
            size="2x"
            style={{
              color: this.props.theme.cardAlertFontColor,
              margin: "0.49em 0.4em 0em 0.4em",
              textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
              cursor: "pointer"
            }}
          />
        );
      case 2:
        return (
          <FontAwesome
            name="exclamation"
            size="2x"
            style={{
              color: this.props.theme.cardAlertFontColor,
              margin: "0.49em .7em 0em 0.7em",
              textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
              cursor: "pointer"
            }}
          />
        );
      case 3:
        return (
          <FontAwesome
            name="fire"
            size="2x"
            style={{
              color: this.props.theme.cardAlertFontColor,
              margin: "0.49em 0.5em 0em 0.5em",
              textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
              cursor: "pointer"
            }}
          />
        );
      default:
        break;
    }
  }

  alertState(value) {
    switch (value) {
      case false:
        return (
          <FontAwesome
            name="eye"
            style={{
              textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
              cursor: "pointer"
            }}
          />
        );
      case true:
        return (
          <FontAwesome
            name="eye-slash"
            style={{
              textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
              cursor: "pointer"
            }}
          />
        );
      default:
        break;
    }
  }

  dateToString(date) {
    return moment(date, "YYYYMMDD").format("DD MMMM YYYY");
  }

  agoMoment(date) {
    return moment(date, "YYYYMMDD").fromNowOrNow();
  }
  render() {
    return (
      <Div
        css={{
          margin: ".6em 0em .5em .4em",
          height: "5.2em",
          width: "95%",
          backgroundColor: this.props.theme.cardAlert,
          borderRadius: "1px",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
        }}
      >
        <Div
          css={{
            margin: "0em 0em 0em 0em",
            height: ".7em",
            width: "1em",
            backgroundColor: this.typeColor(this.props.type),
            borderRadius: "1px 0px 4px 0px",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
          }}
        />

        <Div
          css={{
            margin: "-.7em 0em 0em 15em",
            fontFamily: "'Dosis', sans-serif",
            fontSize: "10px",
            color: this.props.theme.cardAlertFontColor,
            fontWeight: "300"
          }}
        >
          {"Notificado " + this.agoMoment(this.props.start_date)}
        </Div>
        <Div
          css={{
            display: "flex",
            flexDirection: "row",
            margin: "-.2em 0em 0em .1em"
          }}
        >
          {this.typeIcon(this.props.type)}
          <Div
            css={{
              fontFamily: "'Dosis', sans-serif",
              //fontWeight: 'bold',
              color: this.props.theme.cardAlertFontColor,
              fontSize: "12px",
              textAlign: "left",
              margin: ".7em 0em 0em .1em",
              letterSpacing: ".5px",
              cursor: "pointer",
              ":hover": {
                textDecoration: "underline"
              }
            }}
            onClick={this.handleMoreDetails}
          >
            Estación: {this.props.element_name} <br />
            Ocurrencia: {this.props.title} <br />
            Ultima revisión: {this.dateToString(this.props.end_date)} <br />
          </Div>
        </Div>
      </Div>
    );
  }
}

export default withTheme(CardAlert);
