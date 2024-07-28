import Banner from "./Parts/Banner";
import FeaturedPosts from "./Parts/FeaturedPosts";
import Header from "./Parts/Header";
import Stats from "./Parts/Stats";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Stats />
      <FeaturedPosts />
    </div>
  );
};
export default Home;
