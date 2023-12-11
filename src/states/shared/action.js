/**
 * @TODO: Define all the actions (creator) that uses a combination of actions from various domain
 */

import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';  // Sesuaikan dengan path yang benar
import { receiveTalksActionCreator } from '../talks/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndTalks() {
  return async (dispatch) => {
    try {
      // Dispatch action to show loading indicator
      dispatch(showLoading());

      const users = await api.getAllUsers();
      const talks = await api.getAllTalks();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveTalksActionCreator(talks));
    } catch (error) {
      alert(error.message);
    } finally {
      // Dispatch action to hide loading indicator, whether the API calls succeed or fail
      dispatch(hideLoading());
    }
  };
}

export { asyncPopulateUsersAndTalks };
