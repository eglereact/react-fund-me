import { useContext, useEffect, useRef, useState } from "react";
import useServerPost from "../../Hooks/useServerPost";
import * as l from "../../Constants/urls";
import { AuthContext } from "../../Contexts/Auth";

const categories = [
  { id: 1, category: "animals" },
  { id: 2, category: "medical" },
  { id: 3, category: "sports" },
  { id: 4, category: "family" },
  { id: 5, category: "environment" },
  { id: 6, category: "community" },
  { id: 7, category: "emergency" },
  { id: 8, category: "education" },
  { id: 9, category: "other" },
];

const defaultValues = {
  title: "",
  text: "",
  category: "",
  amount: "",
  user_id: "",
};

const CreatePostForm = () => {
  const [form, setForm] = useState(defaultValues);
  const [image, setImage] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { doAction, response } = useServerPost("create-post");

  const { user } = useContext(AuthContext);

  const fileInputRef = useRef(null);

  const imageReader = (img) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const readImage = (e) => {
    imageReader(e.target.files[0])
      .then((res) => setImage(res))
      .catch(() => setImage(null));
  };

  useEffect(() => {
    if (response === null) return;

    setButtonDisabled(false);
    if (response.type === "success") {
      window.location.hash = l.SITE_HOME;
    }
    // Uncomment and handle server errors if necessary
    // else {
    //   if (response.data?.response?.data?.errors) {
    //     setServerErrors(response.data.response.data.errors);
    //   }
    // }
  }, [response]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setForm((f) => ({ ...f, category: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here if necessary
    // if (!validate(form)) return;

    setButtonDisabled(true);
    doAction({
      ...form,
      user_id: user.id,
      image: image,
    });
  };

  const clearFileInput = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-light-grey w-full h-[100vh]">
      <div className="max-w-[1920px] flex">
        <div className="h-[100vh] w-1/3 text-dark flex justify-center ml-32 flex-col gap-10">
          <h1 className="font-bold text-5xl max-w-[500px]">
            Let's begin your fundraising journey
          </h1>
          <p className="text-lg">Please fill the form with all the details!</p>
        </div>
        <div className="bg-white h-[100vh] w-2/3 rounded-l-[50px] flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="p-14 flex flex-col gap-10">
            <input
              type="text"
              placeholder="Title"
              className="border-2 border-gray-300 outline-none py-2 px-4 rounded-lg"
              value={form.title}
              onChange={handleChange}
              id="title"
            />
            <textarea
              placeholder="Your story"
              className="border-2 border-gray-300 outline-none py-2 px-4 rounded-lg"
              value={form.text}
              onChange={handleChange}
              id="text"
            ></textarea>

            <input
              type="text"
              placeholder="Amount"
              className="border-2 border-gray-300 outline-none py-2 px-4 rounded-lg"
              value={form.amount}
              onChange={handleChange}
              id="amount"
            />

            <div className="flex flex-wrap gap-4">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`category-${cat.id}`}
                    name="category"
                    value={cat.category}
                    checked={form.category === cat.category}
                    onChange={handleCategoryChange}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={`category-${cat.id}`}
                    className="select-none cursor-pointer rounded-full border-2 border-gray-300 py-2 px-4 font-bold text-gray-300 transition-colors duration-200 ease-in-out peer-checked:bg-green-50 peer-checked:text-light peer-checked:border-[#6DAC4F]"
                  >
                    {cat.category}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <input
                type="file"
                className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-light file:text-white hover:file:cursor-pointer"
                onChange={readImage}
                id="image"
                ref={fileInputRef}
              />

              {image && (
                <div className="mt-4 flex">
                  <img src={image} alt={form.name} className="w-64" />
                  <div
                    onClick={clearFileInput}
                    className="w-6 center-all h-6 bg-black/70 text-white cursor-pointer"
                  >
                    <p>X</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t-2 border-t-gray-100">
              <button
                type="submit"
                className="button-light"
                disabled={buttonDisabled}
              >
                Create
              </button>
              <a href="#" className="button-empty cursor-pointer">
                Back home
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
