import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'

const { Div } = glamorous

class SeparadorNav extends Component {
  render() {
    return (
      <Div
        css={{
          ':hover': {
            background: this.props.theme.selectedLinkColorHover,
            cursos: 'pointer',
          },
        }}
      >
        <Div
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
          Consulta por agrupaciones
        </Div>
      </Div>
    )
  }
}

export default withTheme(SeparadorNav)
