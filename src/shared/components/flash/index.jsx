import {useDispatch} from 'react-redux';
import {sendFlashMessage} from '@/redux/actions/flashActions';
import FlashMessage from "@/shared/components/flash/FlashMessage";
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage";

const flash422 = (dispatch, errors) => {
    dispatch(sendFlashMessage(<ApiErrorMessage errors={errors} />, 'alert-danger', 'top'))
}

const flashSuccess = (dispatch, message) => {
    dispatch(sendFlashMessage(message, 'alert-success', 'top'))
}

const flash = (type, dispatch, message) => {
    if( type === 'success' )
    {
        dispatch(sendFlashMessage(message, 'alert-success', 'top'))
    }
    else if( type === '422' || type === 'errors' )
    {
        dispatch(sendFlashMessage(<ApiErrorMessage errors={message} />, 'alert-danger', 'top'))
    }
    else
    {
        dispatch(sendFlashMessage(message, 'alert-primary', 'top'))
    }
}

export {
    useDispatch,
    sendFlashMessage,
    FlashMessage,
    ApiErrorMessage,
    flash,
    flash422,
    flashSuccess
}