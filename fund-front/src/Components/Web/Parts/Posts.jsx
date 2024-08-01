import Post from "./Post";
import * as l from "../../../Constants/urls";
import useServerGet from "../../../Hooks/useServerGet";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "../Footer";
import Gate from "../../Common/Gate";

const Posts = () => {
  const { doAction: doGet, response: serverGetResponse } = useServerGet(
    l.SITE_GET_POSTS
  );
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    doGet();
  }, [doGet]);

  useEffect(() => {
    if (null === serverGetResponse) {
      return;
    }
    setPosts(serverGetResponse.data.posts ?? null);
  }, [serverGetResponse]);

  return (
    <>
      <Header />
      <section className="bg-light-grey p-4 md:p-20">
        <div className="w-full md:max-w-[1200px] center-all flex-col  m-auto">
          <h1 className="text-5xl font-bold p-4 text-dark">Our Fundraising</h1>
          <h3 className="text-xl text-center text-gray-900 w-2/3 mb-4">
            Your contribution matters, and we value your trust in our mission.
            Rest assured that your donation will be utilized responsibly and
            efficiently.
          </h3>
          <Gate status="logged">
            <a
              href={l.CREATE_POST}
              className="button-light inline-block capitalize"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              Start your fund me
            </a>
          </Gate>
          <Gate status="not-logged">
            <a
              href={l.SITE_LOGIN}
              className="button-light inline-block capitalize"
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-once={true}
            >
              Start your fund me
            </a>
          </Gate>
          {posts === null && (
            <div>
              <h1>Loading...</h1>
            </div>
          )}
          <div className="w-full p-4 md:p-10 lg:p-28">
            {posts !== null &&
              posts.map((post) => <Post key={post.id} post={post} />)}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default Posts;
