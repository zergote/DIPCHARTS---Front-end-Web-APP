import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
import FontAwesome from 'react-fontawesome'
const { Div } = glamorous

class RefreshData extends Component {
  render() {
    return (
      <Div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 0 0 1em',
          height: '2.5em',
          width: '2.5em',
          minWidth: '1.7em',
          ':hover': {
            background: this.props.theme.secondaryLevelBgColor,
            cursor: 'pointer',
          },
        }}
      >
        <FontAwesome
          name="refresh"
          size="lg"
          style={{
            textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
            color: this.props.theme.fontColor,
          }}
        />
      </Div>
    )
  }
}

export default withTheme(RefreshData)
