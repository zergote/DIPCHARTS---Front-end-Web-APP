// Pagina de Error, esta pagina no se esta utilizando pero se
// prevee utilizarla en una configuración a futuro.
import React, { Component } from "react";
import glamorous from "glamorous";
//import { withRouter } from 'react-router-dom'
import { Scrollbars } from "react-custom-scrollbars";
const { H1 } = glamorous;

class Error404Layer extends Component {
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
        <H1
          css={{
            margin: "0.1em 0 0.1em 0.3em",
            fontFamily: '"Raleway", Arial, sans-serif'
          }}
        >
          Error 404
        </H1>
        <h3>
          No se encuentra <code>{this.props.location.pathname}</code>
        </h3>
      </Scrollbars>
    );
  }
}

//export default withRouter(Error404Layer)
export default Error404Layer;
