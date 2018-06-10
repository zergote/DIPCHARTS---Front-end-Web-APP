// Se importan aca todo los reducers de los componentes de la aplicación.
// Los reducer almacenan los estados de cada uno de los componentes.
import { reducer as form } from "redux-form";
import client from "./components/client/reducer";
import users from "./components/usersControl/reducer";
import loginSignup from "./components/loginSignup/reducer";
import toolbar from "./components/toolbar/reducer";
import statsNav from "./components/sidebar/components/statsNav/reducer";
import statisticsErlang from "./components/statisticsLayers/erlang/reducer";
import statisticsPayload from "./components/statisticsLayers/payload/reducer";
import statisticsThroughput from "./components/statisticsLayers/throughput/reducer";
import statisticsCcrPcr from "./components/statisticsLayers/ccrPcr/reducer";
import statisticsUsers from "./components/statisticsLayers/users/reducer";
import statisticsDropcallCsfHof from "./components/statisticsLayers/dropcallCsfHof/reducer";
import statisticsMarkets from "./components/statisticsLayers/markets/reducer";
import statisticsStates from "./components/statisticsLayers/states/reducer";
import statisticsClusters from "./components/statisticsLayers/clusters/reducer";
import dashboard from "./components/dashboard/reducer";
import moreAlertDetails from "./components/moreAlertDetails/reducer";
import uiThemes from "./components/uiThemes/reducer";

const IndexReducer = {
  statsNav,
  statisticsErlang,
  statisticsPayload,
  statisticsThroughput,
  statisticsCcrPcr,
  statisticsDropcallCsfHof,
  statisticsUsers,
  statisticsMarkets,
  statisticsStates,
  statisticsClusters,
  toolbar,
  client,
  users,
  loginSignup,
  form,
  dashboard,
  moreAlertDetails,
  uiThemes
};

export default IndexReducer;
