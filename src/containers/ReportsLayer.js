// Contenedor de agrupaciones
// Este modulo no se desarrollara para la primera en la entrega
// del proyecto.

import React, { Component } from "react";
import glamorous from "glamorous";
import { Scrollbars } from "react-custom-scrollbars";
const { Div } = glamorous;

class ReportsLayer extends Component {
  constructor(props) {
    super(props);
    this.renderThumb = this.renderThumb.bind(this);
  }

  renderThumb() {
    return (
      <div
        style={{
          backgroundColor: "#B6B6B6",
          width: "1em"
        }}
      />
    );
  }

  render() {
    return (
      <Scrollbars
        style={{
          width: "100%",
          minWidth: "60em",
          height: "93.7vh",
          background: "#262626",
          color: "#B6B6B6"
        }}
        renderThumbHorizontal={this.renderThumb}
        renderThumbVertical={this.renderThumb}
        onUpdate={this.handleUpdate}
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}
      >
        <Div
          css={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Div
            css={{
              margin: "1em 0 0.1em 0.3em",
              //fontFamily: '"Raleway", Arial, sans-serif',
              fontFamily: '"Roboto Condensed", sans-serif',
              fontSize: "22px",
              fontWeight: "bold"
            }}
          >
            REPORTES
          </Div>
        </Div>
        <Div
          css={{
            width: "100%",
            height: "40%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        />
        <Div
          css={{
            lineHeight: "60px",
            fontSize: "50px",
            fontWeight: "bold",
            textAlign: "center",
            marginLeft: "30px",
            fontFamily: '"Raleway", Arial, sans-serif',
            color: "#333333",
            textShadow: "0px -1px 0px rgba(23,23,23,0.5)"
          }}
        >
          NO SE HAN GENERADO REPORTES
        </Div>
      </Scrollbars>
    );
  }
}

export default ReportsLayer;
