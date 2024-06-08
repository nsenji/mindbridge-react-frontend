import { Link } from "react-router-dom";
import CustomButton from "./customButton";

export default function FormField() {
  return (
    <>
      <div className=" w-80">
        <form>
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
              type="text"
              name="emailOrUsername"
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
            required
          />

          <CustomButton
            content={"Log in"}
            classname={
              "w-80 h-12 bg-dark-blue text-white mt-8 mb-4 text-[16px]"
            }
          />
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
        <a
          className="text-gray-500 font-medium text-center hover:text-dark-blue hover:font-semibold"
          href="#"
        >
          Sign up for MindBridge
        </a>
      </div>
    </>
  );
}

export function Divider({ className }) {
  return <div className={`h-[1px]  w-3/4 mt-9 mb-11 ${className}`}></div>;
}
