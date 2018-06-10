import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
import { NavLink } from 'react-router-dom'
const { Div } = glamorous

class Logo extends Component {
  render() {
    return (
      <Div
        css={{
          margin: '0.3em 1em 0 1em',
          color: this.props.theme.fontColor,
          fontFamily: 'Arial',
        }}
      >
        <NavLink
          exact
          to="/"
          style={{
            color: this.props.theme.fontColor,
            fontFamily: "'Dosis', sans-serif",
            fontSize: '22px',
            fontWeight: 'bold',
          }}
        >
          DIPCHARTS
        </NavLink>
      </Div>
    )
  }
}

export default withTheme(Logo)
