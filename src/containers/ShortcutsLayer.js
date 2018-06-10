// Pagina que muestra como acceder a diferentes sitios de la aplicación con
// atajos del teclado
// Esta caracteristica no se implementará en la primera versión de la aplicación.

import React, { Component } from "react";
import glamorous from "glamorous";
import { Scrollbars } from "react-custom-scrollbars";
const { Div } = glamorous;
const Kbd = glamorous.div({
  fontSize: "12px",
  display: "inline",
  backgroundColor: "#999",
  border: "1px solid #666",
  boxShadow: "0 1px 0 rgba(0,0,0,.2), 0 0 0 2px #777 inset",
  color: "#171717",
  textShadow: "0 1px 0 #999",
  borderRadius: "3px",
  width: "24px",
  height: "24px",
  padding: ".2em .6em",
  textAlign: "center",
  lineHeight: "20px"
});

class ShortcutsLayer extends Component {
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
            LISTADO DE AJAJOS
          </Div>
        </Div>
        <Div
          css={{
            margin: "4em"
          }}
        >
          <table>
            <tbody>
              <tr>
                <td>Ver Dashboard</td>
                <td>
                  <Kbd>d</Kbd>
                </td>
              </tr>
              <tr>
                <td> Ver Estadisticas</td>
                <td>
                  <Kbd>e</Kbd>
                </td>
              </tr>
              <tr>
                <td>Ver Estados</td>
                <td>
                  <Kbd>Ctrl</Kbd>+<Kbd>e</Kbd>
                </td>
              </tr>
              <tr>
                <td>Ver Clusters</td>
                <td>
                  <Kbd>Ctrl</Kbd>+<Kbd>c</Kbd>
                </td>
              </tr>
              <tr>
                <td>Ver Mercados</td>
                <td>
                  <Kbd>Ctrl</Kbd>+<Kbd>m</Kbd>
                </td>
              </tr>
              <tr>
                <td>Alertas</td>
                <td>
                  <Kbd>a</Kbd>
                </td>
              </tr>
              <tr>
                <td>Actualizar</td>
                <td>
                  <Kbd>u</Kbd>
                </td>
              </tr>
              <tr>
                <td>Salir</td>
                <td>
                  <Kbd>q</Kbd>
                </td>
              </tr>
            </tbody>
          </table>
        </Div>
      </Scrollbars>
    );
  }
}

export default ShortcutsLayer;
