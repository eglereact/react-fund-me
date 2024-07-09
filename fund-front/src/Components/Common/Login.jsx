const Login = () => {
  return (
    <div className="bg-light-grey h-[100vh] center-all">
      <div className="max-w-[1200px] m-auto w-1/3">
        <section className="bg-white p-10 rounded shadow-sm">
          <h1 className="text-5xl text-dark font-bold mb-10">Login</h1>
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
              <button className="button-light" type="button">
                Login
              </button>
            </div>
            <div className="flex space-x-2 text-gray-900 ">
              <a href="/#" className="text-light hover:underline">
                Back to home page
              </a>
              <p>
                <span>Don't have an account? </span>
                <a
                  href="/#register"
                  className="hover:underline hover:hover-text-light"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
export default Login;