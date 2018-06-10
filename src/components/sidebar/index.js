import React, { Component } from "react";
import glamorous, { withTheme } from "glamorous";
import { Scrollbars } from "react-custom-scrollbars";
import FontAwesome from "react-fontawesome";
import { withRouter } from "react-router-dom";
// Importando componentes Nav del sidebar
import DashboadNav from "./components/dashboadNav";
import StatsNav from "./components/statsNav";
import MarketsNav from "./components/marketsNav";
import StatesNav from "./components/statesNav";
import ClustersNav from "./components/clustersNav";
//import GroupsNav from './components/groupsNav'
//import ReportsNav from './components/reportsNav'

import LinksSidebar from "./components/linksSidebar";
import { connect } from "react-redux";
import { unsetClientResquest } from "../client/actions";
//Importando elemento generico para las subcategorias de las Navs
import GenericElementNav from "./components/genericElementNav";
import GenericLinkSidebar from "./components/genericLinkSidebar";
import {
  setThemeDark,
  setThemeWhite,
  setThemeBluedark
} from "../uiThemes/actions";
const { Div, A } = glamorous;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.renderThumb = this.renderThumb.bind(this);
  }

  renderThumb() {
    return (
      <div
        style={{
          backgroundColor: this.props.theme.fontColor,
          width: "1em"
        }}
      />
    );
  }

  render() {
    let { navShow } = this.props;
    return (
      <Div
        css={{
          width: "16.9em",
          minWidth: "16.9em",
          height: "93.7vh",
          maxHeight: "93.7vh",
          background: this.props.theme.secondaryLevelBgColor,
          color: this.props.theme.fontColor
        }}
        onClick={() => {
          this.props.hideAllMenusOutside();
        }}
      >
        <Scrollbars
          style={{
            width: "16.9em",
            minWidth: "16.9em",
            height: "93.7vh",
            maxHeight: "93.7vh",
            background: navShow
              ? this.props.theme.secondaryLevelBgColor
              : this.props.theme.primaryLevelBgColor,
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
          <Div
            css={{
              display: "flex",
              flexDirection: "column",
              marginTop: "15px"
            }}
          >
            <DashboadNav />
            <StatsNav>
              <GenericElementNav name="CCR / PCR" route="/statitics/ccrpcr" />
              <GenericElementNav
                name="Drop Call / CSF / HOF"
                route="/statitics/dropcallcsfhof"
                disableColor={true}
              />
              <GenericElementNav name="Payload" route="/statitics/payload" />
              <GenericElementNav
                name="Tráfico de voz"
                route="/statitics/erlang"
                disableColor={false}
              />
              <GenericElementNav
                name="Throughput"
                route="/statitics/throughput"
                disableColor={false}
              />
              <GenericElementNav
                name="Usuarios"
                route="/statitics/users"
                disableColor={false}
              />
            </StatsNav>
            <StatesNav disableColor={true} />
            <ClustersNav disableColor={true} />
            <MarketsNav disableColor={true} />
            {/*<GroupsNav />*/}
            {/*<ReportsNav />*/}
          </Div>
        </Scrollbars>
        <Div
          css={{
            width: "16.9em",
            height: "1.6em",
            background: navShow
              ? this.props.theme.tertiaryLevelBgColor
              : this.props.theme.primaryLevelBgColor,
            position: "absolute",
            bottom: "0",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <LinksSidebar>
            {/*<GenericLinkSidebar name="Atajos" route="/shortcuts" />*/}
            <GenericLinkSidebar name="Estado del servidor" route="/status" />
            <Div
              css={{
                paddingLeft: "3em",
                fontSize: "12px",
                fontFamily: "Arial,Helvetica,sans-serif",
                lineHeight: "27px",
                ":hover": {
                  cursor: "pointer",
                  background: this.props.theme.selectedLinkColorHover
                }
              }}
            >
              <A
                css={{
                  color: this.props.theme.fontColorLow,
                  textDecoration: "none"
                }}
                href="mailto:RFOriente-Guayana@digitel.com.ve"
              >
                Soporte
              </A>
            </Div>
            <Div
              css={{
                ":hover": {
                  background: this.props.theme.selectedLinkColorHover,
                  cursor: "pointer"
                }
              }}
              onClick={this.props.unsetClientResquest}
            >
              <Div
                style={{
                  paddingLeft: "3em",
                  color: this.props.theme.fontColorLow,
                  fontSize: "12px",
                  fontFamily: "Arial,Helvetica,sans-serif",
                  lineHeight: "27px"
                }}
              >
                Salir
              </Div>
            </Div>
          </LinksSidebar>
          {this.props.navShow ? (
            <Div
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "1.6em",
                minWidth: "1.6em",
                height: "1.6em",
                ":hover": {
                  background: this.props.theme.selectedLinkColorHover,
                  cursor: "pointer"
                }
              }}
            >
              <FontAwesome
                name="moon-o"
                style={{
                  textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                  color: this.props.theme.fontColor
                }}
                onClick={this.props.setThemeDark}
                data-tip="Tema oscuro"
                data-place="top"
                data-type="dark"
                data-effect="solid"
                data-border={true}
              />
            </Div>
          ) : null}
          {this.props.navShow ? (
            <Div
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "1em",
                marginRight: "1em",
                width: "1.6em",
                minWidth: "1.6em",
                height: "1.6em",
                ":hover": {
                  background: this.props.theme.secondaryLevelBgColor,
                  cursor: "pointer"
                }
              }}
            >
              <FontAwesome
                name="skyatlas"
                style={{
                  textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                  color: this.props.theme.fontColor
                }}
                onClick={this.props.setThemeBluedark}
                data-tip="Tema de alto contraste"
                data-place="top"
                data-type="dark"
                data-effect="solid"
                data-border={true}
              />
            </Div>
          ) : null}

          {this.props.navShow ? (
            <Div
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "1em",
                width: "1.6em",
                minWidth: "1.6em",
                height: "1.6em",
                ":hover": {
                  background: this.props.theme.secondaryLevelBgColor,
                  cursor: "pointer"
                }
              }}
              v
            >
              <FontAwesome
                name="sun-o"
                style={{
                  textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                  color: this.props.theme.fontColor
                }}
                onClick={this.props.setThemeWhite}
                data-tip="Tema claro"
                data-place="top"
                data-type="dark"
                data-effect="solid"
                data-border={true}
              />
            </Div>
          ) : null}
        </Div>
      </Div>
    );
  }
}

const mapStateToProps = state => {
  return {
    navShow: state.toolbar.nav_show
  };
};

const SidebarConected = connect(mapStateToProps, {
  unsetClientResquest,
  setThemeDark,
  setThemeWhite,
  setThemeBluedark
})(Sidebar);

export default withTheme(withRouter(SidebarConected));
