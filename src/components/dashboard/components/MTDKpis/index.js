import React, { Component } from "react";
import glamorous, { withTheme } from "glamorous";
import FontAwesome from "react-fontawesome";
import ReactHighcharts from "react-highcharts";

const { Div } = glamorous;

class MTDKpis extends Component {
  constructor(props) {
    super(props);
    this.renderPayloadMTD = this.renderPayloadMTD.bind(this);
    this.renderErlangMTD = this.renderErlangMTD.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }

  handleMouseEnter() {
    this.props.setChangeToOtherViewTopErlang(false);
    this.props.setChangeToOtherViewMTDKPI(true);
    this.props.setChangeToOtherViewTopPayload(false);
  }
  handleMouseLeave() {
    this.props.setChangeToOtherViewMTDKPI(false);
  }

  renderChart(tconfig) {
    return <ReactHighcharts config={tconfig} />;
  }

  renderPayloadMTD() {
    let payloadMesActualMTD = this.props.payloadMesActualMTD;
    let payloadMesAnteriorMTD = this.props.payloadMesAnteriorMTD;
    //Obteniendo porcentajes
    if (payloadMesAnteriorMTD > payloadMesActualMTD) {
      let p1 = payloadMesActualMTD * 100;
      let p2 = p1 / payloadMesAnteriorMTD;
      let resultadoEnPorcentaje = 100 - p2;
      return (
        <Div
          css={{
            display: "flex",
            flexDirection: "row",
            margin: "-.4em 0em 0em 0em"
          }}
        >
          <FontAwesome
            name="caret-down"
            size="3x"
            style={{
              margin: "-.2em 0em 0em 0em",
              paddingLeft: "0.3em",
              color: this.props.theme.fontColorTop,
              textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
              maxWidth: "50%"
            }}
          />
          <Div
            css={{
              margin: ".8em 0em 2em 0em",
              paddingLeft: "0.9em",
              fontSize: "13px",
              color: this.props.theme.fontColorTop
            }}
          >
            DECREMENTO DE PAYLOAD EN {resultadoEnPorcentaje.toFixed(2)}%
          </Div>
        </Div>
      );
    } else {
      let p1 = payloadMesActualMTD * 100;
      let p2 = p1 / payloadMesAnteriorMTD;
      let resultadoEnPorcentaje = p2 - 100;
      return (
        <Div
          css={{
            display: "flex",
            flexDirection: "row",
            margin: "-.4em 0em 0em 0em"
          }}
        >
          <FontAwesome
            name="caret-up"
            size="3x"
            style={{
              margin: "-.2em 0em 0em 0em",
              paddingLeft: "0.3em",
              color: this.props.theme.fontColorTop,
              textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
              maxWidth: "50%"
            }}
          />
          <Div
            css={{
              margin: ".8em 0em 2em 0em",
              paddingLeft: "0.9em",
              fontSize: "13px",
              color: this.props.theme.fontColorTop
            }}
          >
            INCREMENTO DE PAYLOAD EN {resultadoEnPorcentaje.toFixed(2)}%
          </Div>
        </Div>
      );
    }
  }

  renderErlangMTD() {
    let erlangMesActualMTD = this.props.erlangMesActualMTD;
    let erlangMesAnteriorMTD = this.props.erlangMesAnteriorMTD;
    //Obteniendo porcentajes
    if (erlangMesAnteriorMTD > erlangMesActualMTD) {
      let p1 = erlangMesActualMTD * 100;
      let p2 = p1 / erlangMesAnteriorMTD;
      let resultadoEnPorcentaje = 100 - p2;
      return (
        <Div
          css={{
            display: "flex",
            flexDirection: "row",
            margin: "0.5em 0em 0em 0em"
          }}
        >
          <FontAwesome
            name="caret-down"
            size="3x"
            style={{
              color: this.props.theme.fontColorTop,
              margin: ".3em 0em 0em 0em",
              paddingLeft: "0.3em",
              textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
              maxWidth: "50%"
            }}
          />
          <Div
            css={{
              margin: "2.5em 0em 2em 0em",
              paddingLeft: "0.9em",
              fontSize: "13px",
              color: this.props.theme.fontColorTop
            }}
          >
            DECREMENTO DE ERLANG EN {resultadoEnPorcentaje.toFixed(2)}%
          </Div>
        </Div>
      );
    } else {
      let p1 = erlangMesActualMTD * 100;
      let p2 = p1 / erlangMesAnteriorMTD;
      let resultadoEnPorcentaje = p2 - 100;
      return (
        <Div
          css={{
            display: "flex",
            flexDirection: "row",
            margin: "0.5em 0em 0em 0em"
          }}
        >
          <FontAwesome
            name="caret-up"
            size="3x"
            style={{
              color: this.props.theme.fontColorTop,
              margin: ".3em 0em 0em 0em",
              paddingLeft: "0.3em",
              textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
              maxWidth: "50%"
            }}
          />
          <Div
            css={{
              margin: "2.5em 0em 2em 0em",
              paddingLeft: "0.9em",
              fontSize: "13px",
              color: this.props.theme.fontColorTop
            }}
          >
            INCREMENTO DE ERLANG EN {resultadoEnPorcentaje.toFixed(2)}%
          </Div>
        </Div>
      );
    }
  }

  render() {
    let changeToOtherViewMTDKPI = this.props.changeToOtherViewMTDKPI;

    return (
      <Div onClick={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <Div
          css={{
            margin: "0.5em 0em 0em 0em",
            paddingTop: "0.2em",
            background: this.props.theme.headerTop,
            height: "1.3em",
            textAlign: "center",
            boxShadow: "0px 1px 9px 1px rgba(0,0,0,0.75)",
            cursor: "pointer",
            fontSize: "12.5px"
          }}
        >
          COMPARAR ESTE MES RESPECTO AL ANTERIOR
        </Div>
        {changeToOtherViewMTDKPI ? (
          <Div
            css={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: this.props.theme.border
            }}
          >
            {this.renderChart(this.props.configMTDKPIs)}
          </Div>
        ) : (
          <Div
            css={{
              margin: "-0.5em 0em 0em 0em",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <Div>
              {this.renderErlangMTD()}
              {this.renderPayloadMTD()}
            </Div>
          </Div>
        )}
      </Div>
    );
  }
}

export default withTheme(MTDKpis);
