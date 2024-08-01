import * as l from "../../../Constants/urls";
import Gate from "../../Common/Gate";

const Banner = () => {
  return (
    <section className="bg-light-grey p-4 md:p-20">
      <div className="w-full md:max-width m-auto flex flex-col md:flex-row md:center-all ">
        <div className="w-1/2" data-aos="fade-right" data-aos-once={true}>
          <img src="./images/banner.svg" alt="Better World" />
        </div>
        <div
          className="w-full md:w-1/2 space-y-6"
          data-aos="fade-up"
          data-aos-once={true}
        >
          <p
            className="text-light uppercase text-xs"
            data-aos="fade-up"
            data-aos-once={true}
          >
            Leading crowdfunding platform
          </p>
          <h1
            className="text-dark text-3xl md:text-5xl font-bold capitalize"
            data-aos-delay="100"
            data-aos="fade-up"
            data-aos-once={true}
          >
            Your home for help
          </h1>
          <p
            className="text-gray-900"
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-once={true}
          >
            Get everything you need to make your fundraiser a success on
            ReactFundMe. Whether you're raising money for yourself, friends,
            family, or a charity, ReactFundMe is here to help. With no fees to
            start, ReactFundMe is the world's leading crowdfunding platform—from
            memorial tributes and funerals to medical emergencies and
            nonprofits. Whenever you need assistance, you can ask here.
          </p>

          <Gate status="logged">
            <a
              href={l.CREATE_POST}
              className="button-light inline-block capitalize"
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-once={true}
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
        </div>
      </div>
    </section>
  );
};
export default Banner;
