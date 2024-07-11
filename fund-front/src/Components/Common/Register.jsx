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
    <div className="bg-light-grey h-[100vh] center-all">
      <div className="max-w-[1200px] m-auto w-1/3">
        <section className="bg-white p-10 rounded shadow-sm">
          <h1 className="text-5xl text-dark font-bold mb-10">Sign Up</h1>
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
                className="button-light disabled:bg-gray-400"
                type="button"
                disabled={buttonDisabled}
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
