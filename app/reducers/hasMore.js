'use strict';

const hasMore = (state = true, action) => {
  switch (action.type) {
    case 'UPDATE_HASMORE':
      return action.hasMore;
    default:
      return state;
  }
}

export default hasMore;
