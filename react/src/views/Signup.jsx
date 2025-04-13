import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from './../axios.js';
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
  const {setCurrentUser, setUserToken} = useStateContext();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({ __html: "" });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/signup", {
        name: fullname,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then(({ data }) => {
        if(data.user) {
          setCurrentUser(data.user);
        }
        if(data.token) {
          setUserToken(data.token);
        }
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
          setError({__html: finalErrors.join('<br>')})
        }
        console.error(error)
      });
  };

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign up for free
      </h2>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {error.__html && (<div className="bg-red-500 rounded py-2 px-3 mb-7 text-white" dangerouslySetInnerHTML={error}>
        </div>)}
        <form
          onSubmit={handleOnSubmit}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full name
            </label>
            <div className="mt-2">
              <input
                id="full-name"
                name="name"
                type="text"
                autoComplete="Full name"
                required
                value={fullname}
                onChange={ev => setFullname(ev.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={ev => setEmail(ev.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password-confirmation"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password Confirmation
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password-confirmation"
                name="password_confirmation"
                type="password"
                autoComplete="password-confirmation"
                required
                value={passwordConfirmation}
                onChange={ev => setPasswordConfirmation(ev.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
          <div>
            <p className="font-bold mt-10 text-center text-sm text-gray-500">
              Or {"  "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login with your account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
