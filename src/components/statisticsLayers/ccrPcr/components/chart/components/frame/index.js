import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import glamorous from 'glamorous'
import SelectorChart from './components/selectorChart'

const { Div } = glamorous

class Frame extends Component {
  constructor(props) {
    super(props)

    this.handleChartOptions = this.handleChartOptions.bind(this)
  }

  handleChartOptions() {
    this.props.handleChartOptions(true)
  }

  render() {
    let styleContour = null
    let styleIconSetup = null
    switch (this.props.theme) {
      case 'default':
        styleContour = {
          background: '##FFFFFF',
          backgroundImage:
            'linear-gradient(to bottom right, #FFFFFF 5%, #FFFFFF 100%)',
          backgroundBlendMode: 'lighten',
          borderRadius: '6px',
          padding: '0em 0.5em 0.5em 0.5em',
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
          height: '27em',
          margin: '1em',
        }
        styleIconSetup = {
          textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
          color: '#707073',
          cursor: 'pointer',
        }
        break
      case 'dark-unica':
        styleContour = {
          background: '#2a2a2b',
          backgroundImage:
            'linear-gradient(to bottom right, #2A2A2B 5%, #3E3E40 100%)',
          backgroundBlendMode: 'lighten',
          borderRadius: '6px',
          padding: '0em 0.5em 0.5em 0.5em',
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
          height: '27em',
          margin: '1em',
        }
        styleIconSetup = {
          textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
          color: '#707073',
          cursor: 'pointer',
        }
        break
      case 'grid-light':
        styleContour = {
          background: '#EEEEEE',
          backgroundImage:
            'linear-gradient(to bottom right, #EEEEEE 5%, #EEEEEE 100%)',
          backgroundBlendMode: 'lighten',
          borderRadius: '6px',
          padding: '0em 0.5em 0.5em 0.5em',
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
          height: '27em',
          margin: '1em',
        }
        styleIconSetup = {
          textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
          color: '#333333',
          cursor: 'pointer',
        }
        break
      case 'sand-signika':
        styleContour = {
          backgroundImage: 'url(images/sand.png)',
          backgroundBlendMode: 'lighten',
          borderRadius: '6px',
          padding: '0em 0.5em 0.5em 0.5em',
          boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
          height: '27em',
          margin: '1em',
        }
        styleIconSetup = {
          textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
          color: '#333333',
          cursor: 'pointer',
        }
        break
      default:
        break
    }
    return (
      <div style={styleContour}>
        <Div
          css={{
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '0.5em 0em 0.5em 0em',
          }}
        >
          <FontAwesome
            name="plus-square-o"
            size="lg"
            style={styleIconSetup}
            onClick={this.handleChartOptions}
            data-tip="Opciones de gráfica"
            data-place="left"
            data-type="dark"
            data-effect="solid"
            data-border={true}
          />
          <SelectorChart initiateRequests={this.props.initiateRequests} />
        </Div>
        {this.props.children}
      </div>
    )
  }
}

export default Frame
