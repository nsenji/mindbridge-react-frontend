import { Link } from "react-router-dom";
import CustomButton from "./customButton";
import Auth from "../Services/authentication";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpFormField() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    rate: "",
    gender: "",
    languages_spoken: "",
    hospitalName: "",
    pro_title: "",
    med_specialty: "",
    employment_status: "",
    password: "",
    confirmpassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      let response = await Auth.signUp(details);
      if (response) {
        navigate("/login-test");
      }
    } catch (error) {
      console.log(error.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit} className=" flex flex-col">
          <div className="flex mb-4">
            <div className="mb-3 mr-5">
              <label
                className="text-dark-blue font-medium"
                htmlFor="emailOrUsername"
              >
                Full Name
              </label>
              <br />
              <input
                className=" mt-2 w-80 h-11 border border-dark-blue rounded-md text-black pl-2  focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                type="text"
                id="name"
                aria-describedby="name"
                value={details.name}
                onChange={(e) =>
                  setDetails({ ...details, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3 ml-5">
              <label className="text-dark-blue font-medium" htmlFor="password">
                Email
              </label>
              <br />
              <input
                className=" mt-2 w-80 h-11 border border-dark-blue rounded-md text-black pl-2  focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                type="email"
                autoComplete="username"
                id="email"
                aria-describedby="email"
                value={details.email}
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex mb-4">
            <div className="mb-3 mr-5">
              <label
                className="text-dark-blue font-medium"
                htmlFor="emailOrUsername"
              >
                Professional Title
              </label>
              <br />
              <input
                className=" mt-2 w-80 h-11 border border-dark-blue rounded-md text-black pl-2  focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                type="text"
                id="title"
                value={details.pro_title}
                onChange={(e) =>
                  setDetails({ ...details, pro_title: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3 ml-5">
              <label className="text-dark-blue font-medium" htmlFor="password">
                Gender
              </label>
              <br />
              <input
                className=" mt-2 w-80 h-11 border border-dark-blue rounded-md text-black pl-2  focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                type="text"
                name="gender"
                value={details.gender}
                onChange={(e) =>
                  setDetails({ ...details, gender: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex  mb-4">
            <div className="mb-3 mr-5">
              <label
                className="text-dark-blue font-medium"
                htmlFor="emailOrUsername"
              >
                Languages spoken
              </label>
              <br />
              <input
                className=" mt-2 w-80 h-11 border border-dark-blue rounded-md text-black pl-2  focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                type="text"
                name="languages spoken"
                value={details.languages_spoken}
                onChange={(e) =>
                  setDetails({ ...details, languages_spoken: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3 ml-5">
              <label className="text-dark-blue font-medium" htmlFor="password">
                Hospital Name
              </label>
              <br />
              <input
                className=" mt-2 w-80 h-11 border border-dark-blue rounded-md text-black pl-2  focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                type="text"
                id="hospitalname"
                value={details.hospitalName}
                onChange={(e) =>
                  setDetails({ ...details, hospitalName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex  mb-4">
            <div className="mb-3 mr-5">
              <label
                className="text-dark-blue font-medium"
                htmlFor="emailOrUsername"
              >
                Madical Specialty
              </label>
              <br />
              <input
                className=" mt-2 w-80 h-11 border border-dark-blue rounded-md text-black pl-2  focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                type="text"
                id="speciality"
                value={details.med_specialty}
                onChange={(e) =>
                  setDetails({ ...details, med_specialty: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3 ml-5">
              <label className="text-dark-blue font-medium" htmlFor="password">
                Consultation rate
              </label>
              <br />
              <input
                className=" mt-2 w-80 h-11 border border-dark-blue rounded-md text-black pl-2  focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                type="number"
                id="rate"
                placeholder={"In ugx"}
                value={details.rate}
                onChange={(e) =>
                  setDetails({ ...details, rate: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex mb-4 ">
            <div className="mb-3 mr-5">
              <label
                className="text-dark-blue font-medium"
                htmlFor="emailOrUsername"
              >
                Employment status
              </label>
              <br />
              <input
                className=" mt-2 w-80 h-11 border border-dark-blue rounded-md text-black pl-2  focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                type="text"
                placeholder={"Full time, Freelance etc"}
                id="employment"
                name="employmentstatus"
                value={details.employment_status}
                onChange={(e) =>
                  setDetails({ ...details, employment_status: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3 ml-5">
              <label className="text-dark-blue font-medium" htmlFor="password">
                Password
              </label>
              <br />
              <input
                className=" mt-2 w-80 h-11 border border-dark-blue rounded-md text-black pl-2  focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                type="password"
                name="password"
                autoComplete="current-password"
                value={details.password}
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex mb-4 ">
            <div className="mb-3 mr-5">
              <label
                className="text-dark-blue font-medium"
                htmlFor="emailOrUsername"
              >
                Confirm Password
              </label>
              <br />
              <input
                className=" mt-2 w-80 h-11 border border-dark-blue rounded-md text-black pl-2  focus:outline-none focus:ring-2 bg-white focus:ring-blue-500 focus:border-blue-500"
                type="password"
                id="confirmpassword"
                autoComplete="new-password"
                value={details.confirmpassword}
                onChange={(e) =>
                  setDetails({ ...details, confirmpassword: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3 ml-5">
              <CustomButton
                isLoading={isLoading}
                type={"submit"}
                isDisabled={!(details.password == details.confirmpassword)}
                content={"Create account"}
                classname={
                  "w-80 h-12 bg-dark-blue text-white mt-8 mb-4 text-[16px]"
                }
              />
            </div>
          </div>
        </form>
      </div>
      <Divider className={"bg-gray-400"} />
      <div className="flex justify-center mb-11">
        <p className="text-black mr-2">Already have an account?</p>
        <Link
          to={"/login-test"}
          className="text-gray-500 font-medium text-center hover:text-dark-blue hover:font-semibold"
        >
          Log in to MindBridge
        </Link>
      </div>
    </>
  );
}

export function Divider({ className }) {
  return <div className={`h-[1px]  w-3/4 mt-9 mb-11 ${className}`}></div>;
}
