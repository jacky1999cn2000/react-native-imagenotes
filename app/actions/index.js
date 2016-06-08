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

export const updateRefreshNotes = (notes) => {
  return {
    type: TYPES.REFRESH_NOTES,
    notes
  }
}

export function refreshNotes(){
  return function(dispatch){
    return fetch('http://192.168.99.100:3000/notes?startIndex=0')
    .then(response => response.json())
    .then(json => {
      //console.log('json ',json);
      dispatch(updateRefreshNotes(json));
    })
    .catch(err => {
      console.log('err: ',err);
    });
  }
}

export function getNotes(startIndex){
  return function(dispatch){
    return fetch('http://192.168.99.100:3000/notes' + '?startIndex=' + startIndex)
    .then(response => response.json())
    .then(json => {
      //console.log('json ',json);
      dispatch(updateNotes(json));
    })
    .catch(err => {
      console.log('err: ',err);
    });
  }
}
