import React, { Component } from 'react'
import glamorous from 'glamorous'
import FontAwesome from 'react-fontawesome'
import { Scrollbars } from 'react-custom-scrollbars'

const { Div, Span } = glamorous

class NotificationBadge extends Component {
  constructor(props) {
    super(props)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.renderThumb = this.renderThumb.bind(this)
  }

  renderThumb() {
    return (
      <div
        style={{
          backgroundColor: '#B6B6B6',
          width: '1em',
        }}
      />
    )
  }

  handleMouseEnter() {
    this.props.changeMenuNotificationsHover()
  }

  handleShow() {
    this.props.changeMenuNotifications()
  }

  render() {
    return (
      <Div
        css={{
          display: 'flow-root',
        }}
      >
        {this.props.stateMenuNotification ? (
          <Div>
            <Div
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 0 0 5.57em',
                height: '2.5em',
                width: '2.5em',
                minWidth: '1.7em',
                background: '#262626',
                ':hover': {
                  background: '#262626',
                  cursor: 'pointer',
                },
              }}
              onMouseEnter={this.handleMouseEnter}
              onClick={this.handleShow}
            >
              <FontAwesome
                name="bell-o"
                size="lg"
                style={{
                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                  color: '#B6B6B6',
                }}
              />
            </Div>
            <Div
              css={{
                width: '0',
                height: '0',
                marginLeft: '5.8em',
                position: 'relative',
                borderLeft: '1em solid transparent',
                borderRight: '1em solid transparent',
                borderBottom: '1em solid #333333',
                zIndex: '2',
              }}
            />
            <Scrollbars
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                background: '#333333',
                minWidth: '16.438em',
                maxWidth: '16.438em',
                minHeight: '18.875em',
                maxHeight: '18.875em',
                margin: '-0.1em 0 0 -1.7em',
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                borderStyle: 'solid ',
                borderWidth: '1px',
                borderColor: '#414141',
                zIndex: 1,
              }}
              renderThumbHorizontal={this.renderThumb}
              renderThumbVertical={this.renderThumb}
              autoHide={false}
              // Hide delay in ms
              autoHideTimeout={1000}
              // Duration for hide animation in ms.
              autoHideDuration={200}
            >
              {Object.keys(this.props.notifications).map(key => {
                return (
                  <Div
                    key={key}
                    css={{
                      color: '#B6B6B6',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      fontFamily: 'Arial,Helvetica,sans-serif',
                      padding: '1em 1.5315em',
                      textDecoration: 'none',
                      display: 'block',
                      ':hover': {
                        background: '#262626',
                        cursor: 'pointer',
                      },
                    }}
                    onClick={() => {}}
                  >
                    {key}
                  </Div>
                )
              })}
            </Scrollbars>
            <Div
              css={{
                width: '16.9em',
                height: '1.6em',
                position: 'absolute',
                bottom: '-30.2em',
                left: '9.5em',
                background: '#333333',
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                borderStyle: 'solid ',
                borderWidth: '1px',
                borderColor: '#414141',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                zIndex: 3,
                color: '#B6B6B6',
                minWidth: '18.838em',
                fontSize: '12px',
                fontWeight: 'bold',
                fontFamily: 'Arial,Helvetica,sans-serif',
                padding: '1em 1.5315em',
                textDecoration: 'none',
                ':hover': {
                  cursor: 'pointer',
                },
              }}
            >
              Ver mas
            </Div>
          </Div>
        ) : (
          <Div>
            <Div
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 0 0 5.57em',
                height: '2.5em',
                width: '2.5em',
                minWidth: '1.7em',
                ':hover': {
                  background: '#262626',
                  cursor: 'pointer',
                },
              }}
              onMouseEnter={this.handleMouseEnter}
              onClick={this.handleShow}
            >
              <FontAwesome
                name="bell-o"
                size="lg"
                style={{
                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                  color: '#B6B6B6',
                }}
              />
              {this.props.notifications_count > 0 ? (
                <Span
                  css={{
                    position: 'absolute',
                    top: '2.9em',
                    left: '31.5em',
                    width: '1.5em',
                    height: '1.5em',
                    lineHeight: '1.5em',
                    textAlign: 'center',
                    fontFamily: 'Helvetica, sans-serif',
                    fontSize: '0.5em',
                    color: '#F2F2F2',
                    borderRadius: '0.2em',
                    opacity: '0.9',
                    transition: '.3s top ease-in, .3s opacity ease-in',
                    background: '#EB5757',
                  }}
                >
                  {this.props.notifications_count}
                </Span>
              ) : null}
            </Div>
          </Div>
        )}
      </Div>
    )
  }
}

export default NotificationBadge
