import Banner from "./Parts/Banner";
import FeaturedPosts from "./Parts/FeaturedPosts";
import Header from "./Parts/Header";
import Footer from "./Footer";
import StatsBlock from "./Parts/StatsBlock";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <StatsBlock />
      <FeaturedPosts />
      <Footer />
    </div>
  );
};
export default Home;
