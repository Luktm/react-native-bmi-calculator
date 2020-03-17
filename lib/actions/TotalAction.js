import {TOTAL_ACTION} from './types';

export const setTotalWeight = (props) => {
    return {
        type: TOTAL_ACTION,
        payload: props,
    }   
}