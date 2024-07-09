import { useEffect, useState } from "react";
import useServerPost from "../../Hooks/useServerPost";
import { REDIRECT_AFTER_REGISTER } from "../../Constants/urls";

const Register = () => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  const [form, setForm] = useState(defaultValues);

  const { doAction, response } = useServerPost("register");

  useEffect(() => {
    if (null === response) {
      return;
    }
    window.location.hash = REDIRECT_AFTER_REGISTER;
  }, [response]);

  const handleForm = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    //validations...
    doAction({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  };

  return (
    <div className="bg-light-grey h-[100vh] center-all">
      <div className="max-w-[1200px] m-auto w-1/3">
        <section className="bg-white p-10 rounded shadow-sm">
          <h1 className="text-5xl text-dark font-bold mb-10">Sign Up</h1>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="text-dark uppercase text-xs font-bold mb-1">
                Your name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleForm}
                value={form.name}
                placeholder="Jon Doe"
                autoComplete="username"
                className="bg-light-grey rounded outline-none p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-dark uppercase text-xs font-bold mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                onChange={handleForm}
                value={form.email}
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
                name="password"
                onChange={handleForm}
                value={form.password}
                placeholder="**********"
                autoComplete="new-password"
                className="bg-light-grey rounded outline-none p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-dark uppercase text-xs font-bold mb-1">
                Repeat Password
              </label>
              <input
                type="password"
                name="password2"
                onChange={handleForm}
                value={form.password2}
                placeholder="**********"
                autoComplete="new-password"
                className="bg-light-grey rounded outline-none p-2"
              />
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="button-light"
                type="button"
              >
                Sign Up
              </button>
            </div>
            <div className="flex space-x-2 text-gray-900 ">
              <a href="/#" className="text-light hover:underline">
                Back to home page
              </a>
              <p>
                <span>Have an account? </span>
                <a
                  href="/#login"
                  className="hover:underline hover:hover-text-light"
                >
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
export default Register;
