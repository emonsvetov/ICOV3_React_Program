import React, {useEffect} from 'react';  
import {useDispatch, useSelector} from 'react-redux';
import {sendFlashMessage} from '@/redux/actions/flashActions';

const FlashMessage = () => {

    const dispatch = useDispatch();
    const flashMessage = useSelector(state => state.flashMessage)

    const {message, className, type, timeout} = flashMessage;

    useEffect(
        () => {
          let timer1 = setTimeout(() => dispatch(sendFlashMessage(null, null)), timeout);
          return () => {
            clearTimeout(timer1);
          };
        },
        [flashMessage, dispatch]
    );

    if( !message )    {
      return null;
    }

    let style = {
      position:'fixed',
      top: '60px',
      zIndex:666
    }

    if( type === 'top')  {
      style = {...style, ...{top:0, left:0, zIndex:1060}}
    }

    return (
      <div className="w100 flash-message" style={style}>
        <div 
        className={'flex-column align-items-center col-md-12 alert justify-content-center text-center ' + className} 
        role="alert">
          {message}
        </div>
      </div>
    );
  }

export default FlashMessage;