import Banner from "./Parts/Banner";
import FeaturedPosts from "./Parts/FeaturedPosts";
import Header from "./Parts/Header";
import Stats from "./Parts/Stats";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Stats />
      <FeaturedPosts />
      <Footer />
    </div>
  );
};
export default Home;
