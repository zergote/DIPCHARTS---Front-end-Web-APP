import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
import FontAwesome from 'react-fontawesome'
import { Scrollbars } from 'react-custom-scrollbars'
import CardAlertBadge from './components/cardAlertBadge'
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client'

const { Div, Span } = glamorous

class AlertBadge extends Component {
  constructor(props) {
    super(props)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.renderThumb = this.renderThumb.bind(this)
    this.handleMoreAlets = this.handleMoreAlets.bind(this)
    this.handleCheckConditionDropMenu = this.handleCheckConditionDropMenu.bind(
      this
    )
  }

  componentWillMount() {
    const socket = io('http://10.193.235.130:4000/')
    socket.on('update alerts toolbar', data => {
      this.props.getAlertsToolbarSuccess(data)
    })

    socket.on('update count', number => {
      this.props.setAlertCount(parseInt(number, 10))
    })

    socket.emit('request update alerts toolbar', this.props.user.ID_REGION)

    setTimeout(() => {
      socket.emit('request update count', this.props.user.ID)
    }, 5000)

    setInterval(() => {
      socket.emit('request update count', this.props.user.ID)
      socket.emit('request update alerts toolbar', this.props.user.ID_REGION)
    }, 5000)
  }

  handleMoreAlets() {
    this.props.setHideNav()
    this.props.history.push('/')
  }

  renderThumb() {
    return (
      <div
        style={{
          backgroundColor: this.props.theme.fontColor,
          width: '1em',
        }}
      />
    )
  }

  handleMouseEnter() {
    this.props.changeMenuAlertsHover()
  }

  handleShow() {
    const socket = io('http://10.193.235.130:4000/')
    socket.emit('mark alerts read', this.props.user.ID)
    socket.emit('request update count', this.props.user.ID)
    this.props.markReadAlerts()
    if (!this.handleCheckConditionDropMenu()) {
      //this.props.setUnhideNav()
    } else {
      this.props.changeMenuAlerts()
    }
  }

  handleCheckConditionDropMenu() {
    if (this.props.stateNav === false && this.props.location.pathname === '/')
      return false
    return true
  }

  render() {
    return (
      <Div
        css={{
          display: 'flow-root',
        }}
      >
        {this.handleCheckConditionDropMenu() && this.props.stateMenuAlert ? (
          <Div>
            <Div
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 0 0 3.8em',
                height: '2.5em',
                width: '2.5em',
                minWidth: '1.7em',
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
                name="flash"
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
                marginLeft: '4em',
                position: 'relative',
                borderLeft: '1em solid transparent',
                borderRight: '1em solid transparent',
                borderBottom: `1em solid ${
                  this.props.theme.tertiaryLevelBgColor
                }`,
                zIndex: '2',
              }}
            />
            <Scrollbars
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                background: this.props.theme.tertiaryLevelBgColor,
                minWidth: '16.438em',
                maxWidth: '16.438em',
                minHeight: '18.875em',
                maxHeight: '18.875em',
                margin: '-0.09em 0 0 -3.3em',
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                borderStyle: 'solid ',
                borderWidth: '1px',
                borderColor: this.props.theme.tertiaryLevelBgColor,
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
              {Object.keys(this.props.alerts).map((key, index) => {
                return (
                  <CardAlertBadge
                    key={key}
                    element_name={this.props.alerts[key].element_name}
                    setModalOpenState={this.props.setModalOpenState}
                    setAlertData={this.props.setAlertData}
                    title={this.props.alerts[key].title}
                    end_date={this.props.alerts[key].end_date}
                    type={this.props.alerts[key].type}
                    body={this.props.alerts[key].body}
                    alertData={this.props.alerts[key]}
                  />
                )
              })}
            </Scrollbars>
            <Div
              css={{
                width: '16.9em',
                height: '.9em',
                position: 'absolute',
                bottom: '-29.1em',
                left: '9.75em',
                background: this.props.theme.secondaryLevelBgColor,
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                borderStyle: 'solid ',
                borderWidth: '1px',
                borderColor: '#414141',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                zIndex: 3,
                color: this.props.theme.fontColor,
                minWidth: '18.858em',
                fontSize: '12px',
                fontWeight: 'bold',
                fontFamily: 'Arial,Helvetica,sans-serif',
                padding: '1em 1.5315em',
                textDecoration: 'none',
                ':hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={this.handleMoreAlets}
            >
              Ver todas
            </Div>
          </Div>
        ) : (
          <Div>
            <Div
              css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 0 0 3.8em',
                height: '2.5em',
                width: '2.5em',
                background:
                  this.props.stateNav === false &&
                  this.props.location.pathname === '/'
                    ? this.props.theme.primaryLevelBgColor
                    : null,
                minWidth: '1.7em',
                ':hover': {
                  background: !this.handleCheckConditionDropMenu()
                    ? this.props.theme.primaryLevelBgColor
                    : this.props.theme.secondaryLevelBgColor,
                  cursor: 'pointer',
                },
              }}
              onMouseEnter={this.handleMouseEnter}
              onClick={this.handleShow}
              data-tip="Alertas"
              data-place="bottom"
              data-type="dark"
              data-effect="solid"
              data-border={true}
            >
              <FontAwesome
                name="flash"
                size="lg"
                style={{
                  textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                  color: !this.handleCheckConditionDropMenu()
                    ? '#FF290F'
                    : this.props.theme.fontColor,
                }}
              />
              {this.handleCheckConditionDropMenu() &&
              this.props.alerts_count > 0 ? (
                <Span
                  css={{
                    position: 'absolute',
                    top: '3em',
                    left: '31.9em',
                    width: '1.8em',
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
                  {this.props.alerts_count}
                </Span>
              ) : null}
            </Div>
          </Div>
        )}
      </Div>
    )
  }
}

export default withTheme(withRouter(AlertBadge))
