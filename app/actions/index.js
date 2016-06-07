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

export const loadNotes = (notes) => {
  return {
    type: TYPES.LOAD_NOTES,
    notes
  }
}

export function getNotes(){
  return function(dispatch){
    return fetch('http://192.168.99.100:3000/notes/')
    .then(response => response.json())
    .then(json => {
      console.log('json ',json);
      dispatch(loadNotes(json));
    })
    .catch(err => {
      console.log('err: ',err);
    });
  }
}
