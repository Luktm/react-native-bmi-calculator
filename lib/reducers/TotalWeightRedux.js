import { TOTAL_ACTION } from '../actions/types';

const INITAIL_STATE = {
    status: '',
    bmi: 0,
    message: '',
    
}

export default (state = INITAIL_STATE, action) => {

    switch (action.type) {
        case TOTAL_ACTION: 
            return Object.assign(state, action.payload);
           break;
        default:
            return state;
    }
    
}