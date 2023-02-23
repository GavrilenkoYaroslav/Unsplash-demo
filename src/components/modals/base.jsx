import ReactDOM from 'react-dom';
import React, { useImperativeHandle } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useScrollBlocker } from '../../hooks/utility/useScrollBlocker';

export default React.forwardRef(function BaseModal({ children, closeLink = '/', overlayClassName = '', className = '' }, ref) {
  const navigate = useNavigate();
  useScrollBlocker(true);
  const wrapperRef = useRef(null);
  const [closing, setClosing] = useState(false);

  const goBack = () => {
    navigate(closeLink);
  };

  const onAnimationEnd = (e) => {
    if (e.target !== wrapperRef.current) return;
    if (!closing) return;

    goBack();
  };

  const onClose = () => {
    setClosing(true);
  };

  const onWrapperClick = (e) => {
    if (e.target !== wrapperRef.current) return;
    onClose();
  };

  useImperativeHandle(ref, () => ({
    close: onClose,
  }));

  return ReactDOM.createPortal(
    <div ref={wrapperRef} onClick={onWrapperClick} onAnimationEnd={onAnimationEnd}
         className={`fixed z-10 inset-0 bg-black/50 flex items-center justify-center ${closing ? 'opacity-0 animate-fadeOut' : 'opacity-1 animate-fadeIn'} ${overlayClassName}`}>
      <div
        className={`w-full h-full rounded shadow p-6 bg-white ${closing ? 'animate-hideY' : 'animate-appearY'} ${className}`}>
        {children}
      </div>
    </div>
    , document.body);
})
