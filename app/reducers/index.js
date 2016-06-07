'use strict';

import { combineReducers } from 'redux';
import notes from './notes'
import startIndex from './startIndex'
import hasMore from './hasMore'

const imagenotesApp = combineReducers({
  notes,
  startIndex,
  hasMore
});

export default imagenotesApp;
