// Esta pagina muestra en tiempo real estadisticas de comportamiento del la API (express.js)
import React, { Component } from "react";
import glamorous from "glamorous";
import { Scrollbars } from "react-custom-scrollbars";
import Iframe from "react-iframe";
const { Div } = glamorous;

class StatusLayer extends Component {
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
          background: "#ffffff",
          color: "#262626"
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
            ESTADO DEL SERVIDOR
          </Div>
        </Div>

        <Iframe
          url="http://10.193.235.130:3000/api/status"
          width="100%"
          height="100%"
          display="initial"
          position="relative"
          allowFullScreen
        />
      </Scrollbars>
    );
  }
}

export default StatusLayer;
