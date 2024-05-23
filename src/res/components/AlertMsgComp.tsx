import React, { useState, useEffect } from "react";

// if duration is not given then show a button to close this alert message
const AlertMsgComp = ({ error, message, duration, onDismiss }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timer;
    if (duration) {
      timer = setTimeout(() => {
        setVisible(false);
        if (onDismiss) {
          onDismiss();
        }
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const handleClose = () => {
    setVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

 
  return (
    visible && (
      <div className={`alert ${error ? "alert-danger" : "alert-success"}`} role="alert">
        {message}
        {!duration && <button type="button" className="btn-close" onClick={handleClose}></button>}
      </div>
    )
  );
};

export default AlertMsgComp;
