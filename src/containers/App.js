// En este archivo se llaman a los contenedores principal, se configura
// el store y redux dev tools
import React, { Component } from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from "react-router-redux";

// Importando reducers
import reducers from "../index-reducer.js";
import IndexSagas from "../index-sagas.js";
import createHistory from "history/createBrowserHistory";

// Importando contenedores
import { MainLayer } from "./";

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const sagaMiddleware = createSagaMiddleware();
const middlewares = [routerMiddleware(history), sagaMiddleware];

//Configuración necesaria para Redux Dev Tools
/*
const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: "MyApp",
        actionsBlacklist: ["REDUX_STORAGE_SAVE"]
      })
    : compose;
*/
const composeEnhancers = compose

// Creando Store con los estados importados de los reducers
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeEnhancers(applyMiddleware(...middlewares))
);

//Inicialización de las sagas
sagaMiddleware.run(IndexSagas);

//Desabilitar warnings y errores de consola
//console.log = console.warn = console.error = () => {}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MainLayer />
        </ConnectedRouter>
      </Provider>
    );
  }
}
export { store };
export default App;
