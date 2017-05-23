import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import omit from 'lodash/omit'

const initialState = {
  people: {}
}

export const actionTypes = {
  ADD_PERSON: 'ADD_PERSON',
  EDIT_PERSON: 'EDIT_PERSON',
  REMOVE_PERSON: 'REMOVE_PERSON'
}

// REDUCERS
let personId = 0
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PERSON:
      return {
        ...state,
        people: {
          ...state.people,
          [personId++]: action.data
        }
      }
    case actionTypes.REMOVE_PERSON:
      return {
        ...state,
        people: omit(state.people, [action.id])
      }
    default:
      return state
  }
}

// ACTIONS
export const addPerson = (name, timezone) => dispatch => {
  return dispatch({ type: actionTypes.ADD_PERSON, data: {name, timezone} })
}

export const removePerson = (id) => dispatch => {
  return dispatch({ type: actionTypes.REMOVE_PERSON, id })
}

export const initStore = (initialState = initialState) => {
  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose;

  return createStore(reducer, initialState, composeEnhancers(
      applyMiddleware(thunkMiddleware)
    ))
}
