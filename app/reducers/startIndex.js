'use strict';

const startIndex = (state = 0, action) => {
  switch (action.type) {
    case 'UPDATE_STARTINDEX':
      return action.startIndex;
    default:
      return state;
  }
}

export default startIndex;
