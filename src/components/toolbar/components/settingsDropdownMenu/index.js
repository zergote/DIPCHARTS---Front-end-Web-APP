import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
import FontAwesome from 'react-fontawesome'
import { NavLink } from 'react-router-dom'
const { Div } = glamorous

class SettingsDropdownMenu extends Component {
  constructor(props) {
    super(props)
    this.handleShow = this.handleShow.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
  }

  handleMouseEnter() {
    this.props.changeMenuSettingsHover()
  }

  handleShow() {
    this.props.changeMenuSettings()
  }

  render() {
    return (
      <Div
        css={{
          display: 'flow-root',
        }}
      >
        {this.props.stateMenuSettings ? (
          <Div>
            <Div
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 1em 0 0',
                height: '2.5em',
                width: '2.5em',
                minWidth: '2.5em',
                background: this.props.theme.secondaryLevelBgColor,
                ':hover': {
                  background: this.props.theme.secondaryLevelBgColor,
                  cursor: 'pointer',
                },
              }}
              onMouseEnter={this.handleMouseEnter}
              onClick={this.handleShow}
            >
              <FontAwesome
                name="cog"
                size="lg"
                style={{
                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                  color: this.props.theme.fontColor,
                }}
              />
            </Div>
            <Div
              css={{
                width: '0',
                height: '0',
                marginLeft: '0.3em',
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
                margin: '-0.09em 0 0 -8.6em',
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                borderStyle: 'solid ',
                borderWidth: '1px',
                borderColor: this.props.theme.tertiaryLevelBgColor,
                zIndex: 1,
              }}
            >
              <Div
                css={{
                  ':hover': {
                    background: this.props.theme.secondaryLevelBgColor,
                  },
                }}
              >
                <NavLink
                  exact
                  to="/users"
                  style={{
                    color: this.props.theme.fontColor,
                    fontSize: '12px',
                    fontWeight: 'bold',
                    fontFamily: 'Arial,Helvetica,sans-serif',
                    padding: '1em 1.333em',
                    textDecoration: 'none',
                    display: 'block',
                  }}
                >
                  <FontAwesome
                    name="users"
                    size="lg"
                    style={{
                      marginRight: '1em',
                      textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                      color: this.props.theme.fontColor,
                    }}
                  />
                  Usuarios
                </NavLink>
              </Div>
              <Div
                css={{
                  ':hover': {
                    background: this.props.theme.secondaryLevelBgColor,
                  },
                }}
              >
                {/*this.props.userLevel === 0 ? (
                  <NavLink
                    exact
                    to="/systemsettings"
                    style={{
                      color: '#9E9E9E',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      fontFamily: 'Arial,Helvetica,sans-serif',
                      padding: '1em 1.333em',
                      textDecoration: 'none',
                      display: 'block'
                    }}
                  >
                    <FontAwesome
                      name="sliders"
                      size="lg"
                      style={{
                        marginRight: '1em',
                        textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                        color: '#B6B6B6'
                      }}
                    />
                    Opciones del sistema
                  </NavLink>
                ) : null*/}
              </Div>
            </Div>
          </Div>
        ) : (
          <Div
            css={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 1em 0 0',
              height: '2.5em',
              width: '2.5em',
              minWidth: '2.5em',
              ':hover': {
                background: this.props.theme.secondaryLevelBgColor,
                cursor: 'pointer',
              },
            }}
            onMouseEnter={this.handleMouseEnter}
            onClick={this.handleShow}
          >
            <FontAwesome
              name="cog"
              size="lg"
              style={{
                textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                color: this.props.theme.fontColor,
              }}
            />
          </Div>
        )}
      </Div>
    )
  }
}

export default withTheme(SettingsDropdownMenu)
