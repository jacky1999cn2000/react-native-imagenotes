'use strict';

import {fromJS, List, Map} from 'immutable';

const notes = (state=List(), action) => {
  switch (action.type) {
    case 'LOAD_NOTES':
      return fromJS(action.notes);
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
