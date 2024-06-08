import { createBrowserRouter } from "react-router-dom";
import Root from "./Components/Root";
import History from "./routes/History.jsx";
import Appointments from "./Pages/Appointments/Appointments";
import AppointmentSchedule from "./Components/AppointmentSchedule/AppointmentSchedule";
import UpcomingApp from "./Components/UpcomingAppointments/UpcomingApp";
import Earnings from "./routes/Earnings.jsx";
import Signup from "./Pages/Authentication/Signup";
import Login from "./Pages/Authentication/Login";
import MeetingRoom from "./routes/Meeting";
import { Navigate } from "react-router-dom";
import Profile from "./routes/profile.jsx";
import DashBoard from "./routes/DashBoard";
import ScheduleRoute from "./routes/ScheduleRoute.jsx";
import LoginTest from "./routes/login-test.jsx"
import SignUpTest from "./routes/signup-test.jsx";

const Router = (isAuthenticated) => [
  {
    path: "/",
    element: isAuthenticated ? <Root /> : <Navigate to={"/login"} />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/schedule",
        element: <ScheduleRoute />,
      },

      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/earnings",
        element: <Earnings />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/call-room",
        element: <MeetingRoom />,
      },
     
    //  { path:"/signup-test",
    //   element: },
    ],
  },
  { path:"/login-test",
    element: <LoginTest/>},
  { path:"/signup-test",
    element: <SignUpTest/>},

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/login",
    element: <Login />,
  },
];

export default Router;
