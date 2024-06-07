import { useState } from "react";
import Auth from "../../Services/authentication";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-main.png";
import "./style.css";

export default function Signup() {
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
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      let doctorsignup = await Auth.signUp(details);
      setResponse(doctorsignup.message);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  if (response) {
    return (
      <div className="response">
        <img src={logo} />
        <div className="center">
          <h4>Account Created Successfully!</h4>
          <button className="btn">
            <Link to={"/login"}>Proceed to Login</Link>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="signup">
      <div className="signupleft">
        <img
          src={logo}
          style={{ height: "42px", width: "190px" }}
          className="logo-image"
        />
        <div>
          <p>Creating a better world starting with mental health.</p>
          <p>Create an Account with Us!</p>
        </div>
      </div>
      <form className="signupform" onSubmit={handleSubmit}>
        <img
          src={logo}
          style={{ height: "50px", width: "220px" }}
          className="align-self-center"
        />
        {error && (
          <span className="text-danger align-self-center">{error}</span>
        )}
        <div className="mb-2">
          <input
            placeholder={"Full Name"}
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <input
            placeholder={"Email"}
            type="email"
            className="form-control"
            autoComplete="username"
            id="email"
            aria-describedby="email"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <div className="mb-2">
            <input
              placeholder={"Professional Title"}
              type="text"
              className="form-control"
              id="title"
              value={details.pro_title}
              onChange={(e) =>
                setDetails({ ...details, pro_title: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <select
              name="Gender"
              className="form-select"
              aria-label="select"
              value={details.gender}
              onChange={(e) =>
                setDetails({ ...details, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div className="mb-2">
          <textarea
            placeholder={"Language(s) Spoken"}
            className="form-control"
            id="languages"
            rows="2"
            value={details.languages_spoken}
            onChange={(e) =>
              setDetails({ ...details, languages_spoken: e.target.value })
            }
            required
          ></textarea>
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder={"Hospital Name"}
            className="form-control"
            id="hospitalname"
            value={details.hospitalName}
            onChange={(e) =>
              setDetails({ ...details, hospitalName: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            rows="3"
            type="text"
            placeholder={"Medical Speciality"}
            className="form-control"
            id="speciality"
            value={details.med_specialty}
            onChange={(e) =>
              setDetails({ ...details, med_specialty: e.target.value })
            }
            required
          ></textarea>
        </div>
        <div className="mb-2">
          <input
            type="number"
            placeholder={"Consultation Rate"}
            className="form-control"
            id="rate"
            value={details.rate}
            onChange={(e) => setDetails({ ...details, rate: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <select
            className="form-select"
            id="employment"
            name="employmentstatus"
            value={details.employment_status}
            onChange={(e) =>
              setDetails({ ...details, employment_status: e.target.value })
            }
          >
            <option value="">Select Employment Status</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        <div className="mb-2">
          <input
            type="password"
            placeholder={"Password"}
            className="form-control"
            id="password"
            autoComplete="current-password"
            value={details.password}
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-2">
          <input
            placeholder={"Confirm Password"}
            type="password"
            className="form-control"
            id="confirmpassword"
            autoComplete="new-password"
            value={details.confirmpassword}
            onChange={(e) =>
              setDetails({ ...details, confirmpassword: e.target.value })
            }
            required
          />
        </div>
        <button
          className={
            !(details.password == details.confirmpassword)
              ? "align-self-center submit-btn-disabled"
              : "align-self-center submit-btn"
          }
          type="submit"
          style={{ width: "50%" }}
          disabled={!(details.password == details.confirmpassword)}
        >
          Submit
        </button>
        <span className="align-self-center">
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
}
