const Stats = () => {
  return (
    <section className="p-40">
      <div className="max-w-[1200px] m-auto center-all">
        <div className="w-1/2 space-y-6 ">
          <p className="text-light uppercase text-xs">Why you choose us</p>
          <h1 className="text-dark text-3xl font-bold w-[360px]">
            Building a Sustainable Tomorrow
          </h1>
          <p className="text-gray-900 border-b-2 pb-10 w-[300px] border-b-gray-100">
            Supporting people in donating to those in need and making a
            meaningful impact.
          </p>
          <div
            className="flex space-x-10"
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="600"
          >
            <div>
              <h1 className="text-5xl text-dark font-bold">270+</h1>
              <h3 className="text-gray-900">People we helped</h3>
            </div>
            <div>
              <h1 className="text-5xl text-dark font-bold">500k+</h1>
              <h3 className="text-gray-900">Dollars we collected</h3>
            </div>
            <div>
              <h1 className="text-5xl text-dark font-bold">20+</h1>
              <h3 className="text-gray-900">Closed projects</h3>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img src="./images/plant2.png" alt="plant" />
        </div>
      </div>
    </section>
  );
};
export default Stats;
