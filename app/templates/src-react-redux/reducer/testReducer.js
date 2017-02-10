import * as types from "./../constant/actionTypes";
import initialState from './../constant/initialState';


export default function testLoadReducer(state=initialState.testObj,action){

  switch(action.type){
    case types.TEST_LOAD_SUCCESS:
          return action.message;

    default:
          return state;
  }

}
