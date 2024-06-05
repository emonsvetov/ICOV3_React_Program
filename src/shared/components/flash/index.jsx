import { useDispatch } from "react-redux";
import { sendFlashMessage } from "@/redux/actions/flashActions";
import FlashMessage from "@/shared/components/flash/FlashMessage";
import ApiErrorMessage from "@/shared/components/flash/ApiErrorMessage";

const flash = (type, dispatch, message, timeout = 5000) => {
  if (type === "success") {
    dispatch(sendFlashMessage(message, "alert-success", "top"));
  } else if (type === "422" || type === "errors") {
    dispatch(
      sendFlashMessage(
        <ApiErrorMessage errors={message} />,
        "alert-danger",
        "top"
      )
    );
  } else if (type === "loading" || type === "waiting" || type === "processing" || type === "alert") {
    dispatch(sendFlashMessage(message, "alert-warning", "top", timeout));
  } else {
    dispatch(sendFlashMessage(message, "alert-primary", "top"));
  }
};

const flash422 = (dispatch, errors) => flash("422", dispatch, errors);
const flashSuccess = (dispatch, message) => flash("success", dispatch, message);
const flashError = (dispatch, errors) => flash("errors", dispatch, errors);

export {
  useDispatch,
  sendFlashMessage,
  FlashMessage,
  ApiErrorMessage,
  flash,
  flash422,
  flashSuccess,
  flashError,
};
