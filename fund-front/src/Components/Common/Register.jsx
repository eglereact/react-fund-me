import { useEffect, useState } from "react";
import useServerPost from "../../Hooks/useServerPost";
import { REDIRECT_AFTER_REGISTER } from "../../Constants/urls";
import Input from "../Forms/Input";
import useRegister from "../../Validations/useRegister";

const Register = () => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  const [form, setForm] = useState(defaultValues);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { doAction, response } = useServerPost("register");
  const { errors, validate, setServerErrors } = useRegister();
  useEffect(() => {
    if (null === response) {
      return;
    }
    setButtonDisabled(false);
    if (response.type === "success") {
      window.location.hash = REDIRECT_AFTER_REGISTER;
    } else {
      if (response.data?.response?.data?.errors) {
        setServerErrors(response.data.response.data.errors);
      }
    }
  }, [response]);

  const handleForm = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    //validations
    if (!validate(form)) {
      return;
    }
    setButtonDisabled(true);
    doAction({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-[1600px] m-auto flex flex-col md:flex-row h-[100vh]">
        <section className="hidden md:w-1/2  md:flex items-center justify-center p-10">
          <img src="./images/zalia.png" alt="Plant" className="rounded-lg" />
        </section>
        <section className="bg-white w-full lg:w-1/2 p-10 xl:px-44 rounded  flex-1 flex flex-col justify-center">
          <div className="text-center">
            <h1 className="text-5xl text-light font-bold mb-4">
              Join Us Today
            </h1>
            <h3 className="text-xl text-gray-900  mb-10">
              Enter your email, name and password to register.
            </h3>
          </div>
          <form className="space-y-4">
            <Input
              label=" Your name"
              type="text"
              name="name"
              onChange={handleForm}
              value={form.name}
              placeholder="Jon Doe"
              autoComplete="username"
              errors={errors}
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              onChange={handleForm}
              value={form.email}
              placeholder="jondoe@example.com"
              autoComplete="email"
              errors={errors}
            />

            <Input
              label="Your Password"
              type="password"
              name="password"
              onChange={handleForm}
              value={form.password}
              placeholder="**********"
              autoComplete="new-password"
              errors={errors}
            />

            <Input
              label=" Repeat Password"
              type="password"
              name="password2"
              onChange={handleForm}
              value={form.password2}
              placeholder="**********"
              autoComplete="new-password"
              errors={errors}
            />

            <div>
              <button
                onClick={handleSubmit}
                className="button-dark disabled:bg-gray-400 active:scale-75 transition-transform"
                type="button"
                disabled={buttonDisabled}
              >
                register now
              </button>
            </div>
            <div className="flex space-x-2 text-gray-900 justify-center w-full">
              <p>
                <span className="text-gray-400">Already have an account? </span>
                <a
                  href="/#login"
                  className="hover:underline hover:hover-text-light"
                >
                  Sign in
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
