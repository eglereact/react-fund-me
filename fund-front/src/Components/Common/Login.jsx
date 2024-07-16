const Login = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-[1600px] m-auto flex flex-col md:flex-row h-[100vh]">
        <section className="bg-white w-full lg:w-1/2 p-10 xl:px-44 rounded  flex-1 flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-5xl text-light font-bold mb-4">Sign In</h1>
            <h3 className="text-xl text-gray-900  mb-10">
              Enter your email and password to Sign In.
            </h3>
          </div>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="text-dark uppercase text-xs font-bold mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="jondoe@example.com"
                autoComplete="email"
                className="bg-light-grey rounded outline-none p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-dark uppercase text-xs font-bold mb-1">
                Your Password
              </label>
              <input
                type="password"
                name="psw"
                placeholder="**********"
                autoComplete="new-password"
                className="bg-light-grey rounded outline-none p-2"
              />
            </div>
            <div>
              <button
                className="button-dark active:scale-75 transition-transform"
                type="button"
              >
                Sign In
              </button>
            </div>
            <div className="flex space-x-2 text-gray-900 justify-center w-full">
              <p>
                <span className="text-gray-400">Not registered? </span>
                <a
                  href="/#register"
                  className="hover:underline hover:hover-text-light"
                >
                  Create account
                </a>
              </p>
            </div>
          </form>
        </section>
        <section className="hidden md:w-1/2  md:flex items-center justify-center p-10">
          <img src="./images/zalia.png" alt="Plant" className="rounded-lg" />
        </section>
      </div>
    </div>
  );
};

export default Login;
