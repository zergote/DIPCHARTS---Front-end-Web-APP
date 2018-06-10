import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
const { Div } = glamorous

class LinksSidebar extends Component {
  render() {
    const { children } = this.props
    return (
      <Div
        css={{
          width: '16.9em',
          minWidth: '16.9em',
          height: 'auto',
          maxHeight: 'auto',
          background: this.props.theme.secondaryLevelBgColor,
          position: 'absolute',
          bottom: '1.6em',
        }}
      >
        {children}
      </Div>
    )
  }
}

export default withTheme(LinksSidebar)
