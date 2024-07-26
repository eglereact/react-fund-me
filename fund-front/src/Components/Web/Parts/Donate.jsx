import { useContext, useEffect, useState } from "react";
import * as l from "../../../Constants/urls";
import { RouterContext } from "../../../Contexts/Router";
import useServerGet from "../../../Hooks/useServerGet";
import { LoaderContext } from "../../../Contexts/Loader";
import useServerPost from "../../../Hooks/useServerPost";
import { AuthContext } from "../../../Contexts/Auth";

const Donate = () => {
  const defaultValues = {
    sponsorName: "",
    donationAmount: "",
    post_id: "",
  };

  const { params } = useContext(RouterContext);
  const { doAction: doGet, response: serverGetResponse } = useServerGet(
    l.SERVER_DONATE
  );

  const { setShow } = useContext(LoaderContext);
  const [post, setPost] = useState(null);
  const [form, setForm] = useState(defaultValues);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { doAction, response } = useServerPost("create-donation");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    doGet("/" + params[1]);
  }, [doGet, params]);

  useEffect(() => {
    if (null === serverGetResponse) {
      return;
    }
    console.log(serverGetResponse);
    setPost(serverGetResponse.data.post ?? null);
  }, [serverGetResponse]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here if necessary
    // if (!validate(form)) return;

    setButtonDisabled(true);
    doAction({
      ...form,
      post_id: post.id,
      sponsorName: user?.name || form.sponsorName,
    });
  };

  return (
    <div>
      <h1 className="text-2xl">Donate to: {post?.title}</h1>
      <h1 className="text-2xl">Amount needed: {post?.amount}$</h1>
      <h1 className="text-2xl">Amount collected: {post?.amountRaised}$</h1>
      <form onSubmit={handleSubmit} className="p-14 flex flex-col gap-10">
        <div className="mb-4">
          <input
            placeholder="name"
            type="text"
            className="border-2 border-gray-300 outline-none py-2 px-4 rounded-lg"
            value={user?.name ?? form.sponsorName}
            onChange={handleChange}
            id="sponsorName"
          />
        </div>
        <div className="mb-4">
          <input
            placeholder="donation amount"
            type="number"
            className="border-2 border-gray-300 outline-none py-2 px-4 rounded-lg"
            value={form.donationAmount}
            onChange={handleChange}
            id="donationAmount"
          />
        </div>
        <button
          type="submit"
          // disabled={buttonDisabled}
          className="button-light"
        >
          donate
        </button>
      </form>
    </div>
  );
};
export default Donate;
