import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer.jsx';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer
});

export default reducer;
