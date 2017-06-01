import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import omit from 'lodash/omit'
import uniqid from 'uniqid'
import { persistStore, autoRehydrate } from 'redux-persist'
import { REHYDRATE } from 'redux-persist/constants'

const initialState = {
  people: {},
  formEditPerson: null
}

export const actionTypes = {
  EDIT_PERSON: 'EDIT_PERSON',
  SELECT_PERSON: 'SELECT_PERSON',
  REMOVE_PERSON: 'REMOVE_PERSON'
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EDIT_PERSON:
      const id = action.data.id != null ? action.data.id : uniqid.time();
      return {
        ...state,
        people: {
          ...state.people,
          [id]: {
            ...action.data,
            id,
          }
        }
      }

    case actionTypes.REMOVE_PERSON:
      return {
        ...state,
        people: omit(state.people, [action.id])
      }

    case actionTypes.SELECT_PERSON:
      return {
        ...state,
        formEditPerson: state.people[action.id]
      }

    case REHYDRATE:
      const people = action.payload.people
      return {people: people}

    default:
      return state
  }
}

// ACTIONS
export const editPerson = (data) => dispatch => {
  return dispatch({ type: actionTypes.EDIT_PERSON, data })
}

export const removePerson = (id) => dispatch => {
  return dispatch({ type: actionTypes.REMOVE_PERSON, id })
}

export const selectPerson = (id) => dispatch => {
  return dispatch({ type: actionTypes.SELECT_PERSON, id })
}

export const initStore = (initialState = initialState) => {
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;

  const store = createStore(reducer, initialState, composeEnhancers(
    applyMiddleware(thunkMiddleware),
    autoRehydrate()
  ))

  // begin periodically persisting the store
  persistStore(store)

  return store;
}
