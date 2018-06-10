import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import glamorous, { withTheme } from 'glamorous'

const { Div } = glamorous

class ReportsNav extends Component {
  render() {
    return (
      <Div
        css={{
          ':hover': {
            background: this.props.theme.selectedLinkColorHover,
          },
        }}
      >
        <NavLink
          exact
          to="/reports"
          style={{
            paddingLeft: '3.1em',
            fontWeight: 'bold',
            color: this.props.theme.fontColor,
            fontSize: '12px',
            fontFamily: 'Arial,Helvetica,sans-serif',
            lineHeight: '27px',
          }}
          activeStyle={{
            display: 'block',
            background: this.props.theme.selectedLinkColor,
            lineHeight: '27px',
            color: this.props.theme.fontColor,
          }}
        >
          Reportes
        </NavLink>
      </Div>
    )
  }
}

export default ReportsNav
