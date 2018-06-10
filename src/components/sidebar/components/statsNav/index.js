import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import glamorous, { withTheme } from "glamorous";
import { connect } from "react-redux";
import { setShrink, setExpand } from "./actions";
import FontAwesome from "react-fontawesome";

const { Div } = glamorous;

class StatsNav extends Component {
  constructor(props) {
    super(props);
    this.handleFolding = this.handleFolding.bind(this);
    this.handleSetRoute = this.handleSetRoute.bind(this);
  }

  handleFolding() {
    if (this.props.folding === true) {
      this.props.setExpand();
    } else {
      this.props.setShrink();
    }
  }

  handleSetRoute() {
    this.props.history.push("/statitics");
  }

  render() {
    const { folding, children } = this.props;
    return (
      <Div
        css={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Div
          css={{
            display: "flex"
          }}
        >
          {folding ? (
            <Div
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "1.6em",
                minWidth: "0.2em",
                flexGrow: "0.93",
                cursor: "pointer",
                ":hover": {
                  background: this.props.theme.selectedLinkColorHover
                }
              }}
              onClick={this.handleFolding}
            >
              <FontAwesome
                name="angle-right"
                size="lg"
                style={{
                  textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                  color: this.props.theme.fontColor
                }}
              />
            </Div>
          ) : (
            <Div
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "1.6em",
                minWidth: "0.2em",
                flexGrow: "0.63",
                cursor: "pointer",
                ":hover": {
                  background: this.props.theme.selectedLinkColorHover
                }
              }}
              onClick={this.handleFolding}
            >
              <FontAwesome
                name="angle-down"
                size="lg"
                style={{
                  textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                  color: this.props.theme.fontColor
                }}
              />
            </Div>
          )}

          {this.props.history.location.pathname === "/statitics" ? (
            <Div
              css={{
                background: this.props.theme.fontColor,
                height: "1.6em",
                width: "0.2em"
              }}
            />
          ) : null}

          <Div
            css={{
              flexGrow: "5.4"
            }}
          >
            {/* Se Cambio handleSetRoute para simplemente abrir o cerrar la sección de estatdisticas por handleFolding */}

            <Div
              css={{
                ":hover": {
                  background: this.props.theme.selectedLinkColorHover,
                  cursor: "pointer"
                }
              }}
              onClick={this.handleFolding}
            >
              {/* Se cambio el Navlink por un Div
                <NavLink
                exact
                to="/statitics"
                style={{
                  paddingLeft:
                    this.props.history.location.pathname === '/statitics'
                      ? '0.47em'
                      : '0.8em',
                  fontWeight: 'bold',
                  color: '#9E9E9E',
                  fontSize: '12px',
                  fontFamily: 'Arial,Helvetica,sans-serif',
                  lineHeight: '27px'
                }}
                activeStyle={{
                  display: 'block',
                  background: '#171717',
                  lineHeight: '27px',
                  color: '#CCCCCC'
                }}
              >
                Stats de los servicios
              </NavLink>*/}
              <Div
                style={{
                  paddingLeft:
                    this.props.history.location.pathname === "/statitics"
                      ? "0.47em"
                      : "0.8em",
                  fontWeight: "bold",
                  color: this.props.theme.fontColor,
                  fontSize: "12px",
                  fontFamily: "Arial,Helvetica,sans-serif",
                  lineHeight: "27px"
                }}
              >
                Stats de los servicios
              </Div>
            </Div>
          </Div>
        </Div>
        {folding ? null : children}
      </Div>
    );
  }
}

const mapStateToProps = state => {
  return {
    folding: state.statsNav.statitics_shrink
  };
};

const StatsNavConected = connect(mapStateToProps, { setShrink, setExpand })(
  StatsNav
);

export default withTheme(withRouter(StatsNavConected));
