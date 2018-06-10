import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'
require('moment/locale/es.js')
moment.locale('es')

const { Div, Span } = glamorous
class CardAlertBadge extends Component {
  constructor(props) {
    super(props)
    this.typeColor = this.typeColor.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.alertState = this.alertState.bind(this)
    this.cropBodyMessage = this.cropBodyMessage.bind(this)
    this.handleMoreDetails = this.handleMoreDetails.bind(this)
  }

  handleMoreDetails() {
    this.props.setAlertData(this.props.alertData)
    this.props.setModalOpenState(true)
  }

  typeColor(value) {
    switch (value) {
      case 0:
        return '#2ECC40'
      case 1:
        return '#39CCCC'
      case 2:
        return '#FFDC00'
      case 3:
        return '#FF4136'
      default:
        break
    }
  }

  formatDate(value) {
    return moment(value, 'YYYYMMDD').format('MMM DD')
  }

  alertState(value) {
    switch (value) {
      case false:
        return (
          <FontAwesome
            name="star"
            style={{
              //color: this.typeColor(this.props.type),
              color: this.props.theme.fontColor,
              textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            }}
          />
        )
      case true:
        return (
          <FontAwesome
            name="star-o"
            style={{
              color: this.props.theme.fontColor,
              textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            }}
          />
        )
      default:
        break
    }
  }

  cropBodyMessage(message) {
    return message.substring(0, 45) + '...'
  }

  render() {
    return (
      <Div
        css={{
          padding: '.5em .7em .5em .5em',
          textDecoration: 'none',
          display: 'block',
          ':hover': {
            background: this.props.theme.secondaryLevelBgColor,
            cursor: 'pointer',
          },
        }}
        onClick={this.handleMoreDetails}
      >
        <Div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Div
            css={{
              display: 'inline-flex',
            }}
          >
            <Span
              css={{
                margin: '0em 0em 0em 0em',
              }}
            >
              {this.alertState(false)}
            </Span>
            <Span
              css={{
                margin: '0em 0em 0em .7em',
                fontFamily: "'Dosis', sans-serif",
                fontSize: '12px',
                color: this.props.theme.fontColor,
                fontWeight: '300',
              }}
            >
              {this.props.element_name + ' ► ' + this.props.title}
            </Span>
          </Div>
          <Span
            css={{
              margin: '0em 0em 0em .7em',
              fontFamily: "'Dosis', sans-serif",
              fontSize: '12px',
              color: this.props.theme.fontColor,
              fontWeight: '300',
            }}
          >
            {this.formatDate(this.props.end_date)}
          </Span>
        </Div>
        <Div
          css={{
            display: 'flex',
            margin: '.5em 0em 0em .5em',
            fontSize: '12px',
            fontFamily: "'Dosis', sans-serif",
            color: this.props.theme.fontColor,
          }}
        >
          {this.cropBodyMessage(this.props.body)}
        </Div>
      </Div>
    )
  }
}

export default withTheme(CardAlertBadge)
