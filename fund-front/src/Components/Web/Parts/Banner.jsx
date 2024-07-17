import * as l from "../../../Constants/urls";

const Banner = () => {
  return (
    <section className="bg-light-grey p-20">
      <div className="max-w-[1200px] m-auto center-all">
        <div className="w-1/2" data-aos="fade-right">
          <img src="./images/banner.svg" alt="Better World" />
        </div>
        <div className="w-1/2 space-y-6" data-aos="fade-up">
          <p className="text-light uppercase text-xs" data-aos="fade-up">
            Leading crowdfunding platform
          </p>
          <h1
            className="text-dark text-5xl font-bold"
            data-aos-delay="100"
            data-aos="fade-up"
          >
            Your home for help
          </h1>
          <p className="text-gray-900" data-aos="fade-up" data-aos-delay="300">
            Get everything you need to make your fundraiser a success on
            ReactFundMe. Whether you're raising money for yourself, friends,
            family, or a charity, ReactFundMe is here to help. With no fees to
            start, ReactFundMe is the world's leading crowdfunding platform—from
            memorial tributes and funerals to medical emergencies and
            nonprofits. Whenever you need assistance, you can ask here.
          </p>
          <a
            href={l.CREATE_POST}
            className="button-light inline-block"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Start your fund me
          </a>
        </div>
      </div>
    </section>
  );
};
export default Banner;
