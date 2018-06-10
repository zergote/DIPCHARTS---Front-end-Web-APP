// Este componente en un futuro manejará las opciones de usuario
import React, { Component } from "react";
import glamorous from "glamorous";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import FontAwesome from "react-fontawesome";

class UserProfile extends Component {
	render() {
		return <Div />;
	}
}

const mapStateToProps = state => {
	return {};
};

const UserProfileConected = connect(mapStateToProps, {})(UserProfile);

export default UserProfileConected;
