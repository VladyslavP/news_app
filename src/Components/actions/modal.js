import * as actionType from '../actionTypes';
import {actionCreator} from '../../Common/actions';

export function toggleModal(value) {
    return (dispatch) => {
        if (value) {
            dispatch(actionCreator(actionType.SUCCESS_MODAL_VISIBLE));
        } else {
            dispatch(actionCreator(actionType.SUCCESS_MODAL_HIDDEN));
        }
    };
}
