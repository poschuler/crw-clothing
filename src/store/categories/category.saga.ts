import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './category.actions';

import { CATEGORIES_ACTION_TYPES, Category } from './category.types';
import { SagaIterator } from 'redux-saga';

// Generator<
//   | CallEffect<Category[]>
//   | PutEffect<FetchCategoriesSuccess>
//   | PutEffect<FetchCategoriesFailed>,
//   void,
//   Category[]
// >

export function* fetchCategoriesAsync(): SagaIterator {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories(): SagaIterator {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga(): SagaIterator {
  yield all([call(onFetchCategories)]);
}
