import { useState } from "react";

const useCreatePost = () => {
  const [errors, setErrors] = useState({});

  const setServerErrors = (err) => {
    setErrors(err);
  };

  const validateForm = (form, image) => {
    const errorsBag = {};

    // Validate title
    if (form.title.length < 3) {
      errorsBag.title = "Title is too short. Min length is 3 symbols.";
    }

    // Validate text
    if (form.text.length < 100) {
      errorsBag.text = "Text is too short. Min length is 100 symbols.";
    }

    // Validate amount
    if (isNaN(form.amount)) {
      errorsBag.amount = "Amount must be a number.";
    } else if (Number(form.amount) < 100) {
      errorsBag.amount = "Min amount 100.";
    }

    // Validate category
    if (!form.category) {
      errorsBag.category = "Please select a category.";
    }

    // Validate image
    if (!image) {
      errorsBag.image = "Please select an image.";
    }

    if (Object.keys(errorsBag).length === 0) {
      setErrors({});
      return true;
    }

    setErrors(errorsBag);
    return false;
  };

  return { errors, validateForm, setServerErrors };
};

export default useCreatePost;
