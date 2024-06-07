import { NavLink, Outlet } from "react-router-dom";
import "./Appointments.css";

const Appointments = () => {
  return (
    <div className="appmain">
      <div className="appointmentsmain">
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to={"/appointments/chosen"}
          style={{ textDecoration: "none" }}
        >
          {" "}
          My Available Times
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to={"/appointments/selected"}
          style={{ textDecoration: "none" }}
        >
          {" "}
          Appointments
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default Appointments;
