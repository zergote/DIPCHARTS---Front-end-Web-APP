import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
import { NavLink, withRouter } from 'react-router-dom'

const { Div } = glamorous

class GenericLinkSidebar extends Component {
  constructor(props) {
    super(props)
    this.handleSetRoute = this.handleSetRoute.bind(this)
  }

  handleSetRoute() {
    this.props.history.push(this.props.route)
  }

  render() {
    return (
      <Div
        css={{
          ':hover': {
            background: this.props.theme.selectedLinkColorHover,
            cursor: 'pointer',
          },
        }}
        onClick={this.handleSetRoute}
      >
        <NavLink
          exact
          to={this.props.route}
          style={{
            paddingLeft: '3em',
            color: this.props.theme.fontColorLow,
            fontSize: '12px',
            fontFamily: 'Arial,Helvetica,sans-serif',
            lineHeight: '27px',
          }}
        >
          {this.props.name}
        </NavLink>
      </Div>
    )
  }
}

export default withTheme(withRouter(GenericLinkSidebar))
