  const validateAge = (value) => {
    if (value < 1 || value > 99) {
      setShowAgeError(true);
      return false;
    } else {
      setShowAgeError(false);
      return true;
    }
  };