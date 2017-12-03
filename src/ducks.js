import update from 'immutability-helper'
import { combineReducers } from 'redux'
import { handleActions, createActions } from 'redux-actions'

export const actions = createActions(
  'MOVE_CARD',
  'CREATE_CARD',
  'REMOVE_CARD',
  'UPDATE_CARD',
  'MOVE_COLUMN',
  'CREATE_COLUMN',
  'REMOVE_COLUMN',
)

const columns = handleActions({
  [actions.createColumn]: (state, { payload }) => update(state, { $push: [{ cards: [], ...payload }] }),
  [actions.removeColumn]: (state, { payload }) => update(state, { $splice: [[payload, 1]] }),
  [actions.createCard]: (state, { payload }) => update(state, {
    [payload.col]: {
      cards: {
        $push: [payload.data]
      }
    }
  }),
  [actions.removeCard]: (state, { payload }) => update(state, {
    [payload.col]: {
      cards: {
        $splice: [[payload.card, 1]]
      }
    }
  }),
  [actions.updateCard]: (state, { payload }) => update(state, {
    [payload.col]: {
      cards: {
        [payload.card]: { $merge: payload.data }
      }
    }
  }),
  [actions.moveColumn]: (state, { payload }) => update(state, {
    $splice: [
      [payload.src, 1],
      [payload.tgt, 0, state[payload.src]]
    ]
  }),
  [actions.moveCard]: (state, { payload }) => {
    const src = state[payload.src.col].cards[payload.src.crd]
    const tgt = state[payload.tgt.col].cards[payload.tgt.crd]

    const spec = payload.src.col === payload.tgt.col ? {
      [payload.src.col]: {
        cards: {
          [payload.src.crd]: { $set: tgt },
          [payload.tgt.crd]: { $set: src }
        }
      }
    } : {
      [payload.tgt.col]: {
        cards: {
          $splice: [[payload.tgt.crd, 0, src]]
        }
      },
      [payload.src.col]: {
        cards: {
          $splice: [[payload.src.crd, 1]]
        }
      }
    }

    return update(state, spec)
  }
}, [])

export default combineReducers({ columns })
