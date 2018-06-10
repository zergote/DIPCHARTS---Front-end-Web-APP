import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { withTheme } from "glamorous";
import CardAlert from "./components/cardAlert";
import io from "socket.io-client";
class StreamTable extends Component {
  constructor(props) {
    super(props);
    this.renderThumb = this.renderThumb.bind(this);
  }

  componentWillMount() {
    const socket = io("http://10.193.235.130:4000/");
    socket.on("update alerts dashboard", data => {
      this.props.getAlertsDashboardSuccess(data);
    });

    setTimeout(() => {
      socket.emit("request update alerts dashboard", this.props.user.ID_REGION);
    }, 5000);

    setInterval(() => {
      socket.emit("request update alerts dashboard", this.props.user.ID_REGION);
      if (!this.props.navShow) {
        socket.emit("mark alerts read", this.props.user.ID);
      }
    }, 90000);
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

  render() {
    return (
      <Scrollbars
        style={{
          display: this.props.navShow ? "none" : "flex",
          width: "16.9em",
          minWidth: "16.9em",
          height: "93.7vh",
          maxHeight: "93.7vh",
          background: this.props.theme.quaternaryBgColor,
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: " inset 0 3px 8px rgba(0,0,0,1)"
        }}
        //renderThumbHorizontal={this.renderThumb}
        //renderThumbVertical={this.renderThumb}
        onUpdate={this.handleUpdate}
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}
      >
        {Object.keys(this.props.alerts).map((key, index) => {
          return (
            <CardAlert
              setModalOpenState={this.props.setModalOpenState}
              setAlertData={this.props.setAlertData}
              end_date={this.props.alerts[key].end_date}
              element_name={this.props.alerts[key].element_name}
              title={this.props.alerts[key].title}
              start_date={this.props.alerts[key].start_date}
              type={this.props.alerts[key].type}
              alertData={this.props.alerts[key]}
              key={key}
            />
          );
        })}

        {/*<Div
          css={{
            display: 'flex',
            width: '16.9em',
            minWidth: '16.9em',
            height: '93.7vh',
            background: '#3A50AD',
            color: '#F2F3F9',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: ' inset 0 3px 8px rgba(0,0,0,1)'
          }}
        >
          <H1
            css={{
              fontSize: '1.5em'
            }}
          >
            Stream de alertas
          </H1>
          </Div>*/}
      </Scrollbars>
    );
  }
}

export default withTheme(StreamTable);
