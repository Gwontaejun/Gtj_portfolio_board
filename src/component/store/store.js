import {createStore} from 'redux';

export default createStore(function(state, action) {
    if(state === undefined){
        return {mode:true};
    }else if(action.type === "ModeConverter"){
        if(state.mode === true){
            return {mode:!state.mode}
        }
        return {mode:!state.mode}
    }
    return state;
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());