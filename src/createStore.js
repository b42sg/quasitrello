import { createStore as createReduxStore, applyMiddleware, compose } from 'redux'
import window from 'global/window'

export function createStore(initialState = {}) {
  const reducer = require('./ducks').default
  const middlewares = []
  const enhancers = [ applyMiddleware(...middlewares) ]

  // eslint-disable-next-line no-undef
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    compose

  const store = createReduxStore(
    reducer,
    initialState,
    composeEnhancers(...enhancers)
  )

  if (module.hot) {
    // @TODO add other stuff to hot-reload @koma
    module.hot.accept('./ducks', () => {
      store.replaceReducer(require('./ducks').default)
    })
  }

  return store
}

export default createStore
