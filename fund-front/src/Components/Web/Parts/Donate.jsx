import { useContext, useEffect, useState } from "react";
import * as l from "../../../Constants/urls";
import { RouterContext } from "../../../Contexts/Router";
import useServerGet from "../../../Hooks/useServerGet";
import { LoaderContext } from "../../../Contexts/Loader";

const Donate = () => {
  const { params } = useContext(RouterContext);
  const { doAction: doGet, response: serverGetResponse } = useServerGet(
    l.SERVER_DONATE
  );

  const { setShow } = useContext(LoaderContext);
  const [post, setPost] = useState(null);

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
  return (
    <div>
      <h1 className="text-2xl">Donate to: {post?.title}</h1>
      <h1 className="text-2xl">Amount needed: {post?.amount}$</h1>
      <h1 className="text-2xl">Amount collected: {post?.amountRaised}$</h1>
      <div className="mb-4">
        <input placeholder="name" className="bg-green-900 text-white" />
      </div>
      <div className="mb-4">
        <input
          placeholder="Amount to donate"
          className="bg-green-900 text-white"
        />
      </div>
      <button type="button" className="button-light">
        donate
      </button>
    </div>
  );
};
export default Donate;
