import { ThunkAction } from 'redux-thunk';
import { auth, db } from '../configs/firebase';
import {
  LOGOUT_CURRENT_USER,
  SET_CURRENT_USER,
  SET_ERROR_CURRENT_USER,
  SET_LOADING_CURRENT_USER,
} from '../models/Types';
import { User } from '../models/User';
import { currentUserReducer } from '../reducers/currentUserReducer';

interface SetCurrentUserInfoAction {
  type: typeof SET_CURRENT_USER;
  payload: User;
}

interface SetCurrentUserInfoLoadingAction {
  type: typeof SET_LOADING_CURRENT_USER;
}

interface SetCurrentUserInfoErrorAction {
  type: typeof SET_ERROR_CURRENT_USER;
}

interface LogoutCurrentUserInfoAction {
  type: typeof LOGOUT_CURRENT_USER;
}

export type CurrentUserActions =
  | SetCurrentUserInfoAction
  | SetCurrentUserInfoLoadingAction
  | SetCurrentUserInfoErrorAction
  | LogoutCurrentUserInfoAction;

export const setCurrentUser = (): ThunkAction<
  void,
  typeof currentUserReducer,
  null,
  CurrentUserActions
> => {
  return async (dispatch) => {
    db.collection('users')
      .doc(auth.currentUser?.uid)
      .get()
      .then((doc) => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: doc.data() as User,
        });
      });
  };
};

export const setCurrentUserLogout = () => {
  return {
    type: LOGOUT_CURRENT_USER,
  };
};
