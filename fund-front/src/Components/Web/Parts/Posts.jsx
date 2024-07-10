import { donationPosts } from "../../../Data/links";
import Post from "./Post";

const Posts = () => {
  const sortedDonationPosts = [...donationPosts].sort(
    (a, b) => a.amountRaised / a.moneyGoal - b.amountRaised / b.moneyGoal
  );
  return (
    <section className="bg-light-grey p-20">
      <div className="max-w-[1200px] center-all flex-col  m-auto">
        <h1 className="text-5xl font-bold p-4 text-dark">Our fundraising</h1>
        <h3 className="text-xl text-center text-gray-900 w-2/3">
          Your contribution matters, and we value your trust in our mission.
          Rest assured that your donation will be utilized responsibly and
          efficiently.
        </h3>
        <div className="w-full p-28">
          {sortedDonationPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Posts;
