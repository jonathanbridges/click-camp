import { combineReducers } from 'redux';

import filterReducer from './filter_reducer';
import searchReducer from './search_reducer';
import modalReducer from './modal_reducer';

const uiReducer =  combineReducers({
  filters: filterReducer,
  search: searchReducer,
  modal: modalReducer,
});

export default uiReducer;
