import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
import FontAwesome from 'react-fontawesome'

const { Div, Span } = glamorous

class ToolContext extends Component {
  render() {
    return (
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
      >
        <Div>
          <Span
            css={{
              fontSize: '13px',
              fontFamily: 'Arial',
              color: this.props.theme.fontColor,
              paddingRight: '.4em',
            }}
          >
            Opciones de transmision
          </Span>
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
    )
  }
}

export default withTheme(ToolContext)
