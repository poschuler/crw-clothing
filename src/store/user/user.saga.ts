import { takeLatest, put, all, call } from 'redux-saga/effects';
import { User } from 'firebase/auth';

import { USER_ACTION_TYPES } from './user.types';
import {
  EmailSignInStart,
  SignInSuccess,
  SignUpStart,
  SignUpSuccess,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
} from './user.action';
import {
  AdditionalInformation,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from '../../utils/firebase/firebase.utils';
import { Saga, SagaIterator } from 'redux-saga';

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
): SagaIterator {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    if (userSnapshot) {
      yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle(): SagaIterator {
  try {
    const { user } = yield call(signInWithGooglePopup);

    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* signInWIthEmail({
  payload: { email, password },
}: EmailSignInStart): SagaIterator {
  try {
    const userCredential = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated(): SagaIterator {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: SignUpStart): SagaIterator {
  try {
    const userCredential = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield put(signUpSuccess(user, { displayName }));
    }
  } catch (error) {
    yield put(signUpFailed(error as Error));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: SignUpSuccess): SagaIterator {
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut(): SagaIterator {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error as Error));
  }
}

export function* onGoogleSignInStart(): SagaIterator {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession(): SagaIterator {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart(): SagaIterator {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWIthEmail);
}

export function* onSignUpStart(): SagaIterator {
  yield takeLatest(USER_ACTION_TYPES.SING_UP_START, signUp);
}

export function* onSIgnUpSuccess(): SagaIterator {
  yield takeLatest(USER_ACTION_TYPES.SING_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart(): SagaIterator {
  yield takeLatest(USER_ACTION_TYPES.SING_OUT_START, signOut);
}

export function* userSagas(): SagaIterator {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSIgnUpSuccess),
    call(onSignOutStart),
  ]);
}
