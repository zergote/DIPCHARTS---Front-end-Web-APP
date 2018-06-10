import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
import FontAwesome from 'react-fontawesome'
//import { NavLink } from 'react-router-dom'

const { Div, Span } = glamorous

class userDropdownMenu extends Component {
  constructor(props) {
    super(props)
    this.handleShow = this.handleShow.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
  }

  handleMouseEnter() {
    this.props.changeMenuUserHover()
  }

  handleShow() {
    this.props.changeMenuUser()
  }

  render() {
    return (
      <Div
        css={{
          display: 'flow-root',
        }}
      >
        {this.props.stateMenuUser ? (
          <Div>
            <Div
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 1em 0 0',
                height: '2.5em',
                width: '2.5em',
                background: this.props.theme.secondaryLevelBgColor,
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
                name="user-circle-o"
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
                marginLeft: '.31em',
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
                margin: '-0.09em 0 0 -8em',
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                borderStyle: 'solid ',
                borderWidth: '1px',
                borderColor: this.props.theme.tertiaryLevelBgColor,
                zIndex: 1,
              }}
            >
              <Div
                css={{
                  color: this.props.theme.fontColor,
                  fontSize: '12px',
                  fontWeight: 'bold',
                  fontFamily: 'Arial,Helvetica,sans-serif',
                  padding: '1em 1.333em',
                  textDecoration: 'none',
                  display: 'block',
                  textAlign: 'center',
                }}
              >
                Bienvenido{' '}
                <Span css={{ textDecoration: 'underline' }}>
                  {this.props.userName}
                </Span>
              </Div>

              {/*<Div
                css={{
                  ':hover': {
                    background: '#1F1F1F'
                  }
                }}
              >
                <NavLink
                  exact
                  to="/userprofile"
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
                    name="user"
                    size="lg"
                    style={{
                      marginRight: '1em',
                      textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                      color: '#B6B6B6'
                    }}
                  />
                  Perfil de usuario
                </NavLink>
                  </Div>*/}

              {/*<Div
                css={{
                  ':hover': {
                    background: '#1F1F1F'
                  }
                }}
              >
                <NavLink
                  exact
                  to="/userssettings"
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
                    name="cog"
                    size="lg"
                    style={{
                      marginRight: '1em',
                      textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                      color: '#B6B6B6'
                    }}
                  />
                  Opciones
                </NavLink>
                  </Div>*/}

              <Div
                css={{
                  color: this.props.theme.fontColor,
                  fontSize: '12px',
                  fontWeight: 'bold',
                  fontFamily: 'Arial,Helvetica,sans-serif',
                  padding: '1em 1.333em',
                  textDecoration: 'none',
                  display: 'block',
                  ':hover': {
                    background: this.props.theme.secondaryLevelBgColor,
                    cursor: 'pointer',
                  },
                }}
                onClick={this.props.logoutAction}
              >
                <FontAwesome
                  name="sign-out"
                  size="lg"
                  style={{
                    marginRight: '1em',
                    textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                    color: this.props.theme.fontColor,
                  }}
                />
                Salir
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
              name="user-circle-o"
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

export default withTheme(userDropdownMenu)
