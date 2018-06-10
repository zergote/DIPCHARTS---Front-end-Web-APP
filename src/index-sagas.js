// Se importan y se inicializan todas las sagas de los componentes.
// Las sagas estan compuestas principalmente por operaciones de peticiones
// a la API del backend en el servidor.

import {
  loginWatcher,
  signupWatcher,
  logoutWatcher,
  regionWatcher
} from "./components/loginSignup/sagas";

import {
  getRegionWatcherERLANG,
  getStationWatcherERLANG,
  getSectorWatcherERLANG,
  getStatisticsWatcherERLANG
} from "./components/statisticsLayers/erlang/sagas";

import {
  getRegionWatcherPAYLOAD,
  getStationWatcherPAYLOAD,
  getSectorWatcherPAYLOAD,
  getStatisticsWatcherPAYLOAD
} from "./components/statisticsLayers/payload/sagas";

import {
  getRegionWatcherTHROUGHPUT,
  getStationWatcherTHROUGHPUT,
  getSectorWatcherTHROUGHPUT,
  getStatisticsWatcherTHROUGHPUT
} from "./components/statisticsLayers/throughput/sagas";

import {
  getRegionWatcherCCRPCR,
  getStationWatcherCCRPCR,
  getSectorWatcherCCRPCR,
  getStatisticsWatcherCCRPCR
} from "./components/statisticsLayers/ccrPcr/sagas";

import {
  getRegionWatcherUSERS,
  getStationWatcherUSERS,
  getSectorWatcherUSERS,
  getStatisticsWatcherUSERS
} from "./components/statisticsLayers/users/sagas";

import {
  getRegionWatcherDROPCALLCSFHOF,
  getClusterWatcherDROPCALLCSFHOF,
  getStatisticsWatcherDROPCALLCSFHOF
} from "./components/statisticsLayers/dropcallCsfHof/sagas";

import {
  getRegionWatcherMarkets,
  getMarketWatcherMarkets,
  getStatisticsWatcherMarketsErlang,
  getStatisticsWatcherMarketsPayload,
  getStatisticsWatcherMarketsCcr,
  getStatisticsWatcherMarketsPcr,
  getStatisticsWatcherMarketsUsers,
  getStatisticsWatcherMarketsConsult
} from "./components/statisticsLayers/markets/sagas";

import {
  getRegionWatcherStates,
  getStateWatcherStates,
  getStatisticsWatcherStatesErlang,
  getStatisticsWatcherStatesPayload,
  getStatisticsWatcherStatesCcr,
  getStatisticsWatcherStatesPcr,
  getStatisticsWatcherStatesUsers,
  getStatisticsWatcherStatesConsult
} from "./components/statisticsLayers/states/sagas";

import {
  getRegionWatcherClusters,
  getClusterWatcherClusters,
  getStatisticsWatcherClustersErlang,
  getStatisticsWatcherClustersPayload,
  getStatisticsWatcherClustersCcr,
  getStatisticsWatcherClustersPcr,
  getStatisticsWatcherClustersUsers,
  getStatisticsWatcherClustersConsult
} from "./components/statisticsLayers/clusters/sagas";

import {
  getUsersWatcher,
  updateUserWatcher,
  deleteUserWatcher
} from "./components/usersControl/sagas";

import {
  getRegionDashboardWatcher,
  getTopStationsErlangWatcher,
  getTopStationsPayloadWatcher,
  getSumTotalKpiMTDWatcher,
  getErlangUntil30DaysWatcher,
  getPayloadUntil30DaysWatcher,
  getErlangLatest12MonthsWatcher,
  getPayloadLatest12MonthsWatcher
} from "./components/dashboard/sagas";

import { getAlertsToolbar, markReadAlerts } from "./components/toolbar/sagas";

import { getStatisticsMoreDetails } from "./components/moreAlertDetails/sagas";

import { all } from "redux-saga/effects";

export default function* IndexSaga() {
  yield all([
    loginWatcher(),
    signupWatcher(),
    logoutWatcher(),
    regionWatcher(),
    getRegionWatcherERLANG(),
    getStationWatcherERLANG(),
    getSectorWatcherERLANG(),
    getStatisticsWatcherERLANG(),
    getRegionWatcherPAYLOAD(),
    getStationWatcherPAYLOAD(),
    getSectorWatcherPAYLOAD(),
    getStatisticsWatcherPAYLOAD(),
    getRegionWatcherTHROUGHPUT(),
    getStationWatcherTHROUGHPUT(),
    getSectorWatcherTHROUGHPUT(),
    getStatisticsWatcherTHROUGHPUT(),
    getRegionWatcherCCRPCR(),
    getStationWatcherCCRPCR(),
    getSectorWatcherCCRPCR(),
    getStatisticsWatcherCCRPCR(),
    getRegionWatcherUSERS(),
    getStationWatcherUSERS(),
    getSectorWatcherUSERS(),
    getStatisticsWatcherUSERS(),
    getRegionWatcherDROPCALLCSFHOF(),
    getClusterWatcherDROPCALLCSFHOF(),
    getStatisticsWatcherDROPCALLCSFHOF(),
    getRegionWatcherMarkets(),
    getMarketWatcherMarkets(),
    getStatisticsWatcherMarketsErlang(),
    getStatisticsWatcherMarketsPayload(),
    getStatisticsWatcherMarketsCcr(),
    getStatisticsWatcherMarketsPcr(),
    getStatisticsWatcherMarketsUsers(),
    getStatisticsWatcherMarketsConsult(),
    getRegionWatcherStates(),
    getStateWatcherStates(),
    getStatisticsWatcherStatesErlang(),
    getStatisticsWatcherStatesPayload(),
    getStatisticsWatcherStatesCcr(),
    getStatisticsWatcherStatesPcr(),
    getStatisticsWatcherStatesUsers(),
    getStatisticsWatcherStatesConsult(),
    getRegionWatcherClusters(),
    getClusterWatcherClusters(),
    getStatisticsWatcherClustersErlang(),
    getStatisticsWatcherClustersPayload(),
    getStatisticsWatcherClustersCcr(),
    getStatisticsWatcherClustersPcr(),
    getStatisticsWatcherClustersUsers(),
    getStatisticsWatcherClustersConsult(),
    getUsersWatcher(),
    updateUserWatcher(),
    deleteUserWatcher(),
    getRegionDashboardWatcher(),
    getTopStationsErlangWatcher(),
    getTopStationsPayloadWatcher(),
    getSumTotalKpiMTDWatcher(),
    getErlangUntil30DaysWatcher(),
    getPayloadUntil30DaysWatcher(),
    getErlangLatest12MonthsWatcher(),
    getPayloadLatest12MonthsWatcher(),
    getAlertsToolbar(),
    markReadAlerts(),
    getStatisticsMoreDetails()
  ]);
}
