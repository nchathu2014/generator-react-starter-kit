import * as types from "../../constants/actionTypes";
import initialState from '../../constants/initialState';


export default function testLoadReducer(state=initialState.testObj,action){

  switch(action.type){
    case types.TEST_LOAD_SUCCESS:
          return action.message;

    default:
          return state;
  }

}
