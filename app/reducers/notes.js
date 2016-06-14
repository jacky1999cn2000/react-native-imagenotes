'use strict';

import {fromJS, List, Map} from 'immutable';

const notes = (state = Map({notes:List(),startIndex:0,hasMore:true}), action) => {
  switch (action.type) {
    case 'UPDATE_NOTES':
      state = state.set('startIndex', action.notes.startIndex);
      state = state.set('hasMore', action.notes.hasMore);
      //state = state.set('notes', state.get('notes').concat(fromJS(action.notes.notes)));
      state = state.set('notes', state.get('notes').toSet().union(fromJS(action.notes.notes).toSet()).toList().sort((a,b) => {if(a.get('id') > b.get('id')){return 1;}else{return -1;}}));
      return state;
    case 'REFRESH_NOTES':
      state = state.set('notes', state.get('notes').toSet().union(fromJS(action.notes.notes).toSet()).toList().sort((a,b) => {if(a.get('id') > b.get('id')){return 1;}else{return -1;}}));
      return state;
    case 'ADD_NOTE':
      return state.push(note(undefined, action));
    case 'LIKE_NOTE':
      return state.map(t => note(t, action));
    default:
      return state;
  }
}

const note = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return fromJS({
        id: action.id,
        title: action.title,
        text: action.text,
        likes: 0
      });
    case 'LIKE_NOTE':
      if(state.get('id') !== action.id){
        return state;
      }
      return state.set('likes', state.get('likes') + 1);
    default:
      return state;
  }
}

export default notes;
