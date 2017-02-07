import * as types from "../../constants/actionTypes";

export function testLoadSuccess(message){

  console.info("***");
  console.info(message);
  return{
    type:types.TEST_LOAD_SUCCESS,
    message
  };
}


