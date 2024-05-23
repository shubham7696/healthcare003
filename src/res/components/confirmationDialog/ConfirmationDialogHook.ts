import { useState } from "react";

const useConfirmationDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  const showConfirmationDialog = (message, action) => {
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setShowDialog(true);
  };

  const hideConfirmationDialog = () => {
    setShowDialog(false);
    setConfirmMessage("");
    setConfirmAction(null);
  };

  const handleConfirm = () => {
    if (confirmAction) {
      console.log("##### called #####")
      confirmAction();
    }
    hideConfirmationDialog();
  };

  return {
    showConfirmationDialog,
    hideConfirmationDialog,
    handleConfirm,
    showDialog,
    confirmMessage,
  };
};

export default useConfirmationDialog;
