// En este compoenente se tienen las opciones para el control de usuarios,
// Activaciones y cambios de roles se realizan desde acá
import React, { Component } from "react";
import glamorous, { withTheme } from "glamorous";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import { FoldingCube } from "styled-spinkit";
import FontAwesome from "react-fontawesome";
import { regionRequest } from "../loginSignup/actions";
import {
  getUsersRequest,
  updateUserRequest,
  deleteUserRequest
} from "./actions";
const { Div, Tr, Select, Option, Table, Th, Td } = glamorous;

class UsersControl extends Component {
  constructor(props) {
    super(props);
    this.renderThumb = this.renderThumb.bind(this);
    this.handleOnChangeUpdateUserRegion = this.handleOnChangeUpdateUserRegion.bind(
      this
    );
    this.handleOnChangeUpdateUserStatus = this.handleOnChangeUpdateUserStatus.bind(
      this
    );
    this.handleOnChangeUpdateUserLevel = this.handleOnChangeUpdateUserLevel.bind(
      this
    );
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.regionById = this.regionById.bind(this);
    this.statusByBolean = this.statusByBolean.bind(this);
    this.userNivelTitle = this.userNivelTitle.bind(this);
    this.backgroundColored = this.backgroundColored.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
    this.conditionalRenderLevels = this.conditionalRenderLevels.bind(this);
  }

  componentWillMount() {
    this.props.regionRequest();
    this.props.getUsersRequest();
  }
  renderThumb() {
    return (
      <div
        style={{
          backgroundColor: "#B6B6B6",
          width: "1em"
        }}
      />
    );
  }
  handleOnChangeUpdateUserRegion(event) {
    let elementOfObject = event.target.dataset.element;
    let value = event.target.value;
    let property = "ID_REGION";
    let userMod = this.props.users[elementOfObject];
    userMod[property] = value;
    this.props.updateUserRequest(userMod, elementOfObject);
    this.forceUpdate();
  }

  handleOnChangeUpdateUserStatus(event) {
    let objectKey = event.target.dataset.element;
    let value = event.target.value;
    let property = "ACTIVE_STATUS";
    let userMod = this.props.users[objectKey];
    userMod[property] = value;
    this.props.updateUserRequest(userMod, objectKey);
    this.forceUpdate();
  }

  handleOnChangeUpdateUserLevel(event) {
    let objectKey = event.target.dataset.element;
    let value = event.target.value;
    let property = "USER_LEVEL";
    let userMod = this.props.users[objectKey];
    userMod[property] = value;
    this.props.updateUserRequest(userMod, objectKey);
    this.forceUpdate();
  }

  handleDeleteUser(event) {
    let objectKey = event.target.dataset.element;
    this.props.deleteUserRequest(this.props.users[objectKey].ID, objectKey);
    this.forceUpdate();
  }

  regionById(id) {
    Object.keys(this.props.regions).map((element, index) => {
      if (this.props.regions[element].ID === id) {
        return this.props.regions[element].REGION;
      } else {
        return null;
      }
    });
  }

  statusByBolean(value) {
    if (value) {
      return "Si";
    } else {
      return "No";
    }
  }

  userNivelTitle(value) {
    switch (value) {
      case 0:
        return "Administrador";
      case 1:
        return "Moderador";
      case 2:
        return "Usuario";
      default:
        break;
    }
  }

  backgroundColored(value) {
    switch (value) {
      case 0:
        return this.props.theme.userAdminBackgroundColor;
      case 1:
        return this.props.theme.userModBackgroundColor;
      case 2:
        return this.props.theme.userBackgroundColor;
      default:
        break;
    }
  }
  conditionalRender(userName, userLevel) {
    if (userName === this.props.client.USER_NAME) return false;
    if (userLevel === 0) return false;
    return true;
  }

