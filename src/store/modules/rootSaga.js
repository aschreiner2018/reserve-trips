import { all } from 'redux-saga/effects';
import reserve from './reserve/sagas';

export default function* rootSage(){
  return yield all([
    reserve,
  ])
}