//redux in one js page

const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
// multilple reducers
const combineReducers = redux.combineReducers
//use  middleware is for extending functionality for redux , use npm install redux-logger
const applyMiddleWare = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}
function buyICeCream() {
    return {
        type: BUY_ICECREAM,
        info: 'Second redux action'
    }
}
//(prevState,action) =>newState

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIceCreams: 20
}
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default: return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default: return state
    }
}


const rootRedcer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootRedcer,applyMiddleWare(logger))

console.log('Initial state', store.getState())
// const unsbubscribe = store.subscribe(() => console.log('Update state', store.getState()))
const unsbubscribe = store.subscribe(() => {})//use logger instead of using consol.log prints to console
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyICeCream())
store.dispatch(buyICeCream())

unsbubscribe()