  conditionalRenderLevels(userName, userLevel) {
    if (userLevel !== 0 && this.props.client.USER_LEVEL === 0) return true;
    return false;
  }
  render() {
    return (
      <Div
        css={{
          background: this.props.theme.secondaryLevelBgColor,
          color: this.props.theme.fontColor
        }}
      >
        <Div
          css={{
            margin: "1em"
          }}
        >
          <Div
            css={{
              backgroundColor: this.props.theme.tertiaryLevelBgColor
            }}
          >
            <Table
              cellpadding="0"
              cellspacing="0"
              border="0"
              css={{
                width: "100%",
                tableLayout: "fixed"
              }}
            >
              <thead>
                <tr>
                  <Th
                    css={{
                      padding: "20px 15px",
                      textAlign: "left",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: this.props.theme.fontColor,
                      textTransform: "uppercase"
                    }}
                  >
                    Usuario
                  </Th>
                  <Th
                    css={{
                      padding: "20px 15px",
                      textAlign: "left",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: this.props.theme.fontColor,
                      textTransform: "uppercase"
                    }}
                  >
                    Nombre
                  </Th>
                  <Th
                    css={{
                      padding: "20px 15px",
                      textAlign: "left",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: this.props.theme.fontColor,
                      textTransform: "uppercase"
                    }}
                  >
                    Apellido
                  </Th>
                  <Th
                    css={{
                      padding: "20px 15px",
                      textAlign: "left",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: this.props.theme.fontColor,
                      textTransform: "uppercase"
                    }}
                  >
                    Región
                  </Th>
                  <Th
                    css={{
                      padding: "20px 15px",
                      textAlign: "left",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: this.props.theme.fontColor,
                      textTransform: "uppercase"
                    }}
                  >
                    Nivel
                  </Th>
                  <Th
                    css={{
                      padding: "20px 15px",
                      textAlign: "left",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: this.props.theme.fontColor,
                      textTransform: "uppercase"
                    }}
                  >
                    Activo
                  </Th>
                  <Th
                    css={{
                      padding: "20px 15px",
                      textAlign: "left",
                      fontWeight: "500",
                      fontSize: "12px",
                      color: this.props.theme.fontColor,
                      textTransform: "uppercase"
                    }}
                  >
                    Eliminar
                  </Th>
                </tr>
              </thead>
            </Table>
          </Div>
          {this.props.completeFetchUsers ? (
            <Scrollbars
              style={{
                height: "70.9vh",
                maxHeight: "70.9vh",
                background: this.props.theme.secondaryLevelBgColor,
                color: this.props.theme.fontColor
              }}
              renderThumbHorizontal={this.renderThumb}
              renderThumbVertical={this.renderThumb}
              onUpdate={this.handleUpdate}
              autoHide
              // Hide delay in ms
              autoHideTimeout={1000}
              // Duration for hide animation in ms.
              autoHideDuration={200}
            >
              <Table
                cellpadding="0"
                cellspacing="0"
                border="0"
                css={{
                  width: "100%",
                  tableLayout: "fixed"
                }}
              >
                <tbody>
                  {Object.keys(this.props.users).map((element, index) => {
                    return (
                      <Tr
                        css={{
                          background: this.backgroundColored(
                            this.props.users[element].USER_LEVEL
                          )
                        }}
                        key={index}
                      >
                        <Td
                          css={{
                            padding: "15px",
                            textAlign: "left",
                            verticalAlign: "middle",
                            fontWeight: 300,
                            fontSize: "12px",
                            color: this.props.theme.fontColor,
                            borderBottom: "solid 1px rgba(255,255,255,0.1)"
                          }}
                        >
                          {this.props.users[element].USER_NAME}
                        </Td>
                        <Td
                          css={{
                            padding: "15px",
                            textAlign: "left",
                            verticalAlign: "middle",
                            fontWeight: 300,
                            fontSize: "12px",
                            color: this.props.theme.fontColor,
                            borderBottom: "solid 1px rgba(255,255,255,0.1)"
                          }}
                        >
                          {this.props.users[element].FIRST_NAME}
                        </Td>
                        <Td
                          css={{
                            padding: "15px",
                            textAlign: "left",
                            verticalAlign: "middle",
                            fontWeight: 300,
                            fontSize: "12px",
                            color: this.props.theme.fontColor,
                            borderBottom: "solid 1px rgba(255,255,255,0.1)"
                          }}
                        >
                          {this.props.users[element].LAST_NAME}
                        </Td>
                        <Td
                          css={{
                            padding: "15px",
                            textAlign: "left",
                            verticalAlign: "middle",
                            fontWeight: 300,
                            fontSize: "12px",
                            color: this.props.theme.fontColor,
                            borderBottom: "solid 1px rgba(255,255,255,0.1)"
                          }}
                        >
                          {this.props.users[element].USER_LEVEL !== 0 ? (
                            <Select
                              css={{
                                display: "block",
                                fontSize: "12px",
                                background: this.props.theme
                                  .secondaryLevelBgColor,
                                color: this.props.theme.fontColor,
                                width: "9em"
                              }}
                              key={index + 200}
                              value={this.props.users[element].ID_REGION}
                              data-user={this.props.users[element].USER_NAME}
                              data-index={index}
                              data-element={element}
                              data-control="ID_REGION"
                              onChange={this.handleOnChangeUpdateUserRegion}
                            >
                              {Object.keys(this.props.regions).map((key, i) => {
                                return (
                                  <Option
                                    key={i}
                                    value={this.props.regions[key].ID}
                                  >
                                    {this.props.regions[key].REGION}
                                  </Option>
                                );
                              })}
                            </Select>
                          ) : (
                            <Div
                              css={{
                                display: "block",
                                fontSize: "12px",
                                color: this.props.theme.fontColor
                              }}
                            >
                              Oculto
                            </Div>
                          )}
                        </Td>
                        <Td
                          css={{
                            padding: "15px",
                            textAlign: "left",
                            verticalAlign: "middle",
                            fontWeight: 300,
                            fontSize: "12px",
                            color: this.props.theme.fontColor,
                            borderBottom: "solid 1px rgba(255,255,255,0.1)"
                          }}
                        >
                          {this.conditionalRenderLevels(
                            this.props.users[element].USER_NAME,
                            this.props.users[element].USER_LEVEL
                          ) ? (
                            <Select
                              css={{
                                display: "block",
                                fontSize: "12px",
                                background: this.props.theme
                                  .secondaryLevelBgColor,
                                color: this.props.theme.fontColor
                              }}
                              key={index + 300}
                              value={this.props.users[element].USER_LEVEL}
                              data-user={this.props.users[element].USER_NAME}
                              data-index={index}
                              data-element={element}
                              data-control="USER_LEVEL"
                              onChange={this.handleOnChangeUpdateUserLevel}
                            >
                              {this.props.userLevels.map((level, i) => {
                                return (
                                  <option key={i} value={level}>
                                    {this.userNivelTitle(level)}
                                  </option>
                                );
                              })}
                            </Select>
                          ) : (
                            <Div
                              css={{
                                display: "block",
                                fontSize: "12px",
                                color: this.props.theme.fontColor
                              }}
                            >
                              {this.userNivelTitle(
                                this.props.users[element].USER_LEVEL
                              )}
                            </Div>
                          )}
                        </Td>
                        <Td
                          css={{
                            padding: "15px",
                            textAlign: "left",
                            verticalAlign: "middle",
                            fontWeight: 300,
                            fontSize: "12px",
                            color: this.props.theme.fontColor,
                            borderBottom: "solid 1px rgba(255,255,255,0.1)"
                          }}
                        >
                          {this.conditionalRender(
                            this.props.users[element].USER_NAME,
                            this.props.users[element].USER_LEVEL
                          ) ? (
                            <Select
                              css={{
                                display: "block",
                                fontSize: "12px",
                                background: this.props.theme
                                  .secondaryLevelBgColor,
                                color: this.props.theme.fontColor
                              }}
                              key={index + 400}
                              value={this.props.users[element].ACTIVE_STATUS}
                              data-user={this.props.users[element].USER_NAME}
                              data-index={index}
                              data-element={element}
                              data-control="ACTIVE_STATUS"
                              onChange={this.handleOnChangeUpdateUserStatus}
                            >
                              {this.props.statusOptions.map((level, i) => {
                                return (
                                  <option key={i} value={level}>
                                    {this.statusByBolean(level)}
                                  </option>
                                );
                              })}
                            </Select>
                          ) : (
                            <Div
                              css={{
                                display: "block",
                                fontSize: "12px",
                                color: this.props.theme.fontColor
                              }}
                            >
                              {this.statusByBolean(
                                this.props.users[element].ACTIVE_STATUS
                              )}
                            </Div>
                          )}
                        </Td>
                        <Td
                          css={{
                            padding: "15px",
                            textAlign: "left",
                            verticalAlign: "middle",
                            fontWeight: 300,
                            fontSize: "12px",
                            color: this.props.theme.fontColor,
                            borderBottom: "solid 1px rgba(255,255,255,0.1)"
                          }}
                        >
                          {this.conditionalRender(
                            this.props.users[element].USER_NAME,
                            this.props.users[element].USER_LEVEL
                          ) ? (
                            <FontAwesome
                              name="trash"
                              size="2x"
                              style={{
                                textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                                color: this.props.theme.fontColor,
                                cursor: "pointer"
                              }}
                              data-user={this.props.users[element].USER_NAME}
                              data-element={element}
                              onClick={this.handleDeleteUser}
                            />
                          ) : (
                            <FontAwesome
                              name="lock"
                              size="2x"
                              style={{
                                textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                                color: this.props.theme.fontColor,
                                cursor: "pointer"
                              }}
                            />
                          )}
                        </Td>
                      </Tr>
                    );
                  })}
                </tbody>
              </Table>
            </Scrollbars>
          ) : (
            <Div
              css={{
                marginTop: "11em"
              }}
            >
              <FoldingCube color="#ED164F" size="70" />
            </Div>
          )}
        </Div>
      </Div>
    );
  }
}

const mapStateToProps = state => {
  return {
    client: state.client.user,
    users: state.users.users,
    userLevels: state.users.userLevels,
    regions: state.loginSignup.regions,
    statusOptions: state.users.statusOptions,
    completeFetchUsers: state.users.completeFetchUsers
  };
};

const UsersControlConected = connect(mapStateToProps, {
  getUsersRequest,
  updateUserRequest,
  deleteUserRequest,
  regionRequest
})(withTheme(UsersControl));

export default UsersControlConected;
