import { CurrentUserActions } from '../actions/currentUserActions';
import {
  SET_CURRENT_USER,
  SET_ERROR_CURRENT_USER,
  SET_LOADING_CURRENT_USER,
} from '../models/Types';
import { UserState } from '../models/User';

const INITIAL_STATE: UserState = {
  data: undefined,
  isLoading: undefined,
  error: undefined,
};

export const currentUserReducer = (
  state: UserState = INITIAL_STATE,
  action: CurrentUserActions,
) => {
  switch (action.type) {
    case SET_LOADING_CURRENT_USER: {
      return {
        data: state,
        isLoading: true,
        error: '',
      };
    }
    case SET_CURRENT_USER: {
      return {
        data: action.payload,
        isLoading: false,
      };
    }
    case SET_ERROR_CURRENT_USER: {
      return {
        data: state,
        isLoading: false,
        error: 'Error loading current user.',
      };
    }
    default: {
      return state;
    }
  }
};
