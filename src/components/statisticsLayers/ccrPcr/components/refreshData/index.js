import React, { Component } from 'react'
import glamorous, { withTheme } from 'glamorous'
import FontAwesome from 'react-fontawesome'

const { Div } = glamorous

class RefreshData extends Component {
  constructor(props) {
    super(props)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  handleRefresh() {
    this.props.refresh()
  }

  render() {
    return (
      <Div>
        <Div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 0 0 0.5em',
            height: '2.5em',
            width: '2.5em',
            minWidth: '1.7em',
            position: 'absolute',
            top: '0em',
            left: '16.9em',
            zIndex: '2',
            ':hover': {
              background: this.props.theme.primaryLevelBgColor,
              cursor: 'pointer',
            },
          }}
          onClick={this.handleRefresh}
          data-tip="Actualizar"
          data-place="right"
          data-type="dark"
          data-effect="solid"
          data-border={true}
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
      </Div>
    )
  }
}

export default withTheme(RefreshData)
