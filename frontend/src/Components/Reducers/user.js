export const userReducer = (state = {}, action) => {
    switch(action.type){
        case 'ADD_EMAIL':
            return {
                ...state,
                email: action.payload.email
            }
            break;
    }
  return state;
}
