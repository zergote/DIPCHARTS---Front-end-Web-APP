import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  setSelectedGroup,
  setSetStateGroupMenu,
  regionRequest,
} from '../../actions'
import {
  setClosedMenuNotifications,
  setClosedMenuAlerts,
  setClosedMenuSettings,
  setClosedMenuUser,
} from '../../../../toolbar/actions'
const { Div } = glamorous

class ContextualMenu extends Component {
  constructor(props) {
    super(props)
    this.handleMenuOpen = this.handleMenuOpen.bind(this)
    this.handleSetGroupOption = this.handleSetGroupOption.bind(this)
    this.handleMenuClose = this.handleMenuClose.bind(this)
    this.mouseEnter = this.mouseEnter.bind(this)
  }

  mouseEnter() {
    if (
      this.props.menu_settings ||
      this.props.menu_user ||
      this.props.menu_notification ||
      this.props.menu_alert
    ) {
      this.handleMenuOpen()
      this.props.actions.setClosedMenuNotifications()
      this.props.actions.setClosedMenuAlerts()
      this.props.actions.setClosedMenuSettings()
      this.props.actions.setClosedMenuUser()
    }
  }

  handleMenuOpen() {
    this.props.actions.setSetStateGroupMenu(true)
  }

  handleMenuClose() {
    this.props.actions.setSetStateGroupMenu(false)
  }

  handleSetGroupOption(value) {
    if (this.props.stateGroupOption) {
      this.handleMenuClose()
      this.props.actions.setSelectedGroup(value)
      this.props.actions.regionRequest(this.props.selectedRegion, value.ID)
    }
  }

  render() {
    return (
      <Div
        css={{
          display: 'flow-root',
          position: 'absolute',
          top: '0em',
          left: this.props.userLevel === 2 ? '61.5em' : '57.5em',
          zIndex: 2,
          '@media(min-width: 1280px)': {
            left: this.props.userLevel === 2 ? '64.5em' : '60.5em',
          },
          '@media(min-width: 1360px)': {
            left: this.props.userLevel === 2 ? '67.5em' : '63.5em',
          },
        }}
      >
        {this.props.stateGroupOption ? (
          <Div>
            <Div
              css={{
                display: 'flex',
                margin: '0em 0 0 2em',
                background: this.props.theme.tertiaryLevelBgColor,
                height: '2.5em',
                width: '11em',
                minWidth: '10.2em',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'flex-end',
                ':hover': {
                  background: this.props.theme.secondaryLevelBgColor,
                  cursor: 'pointer',
                },
              }}
              onClick={this.handleMenuOpen}
            >
              <Div
                css={{
                  fontSize: '13px',
                  fontFamily: 'Arial',
                  color: this.props.theme.fontColor,
                  paddingRight: '.4em',
                  textAlign: 'center',
                }}
              >
                Agrupado por {this.props.selectedGroup.GROUP}
              </Div>
              <Div
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 0.2em 0 0.2em',
                  height: '100%',
                  cursor: 'pointer',
                  ':hover': {
                    background: this.props.theme.primaryLevelBgColor,
                  },
                }}
              >
                <FontAwesome
                  name="angle-down"
                  size="lg"
                  style={{
                    textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                    color: this.props.theme.fontColor,
                  }}
                />
              </Div>
            </Div>
            <Div
              css={{
                width: '0',
                height: '0',
                marginLeft: '11.4em',
                position: 'relative',
                borderLeft: '1em solid transparent',
                borderRight: '1em solid transparent',
                borderBottom: `1em solid ${
                  this.props.theme.tertiaryLevelBgColor
                }`,
                zIndex: '2',
              }}
            />
            <Div
              css={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                background: this.props.theme.tertiaryLevelBgColor,
                minWidth: '11em',
                margin: '-0.09em 0 0 2.5em',
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                borderStyle: 'solid ',
                borderWidth: '1px',
                borderColor: this.props.theme.tertiaryLevelBgColor,
                zIndex: 1,
              }}
            >
              {Object.keys(this.props.groupOptions).map(key => {
                return (
                  <Div
                    key={key}
                    css={{
                      display:
                        this.props.selectedGroup.ID ===
                        this.props.groupOptions[key].ID
                          ? 'none'
                          : 'block',
                      color: this.props.theme.fontColor,
                      fontSize: '12px',
                      fontWeight: 'bold',
                      fontFamily: 'Arial,Helvetica,sans-serif',
                      padding: '1em 1.333em',
                      textDecoration: 'none',
                      ':hover': {
                        background: this.props.theme.secondaryLevelBgColor,
                        cursor: 'pointer',
                      },
                    }}
                    onClick={() =>
                      this.handleSetGroupOption(this.props.groupOptions[key])
                    }
                  >
                    Agrupar por {this.props.groupOptions[key].GROUP}
                  </Div>
                )
              })}
            </Div>
          </Div>
        ) : (
          <Div
            css={{
              display: 'flex',
              margin: '0em 0 0 2em',
              background: this.props.theme.tertiaryLevelBgColor,
              height: '2.5em',
              width: '11em',
              minWidth: '10.2em',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'flex-end',
              ':hover': {
                background: this.props.theme.secondaryLevelBgColor,
                cursor: 'pointer',
              },
            }}
            onMouseEnter={() => this.mouseEnter()}
            onClick={this.handleMenuOpen}
            data-tip="Selecciona modo de agrupación"
            data-place="left"
            data-type="dark"
            data-effect="solid"
            data-border={true}
          >
            <Div
              css={{
                fontSize: '13px',
                fontFamily: 'Arial',
                color: this.props.theme.fontColor,
                paddingRight: '.4em',
              }}
            >
              Agrupado por {this.props.selectedGroup.GROUP}
            </Div>
            <Div
              css={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 0.2em 0 0.2em',
                height: '100%',
                cursor: 'pointer',
                ':hover': {
                  background: this.props.theme.primaryLevelBgColor,
                },
              }}
            >
              <FontAwesome
                name="angle-down"
                size="lg"
                style={{
                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                  color: this.props.theme.fontColor,
                }}
              />
            </Div>
          </Div>
        )}
      </Div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        setSelectedGroup,
        setSetStateGroupMenu,
        setClosedMenuNotifications,
        setClosedMenuAlerts,
        setClosedMenuSettings,
        setClosedMenuUser,
        regionRequest,
      },
      dispatch
    ),
  }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  groupOptions: state.statisticsDropcallCsfHof.groupOptions,
  selectedGroup: state.statisticsDropcallCsfHof.selectedGroup,
  stateGroupOption: state.statisticsDropcallCsfHof.stateGroupOption,
  menu_settings: state.toolbar.menu_settings,
  menu_user: state.toolbar.menu_user,
  menu_notification: state.toolbar.menu_notification,
  menu_alert: state.toolbar.menu_alert,
  userLevel: state.client.user.USER_LEVEL,
  selectedRegion: state.statisticsDropcallCsfHof.selectedRegion
})

const ContextualMenuConnected = connect(mapStateToProps, mapDispatchToProps)(
  withTheme(ContextualMenu)
)

export default ContextualMenuConnected
