import { useState } from "react";

const useDonate = () => {
  const [errors, setErrors] = useState({});

  const setServerErrors = (err) => {
    setErrors(err);
  };

  const validate = (form) => {
    const errorsBag = {};

    if (form.sponsorName.length < 3) {
      errorsBag.sponsorName = "Name is too short. Min length is 3 symbols.";
    }

    if (form.donationAmount < 1) {
      errorsBag.donationAmount = "Please enter amount. Min amount is 1$.";
    }

    if (Object.keys(errorsBag).length === 0) {
      setErrors({});
      return true;
    }
    setErrors(errorsBag);
    return false;
  };

  return { errors, validate, setServerErrors };
};
export default useDonate;
