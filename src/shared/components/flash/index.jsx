import {useDispatch} from 'react-redux';
import {sendFlashMessage} from '@/redux/actions/flashActions';
import FlashMessage from "@/shared/components/flash/FlashMessage";
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage";

export {
    useDispatch,
    sendFlashMessage,
    FlashMessage,
    ApiErrorMessage
}