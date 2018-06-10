// Contenedor de la pantalla de inicio de sessión y registro
import React, { Component } from "react";
import LoginSignup from "../components/loginSignup";
import glamorous from "glamorous";

const { Div } = glamorous;

class LoginSignupLayer extends Component {
  render() {
    return (
      <Div
        css={{
          width: "100%",
          minWidth: "60em",
          height: "100vh",
          background: "#262626",
          color: "#B6B6B6"
        }}
      >
        <LoginSignup />
      </Div>
    );
  }
}

export default LoginSignupLayer;
