import { Link } from "react-router-dom";
import CustomButton from "./customButton";
import { useState } from "react";
import Auth from "../Services/authentication";
import localforage from "localforage";
import { ToastContainer, toast } from 'react-toastify';

export default function FormField() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await Auth.signIn(user);
      localforage
        .setItem("currentUserToken", JSON.stringify(response.data))
        .then((value) => {
          if (value) {
            window.location.href = "/";
          }
        });
    } catch (error) {
      toast.error( error.response.data.message
      )
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className=" w-80">
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label
              className="text-dark-blue font-medium"
              htmlFor="emailOrUsername"
            >
              Email
            </label>
            <br />
            <input
              className=" mt-2 w-80 h-11 border border-dark-blue rounded-md text-black pl-2  focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
              type="email"
              autoComplete="email"
              id="email"
              aria-describedby="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <label className="text-dark-blue font-medium" htmlFor="password">
            Password
          </label>
          <br />
          <input
            className=" mt-2 w-80 h-11 border border-dark-blue rounded-md text-black pl-2  focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />

          <CustomButton
            isLoading={isLoading}
            type={"submit"}
            content={"Log in"}
            classname={
              "w-80 h-12 bg-dark-blue text-white mt-8 mb-4 text-[16px]"
            }
          />
          <ToastContainer position="top-center" />
        </form>
        <div className="flex justify-center">
          <a
            className="text-gray-500 font-medium text-center hover:text-dark-blue"
            href="#"
          >
            Forgot your password?
          </a>
        </div>
      </div>
      <Divider className={"bg-gray-400"} />
      <div className="flex justify-center mb-11">
        <p className="text-black mr-2">Don't have an account?</p>
        <Link
          to={"/signup"}
          className="text-gray-500 font-medium text-center hover:text-dark-blue hover:font-semibold"
        >
          Sign up for MindBridge
        </Link>
      </div>
    </>
  );
}

export function Divider({ className }) {
  return <div className={`h-[1px]  w-3/4 mt-9 mb-11 ${className}`}></div>;
}
