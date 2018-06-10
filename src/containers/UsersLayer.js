// Contenedor encargado de la gestion de los usuarios
import React, { Component } from "react";
import glamorous, { withTheme } from "glamorous";
import UsersControl from "../components/usersControl";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";

const { Div } = glamorous;

class UsersLayer extends Component {
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
          background: this.props.theme.secondaryLevelBgColor,
          color: this.props.theme.fontColor
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
        {this.props.user.USER_LEVEL === 0 ||
        this.props.user.USER_LEVEL === 1 ? (
          <Div>
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
                USUARIOS
              </Div>
            </Div>
            <UsersControl />
          </Div>
        ) : (
          <Div>
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
                USUARIOS
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
                color: this.props.theme.tertiaryLevelBgColor,
                textShadow: "0px -1px 0px rgba(23,23,23,0.5)"
              }}
            >
              NO ESTAS AUTORIZADO PARA MODERAR
            </Div>
          </Div>
        )}
      </Scrollbars>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.client.user
  };
};

const UsersLayerConected = connect(mapStateToProps, {})(withTheme(UsersLayer));

export default UsersLayerConected;
