'use strict';

import uuid from 'uuid'
import { TYPES } from './types.js'

export const addNote = (text) => {
  return {
    type: TYPES.ADD_NOTE,
    id: uuid.v1(),
    text
  };
}

export const updateNotes = (notes) => {
  return {
    type: TYPES.UPDATE_NOTES,
    notes
  }
}

export const updateStartIndex = (startIndex) => {
  return {
    type: TYPES.UPDATE_STARTINDEX,
    startIndex
  }
}

export const updateHasMore = (hasMore) => {
  return {
    type: TYPES.UPDATE_HASMORE,
    hasMore
  }
}

export function getNotes(startIndex){
  return function(dispatch){
    return fetch('http://192.168.99.100:3000/notes' + '?startIndex=' + startIndex)
    .then(response => response.json())
    .then(json => {
      console.log('json ',json);
      dispatch(updateNotes(json.notes));
      dispatch(updateStartIndex(json.startIndex));
      dispatch(updateHasMore(json.hasMore));
    })
    .catch(err => {
      console.log('err: ',err);
    });
  }
}
