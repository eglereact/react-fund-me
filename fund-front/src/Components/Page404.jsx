const Page404 = () => {
  return (
    <div className="center-all w-full h-[100vh] bg-light-grey">
      <div className="bg-white text-center p-10 md:p-20 flex flex-col gap-2">
        <h1 className="text-dark text-3xl font-bold capitalize">
          Page Not Found
        </h1>
        <p className=" w-64 text-sm mb-4">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a href="/#" className="button-light">
          Back to home
        </a>
      </div>
    </div>
  );
};
export default Page404;
