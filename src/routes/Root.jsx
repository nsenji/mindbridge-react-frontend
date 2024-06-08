import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Root;
