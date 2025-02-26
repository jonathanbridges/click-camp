import { combineReducers } from 'redux';

import entitiesReducer from './entities_reducer';
import checkoutReducer from './checkout_reducer';
import uiReducer from './ui_reducer';
import sessionReducer from './session_reducer';
import errorsReducer from './errors_reducer';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  checkout: checkoutReducer,
  ui: uiReducer,
  errors: errorsReducer,
});

export default rootReducer;
