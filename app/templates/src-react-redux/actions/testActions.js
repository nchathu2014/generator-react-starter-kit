import * as types from "./../constant/actionTypes";

export function testLoadSuccess(message){
  return{
    type:types.TEST_LOAD_SUCCESS,
    message
  };
}


