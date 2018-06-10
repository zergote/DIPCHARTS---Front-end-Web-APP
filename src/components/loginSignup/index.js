import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import Messages from "../messagesAndErrors/Messages";
import Errors from "../messagesAndErrors/Errors";
import {
  loginRequest,
  changeToSignup,
  changeToLogin,
  signupRequest,
  regionRequest
} from "./actions";
import glamorous from "glamorous";

const { Div, H1, A, Input, Button, Form, Span, Select, Option } = glamorous;

// Si estaba probando, querría exportar este componente para que pueda probar su componente personalizado
// y no comprobar si Redux y Redux Form están haciendo su trabajo.
class LoginSignup extends Component {
  componentWillMount() {
    this.props.regionRequest();
  }
  // Recuerde, Redux Form pasa los valores del formulario a nuestro gestor.
  // En este caso será un objeto con `email` y `contraseña`.
  submitSignup = values => {
    this.props.signupRequest(values);
  };

  submitLogin = values => {
    this.props.loginRequest(values);
  };

  spanChangeToSignup = props => {
    return (
      <Span
        style={{
          cursor: "pointer",
          color: "#F2F1EF"
        }}
        onClick={this.props.changeToSignup}
      >
        ¿No estas registrado?»
      </Span>
    );
  };

  spanChangeToLogin = () => {
    return (
      <Span
        style={{
          cursor: "pointer",
          color: "#F2F1EF"
        }}
        onClick={this.props.changeToLogin}
      >
        Ya estoy registrado»
      </Span>
    );
  };

  renderTextField = ({
    input,
    label,
    type,
    placeholder,
    meta: { touched, error },
    ...custom
  }) => (
    <Input
      css={{
        width: "100%",
        marginBottom: "10px",
        background: "rgba(0, 0, 0, 0.3)",
        outline: "none",
        padding: "10px",
        fontFamily: '"Open Sans", sans-serif',
        fontSize: "13px",
        color: "#fff",
        textShadow: "1px 1px 1px rgba(0,0,0,0.3)",
        border: "1px solid rgba(0,0,0,0.3)",
        borderRadius: "4px",
        boxShadow:
          "inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px rgba(255,255,255,0.2)",
        transition: "box-shadow .5s ease",
        ":focus": {
          boxShadow:
            "inset 0 -5px 45px rgba(100,100,100,0.4), 0 1px 1px rgba(255,255,255,0.2)"
        }
      }}
      required
      type={type}
      name={label}
      placeholder={placeholder}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  );

  renderSelect = ({
    input,
    options,
    label,
    placeholder,
    meta: { touched, error },
    ...custom
  }) => (
    <Select
      css={{
        width: "107.5%",
        marginBottom: "10px",
        outline: "none",
        padding: "10px",
        fontFamily: '"Open Sans", sans-serif',
        fontSize: "13px",
        color: "#fff",
        background: "rgba(0, 0, 0, 0.3)",
        textShadow: "1px 1px 1px rgba(0,0,0,0.3)",
        border: "1px solid rgba(0,0,0,0.3)",
        borderRadius: "4px",
        boxShadow:
          "inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px rgba(255,255,255,0.2)",
        transition: "box-shadow .5s ease",
        ":focus": {
          boxShadow:
            "inset 0 -5px 45px rgba(100,100,100,0.4), 0 1px 1px rgba(255,255,255,0.2)"
        }
      }}
      required
      errorText={touched && error}
      {...input}
      {...custom}
    >
      <Option hidden />

      {Object.keys(this.props.selectedOptions).map((key, i) => {
        return (
          <Option
            css={{
              fontFamily: '"Open Sans", sans-serif',
              fontSize: "15px",
              color: "#fff",
              background: "#2B2B2B"
            }}
            key={i}
            value={this.props.selectedOptions[key].ID}
          >
            {this.props.selectedOptions[key].REGION}
          </Option>
        );
      })}
    </Select>
  );

