import { useContext, useEffect, useState } from "react";
import * as l from "../../../Constants/urls";
import { RouterContext } from "../../../Contexts/Router";
import useServerGet from "../../../Hooks/useServerGet";
import { LoaderContext } from "../../../Contexts/Loader";
import useServerPost from "../../../Hooks/useServerPost";
import { AuthContext } from "../../../Contexts/Auth";
import useServerPut from "../../../Hooks/useServerPut";
import Header from "./Header";
import Loading from "../../Common/Loading";
import useDonate from "../../../Validations/useDonate";

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

  const { doAction: doPut, serverResponse: serverPutResponse } = useServerPut(
    l.SERVER_UPDATE_POST_DONATION
  );
  const { setShow } = useContext(LoaderContext);
  const [post, setPost] = useState(null);
  const [form, setForm] = useState(defaultValues);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { doAction, response } = useServerPost("create-donation");
  const { user } = useContext(AuthContext);
  const { errors, validate, setServerErrors } = useDonate();

  console.log(errors);

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
    else {
      if (response.data?.response?.data?.errors) {
        setServerErrors(response.data.response.data.errors);
      }
    }
  }, [response]);

  useEffect(() => {
    if (null === serverPutResponse) {
      return;
    }
    if ("success" === serverPutResponse.type) {
      window.location.href = l.POSTS_LIST;
    }
  }, [serverPutResponse]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
  };

  const handleAmountClick = (amount) => {
    setForm((f) => ({ ...f, donationAmount: amount }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here if necessary
    if (!validate(form)) return;

    setButtonDisabled(true);
    setShow(true);
    doAction({
      ...form,
      post_id: post.id,
      sponsorName: user?.name || form.sponsorName,
    });

    doPut({ ...post, donationAmount: form.donationAmount });
  };

  return (
    <>
      <section className="bg-light-grey min-h-screen">
        <Header />
        {post === null && <Loading />}
        {post !== null && (
          <div className="max-width flex justify-center p-10 m-auto gap-4">
            <div className="w-3/5 bg-white shadow-sm rounded-lg p-4 flex flex-col">
              <div className="flex">
                <img
                  src={post?.image}
                  alt={post?.title}
                  className="rounded-lg w-40 h-40 "
                />
                <div className="flex flex-col gap-2 p-4">
                  <h4 className="text-lg">
                    You’re supporting{" "}
                    <span className="italic">"{post?.title}"</span>
                  </h4>
                  <h4>
                    Your donation will benefit{" "}
                    <span className="font-bold capitalize">
                      {" "}
                      {post?.authorUsername}
                    </span>
                  </h4>
                </div>
              </div>
              <div>
                <p className="text-lg font-bold mt-4">Enter your donation</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="mb-2">
                    <div className="flex gap-2 my-2">
                      <button
                        type="button"
                        className=" donation-button-number"
                        onClick={() => handleAmountClick(25)}
                      >
                        25
                      </button>
                      <button
                        type="button"
                        className=" donation-button-number"
                        onClick={() => handleAmountClick(50)}
                      >
                        50
                      </button>
                      <button
                        type="button"
                        className=" donation-button-number"
                        onClick={() => handleAmountClick(100)}
                      >
                        100
                      </button>
                      <button
                        type="button"
                        className=" donation-button-number"
                        onClick={() => handleAmountClick(250)}
                      >
                        250
                      </button>
                    </div>
                    <input
                      placeholder="Other amount"
                      type="number"
                      className="border-2 border-gray-300 outline-none py-2 px-4 rounded-lg w-full"
                      value={form.donationAmount}
                      onChange={handleChange}
                      id="donationAmount"
                      name="donationAmount"
                    />
                    <div className="text-red-400 text-sm h-4">
                      <span
                        className={errors.donationAmount ? "inline-block" : ""}
                      >
                        {errors.donationAmount ?? ""}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <input
                      placeholder="Your name"
                      type="text"
                      className="border-2 border-gray-300 outline-none py-2 px-4 rounded-lg w-full"
                      value={user?.name ?? form.sponsorName}
                      onChange={handleChange}
                      id="sponsorName"
                      name="sponsorName"
                    />
                    <div className="text-red-400 text-sm h-4">
                      <span
                        className={errors.sponsorName ? "inline-block" : ""}
                      >
                        {errors.sponsorName ?? ""}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={buttonDisabled}
                    className="button-dark active:scale-75 transition-transform"
                  >
                    donate
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
export default Donate;
