import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root.jsx";
import History from "./routes/History.jsx";

import Earnings from "./routes/Earnings.jsx";
import MeetingRoom from "./routes/Meeting";
import { Navigate } from "react-router-dom";
import Profile from "./routes/profile.jsx";
import DashBoard from "./routes/DashBoard";
import ScheduleRoute from "./routes/ScheduleRoute.jsx";
import Login from "./routes/login.jsx";
import SignUp from "./routes/signup.jsx";

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
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
];

export default Router;
