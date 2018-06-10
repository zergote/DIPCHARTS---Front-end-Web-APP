import React, { Component } from 'react'
import glamorous from 'glamorous'
const { Div, Input } = glamorous

class SearchBox extends Component {
  render() {
    return (
      <Div>
        <Input
          borderRadius="3px"
          paddingLeft="1em"
          height="1.6em"
          width="15.3em"
          margin="0.7em 0 0 1em"
          background="#262626"
          color="#515151"
          fontSize="13.3px"
          fontFamily="Arial"
          type="text"
          name="search"
          placeholder="Buscar todo"
        />
      </Div>
    )
  }
}

export default SearchBox
