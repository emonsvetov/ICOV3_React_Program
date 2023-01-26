export const FLASH_MESSAGE = 'FLASH_MESSAGE';

export const sendFlashMessage = (message = 'The action was completed!', className = 'alert-success', type = 'top') => {
  return {
    type: FLASH_MESSAGE,
    payload: {
      message,
      className,
      type
    }
  }
};