  render() {
    const {
      handleSubmit, //Recuerda, Redux Form inyecta esto en nuestros props.
      login: {
        requestingL,
        successfulL,
        messagesL,
        errorsL,
        requestingS,
        successfulS,
        messagesS,
        errorsS,
        screenSignup
      }
    } = this.props;
    return (
      <Div
        css={{
          width: " 100%",
          height: "100%",
          fontFamily: '"Open Sans", sans-serif',
          background:
            "linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%)",
          backgroundBlendMode: "multiply"
        }}
      >
        <Div
          css={{
            padding: "1em 0em 0em 1.3em"
          }}
        >
          <A
            css={{
              fontSize: "27px",
              fontFamily: "'Dosis', sans-serif",
              padding: "0em .2em .1em .2em ",
              color: "#FFFFFF",
              backgroundImage:
                "linear-gradient(to right, transparent 50%, #FF013F 50%)",
              backgroundPosition: 0,
              // Crear el fondo el doble de grande que el texto
              backgroundSize: "200%",
              transition: "all 0.4s",
              cursor: "pointer",
              ":hover": {
                backgroundPosition: "-100%"
              }
            }}
            onClick={this.props.changeToLogin}
          >
            Digitel Performance Charts
          </A>
        </Div>
        <Div
          css={{
            visibility: screenSignup ? "visible" : "hidden",
            opacity: screenSignup ? "1" : "0",
            transition: "all 0.2s ease-in-out"
          }}
        >
          <Div
            css={{
              position: "absolute",
              top: "50%",
              left: "50%",
              margin: "-150px 0 0 -150px",
              width: "300px",
              height: "300px"
            }}
          >
            <Form key="0" onSubmit={handleSubmit(this.submitSignup)}>
              <H1
                css={{
                  color: "#fff",
                  textShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  letterSpacing: "1px",
                  textAlign: "center",
                  marginBottom: "0em"
                }}
              >
                Registrarse
              </H1>
              <Div
                css={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Div
                  css={{
                    fontFamily: '"Open Sans", sans-serif',
                    fontSize: "15px",
                    textShadow: "1px 1px 1px rgba(0,0,0,0.3)",
                    textAlign: "center"
                  }}
                >
                  Seleccione su región
                </Div>
              </Div>
              <Div>
                <Field
                  name="ID_REGION"
                  id="REGION"
                  placeholder="Región"
                  component={this.renderSelect}
                />
              </Div>
              <Div
                css={{
                  height: "0.5em"
                }}
              />
              <Div>
                <Field
                  name="FIRST_NAME"
                  type="text"
                  id="FIRST_NAME"
                  placeholder="Nombre"
                  component={this.renderTextField}
                />
              </Div>
              <Div>
                <Field
                  name="LAST_NAME"
                  type="text"
                  id="LAST_NAME"
                  placeholder="Apellido"
                  component={this.renderTextField}
                />
              </Div>
              <Div>
                <Field
                  name="EMAIL"
                  type="text"
                  id="EMAIL"
                  placeholder="Email"
                  component={this.renderTextField}
                />
              </Div>
              <Div>
                <Field
                  name="USER_NAME"
                  type="text"
                  id="USER_NAME_REGISTER"
                  placeholder="Nombre de usuario"
                  component={this.renderTextField}
                />
              </Div>
              <Div>
                <Field
                  name="PASSWORD"
                  type="password"
                  id="PASSWORD_REGISTER"
                  placeholder="Contraseña"
                  component={this.renderTextField}
                />
              </Div>
              <Div
                css={{
                  width: "100%"
                }}
              >
                <Button
                  css={{
                    display: "block",
                    zoom: "1",
                    width: "107.3%",
                    padding: "9px 14px",
                    fontSize: "15px",
                    lineHeight: "normal",
                    color: "#efefef",
                    textAlign: "center",
                    textShadow: "0 1px 1px rgba(0, 0, 0, 0.75)",
                    verticalAlign: "middle",
                    backgroundColor: "#4a77d4",
                    backgroundImage: "linear-gradient(top, #6eb6de, #4a77d4)",
                    backgroundRepeat: "repeat-x",
                    filter:
                      "progid:dximagetransform.microsoft.gradient(startColorstr=#6eb6de, endColorstr=#4a77d4, GradientType=0)",
                    border: "1px solid",
                    borderColor:
                      "rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25)",
                    borderRadius: "5px",
                    boxShadow:
                      "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)",
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "#4a77d4",
                      backgroundPosition: "0 -15px",
                      transition: "background-position 0.1s linear",
                      textShadow: "0 -1px 0 rgba(0, 0, 0, 0.25)",
                      color: "#F2F1EF"
                    }
                  }}
                  action="submit"
                >
                  Registrarme
                </Button>
              </Div>
            </Form>
            <div>
              {/* Al igual que en el registro, estaremos utilizando el helper de tratamiento de Errores */}
              {!requestingS &&
                !!errorsS.length && (
                  <Errors
                    message="No se ha podido resgistrar por lo siguiente:"
                    errors={errorsS}
                  />
                )}
              {!requestingS &&
                !!messagesS.length && <Messages messages={messagesS} />}
              {requestingS && <div>Enviando datos...</div>}
              {!requestingS && !successfulS && this.spanChangeToLogin()}
            </div>
          </Div>
        </Div>
        <Div
          css={{
            visibility: screenSignup ? "hidden" : "visible",
            opacity: screenSignup ? "0" : "1",
            transition: "all 0.2s ease-in-out"
          }}
        >
          <Div
            css={{
              position: "absolute",
              top: "50%",
              left: "50%",
              margin: "-150px 0 0 -150px",
              width: "300px",
              height: "300px"
            }}
          >
            <Form key="1" onSubmit={handleSubmit(this.submitLogin)}>
              <H1
                css={{
                  color: "#F2F1EF",
                  textShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                  letterSpacing: "1px",
                  textAlign: "center",
                  marginBottom: "0.5em"
                }}
              >
                Iniciar sesión
              </H1>
              <Div>
                <Field
                  name="USER_NAME"
                  type="text"
                  id="USER_NAME_LOGIN"
                  placeholder="Nombre de usuario"
                  component={this.renderTextField}
                />
              </Div>
              <Div>
                <Field
                  name="PASSWORD"
                  type="password"
                  id="PASSWORD_LOGIN"
                  placeholder="Contraseña"
                  component={this.renderTextField}
                />
              </Div>
              <Div
                css={{
                  width: "100%"
                }}
              >
                <Button
                  css={{
                    display: "block",
                    zoom: "1",
                    width: "107.3%",
                    padding: "9px 14px",
                    fontSize: "15px",
                    lineHeight: "normal",
                    color: "#efefef",
                    textAlign: "center",
                    textShadow: "0 1px 1px rgba(0, 0, 0, 0.75)",
                    verticalAlign: "middle",
                    backgroundColor: "#4a77d4",
                    backgroundImage: "linear-gradient(top, #6eb6de, #4a77d4)",
                    backgroundRepeat: "repeat-x",
                    filter:
                      "progid:dximagetransform.microsoft.gradient(startColorstr=#6eb6de, endColorstr=#4a77d4, GradientType=0)",
                    border: "1px solid",
                    borderColor:
                      "rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25)",
                    borderRadius: "5px",
                    boxShadow:
                      "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05)",
                    cursor: "pointer",
                    ":hover": {
                      backgroundColor: "#4a77d4",
                      backgroundPosition: "0 -15px",
                      transition: "background-position 0.1s linear",
                      textShadow: "0 -1px 0 rgba(0, 0, 0, 0.25)",
                      color: "#F2F1EF"
                    }
                  }}
                  action="submit"
                >
                  Dejame entrar
                </Button>
              </Div>
            </Form>
            <div>
              {/* Al igual que en el registro, estaremos utilizando el helper de tratamiento de Errores */}
              {!requestingL &&
                !!errorsL.length && (
                  <Errors
                    message="No ha podido entrar por lo siguiente:"
                    errors={errorsL}
                  />
                )}
              {!requestingL &&
                !!messagesL.length && <Messages messages={messagesL} />}
              {requestingL && <div>Entrando...</div>}
              {!requestingL && !successfulL && this.spanChangeToSignup()}
            </div>
          </Div>
        </Div>
        <Div
          css={{
            marginTop: "40px",
            padding: "10px",
            position: "absolute",
            bottom: "0em",
            left: "30%",
            right: "30%",
            clear: "left",
            textAlign: "center",
            fontSize: "10px",
            fontFamily: "arial",
            color: "#F2F1EF"
          }}
        >
          Creado con{" "}
          <Span
            css={{
              fontStyle: "normal",
              color: "#FF013F",
              fontSize: "14px",
              position: "relative",
              top: "2px"
            }}
          >
            ♥
          </Span>{" "}
          por{" "}
          <A
            css={{
              color: "#F2F1EF",
              textDecoration: "none",
              ":hover": {
                textDecoration: "underline"
              }
            }}
            target="_blank"
            href="http://www.digitel.com.ve/"
          >
            Digitel C.A.
          </A>
        </Div>
      </Div>
    );
  }
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  login: state.loginSignup,
  loggedIn: state.client.token,
  selectedOptions: state.loginSignup.regions
});

const connected = connect(mapStateToProps, {
  loginRequest,
  changeToSignup,
  changeToLogin,
  signupRequest,
  regionRequest
})(LoginSignup);

const formed = reduxForm({
  form: "LoginSignup"
})(connected);

export default formed;
