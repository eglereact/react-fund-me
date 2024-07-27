import { useContext, useEffect, useState } from "react";
import { RouterContext } from "../../Contexts/Router";
import useServerGet from "../../Hooks/useServerGet";
import * as l from "../../Constants/urls";
import Header from "./Parts/Header";
import { FaHandHoldingHeart } from "react-icons/fa";
import Loading from "../Common/Loading";

const More = () => {
  const { params } = useContext(RouterContext);
  const { doAction: doGet, response: serverGetResponse } = useServerGet(
    l.SERVER_MORE
  );
  const { doAction: doGetDonations, response: serverGetResponseDonations } =
    useServerGet(l.SERVER_MORE_DONATIONS_LIST);

  const [post, setPost] = useState(null);
  const [donationsList, setDonationsList] = useState(null);

  console.log(donationsList);

  useEffect(() => {
    doGet("/" + params[1]);
  }, [doGet, params]);

  useEffect(() => {
    if (null === serverGetResponse) {
      return;
    }

    setPost(serverGetResponse.data.post ?? null);
  }, [serverGetResponse]);

  useEffect(() => {
    doGetDonations("/" + params[1]);
  }, [doGetDonations, params]);

  useEffect(() => {
    if (null === serverGetResponseDonations) {
      return;
    }
    console.log("don", serverGetResponseDonations);
    setDonationsList(serverGetResponseDonations.data.donations ?? null);
  }, [serverGetResponseDonations]);

  return (
    <>
      <section className="bg-light-grey min-h-screen">
        <Header />
        {post === null && <Loading />}
        {post !== null && (
          <div className="max-width flex justify-center p-10 m-auto gap-4">
            <div className="w-2/3 bg-white shadow-sm rounded-lg p-2">
              <img
                src={post?.image}
                alt={post?.title}
                className="rounded-lg w-full h-80 object-cover"
              />
              <div className="flex flex-col gap-2 p-4">
                <h1 className="text-dark text-5xl font-bold">{post?.title}</h1>
                <h3>
                  <span className="capitalize font-bold mr-1">
                    {post?.authorUsername}
                  </span>
                  is organizing this fundraiser.
                </h3>
                <p className="uppercase text-sm text-dark font-bold bg-light-grey inline px-2 py-1 rounded-lg w-min">
                  {post?.category}
                </p>

                <p className="text-gray-900">{post?.text}</p>
              </div>
            </div>
            <div className="w-1/3 flex flex-col gap-4">
              <div className="bg-white shadow-sm rounded-lg px-2 py-4 ">
                <h2 className="text-2xl">
                  <span className="text-light font-bold mr-1">
                    €{post?.amountRaised}
                  </span>
                  raised of
                  <span className="text-light font-bold mx-1">
                    €{post?.amount}
                  </span>
                  goal
                </h2>
                <p className="text-gray-500 text-sm">
                  {donationsList?.length} donations
                </p>
              </div>
              <div className="bg-white shadow-sm rounded-lg center-all relative p-2">
                <img src="images/donate.png" alt="Donate" className="w-40" />
                <div className="absolute flex items-center justify-center ">
                  {post?.amountRaised >= post?.amount ? (
                    <p className="donation-button rounded-full inline-block text-dark font-bold text-md">
                      Thank you
                    </p>
                  ) : (
                    <a
                      href={l.SITE_DONATE + "/" + post?.id}
                      className="px-8 hover:text-light transition-all py-16 donation-button rounded-full inline-block text-dark font-bold text-xl"
                    >
                      Donate
                    </a>
                  )}
                </div>
              </div>
              <div className=" bg-white shadow-sm rounded-lg">
                {donationsList?.map((don) => (
                  <div
                    key={donationsList.id}
                    className="shadow-sm flex items-center p-2"
                  >
                    <div className="bg-gray-100 rounded-full center-all w-10 h-10 text-light mr-2">
                      <FaHandHoldingHeart />
                    </div>
                    <div>
                      <h3 className="capitalize text-md">{don.sponsorName}</h3>
                      <h4 className="font-bold">$ {don.donationAmount}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
export default More;
