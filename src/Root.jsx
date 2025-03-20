import { Outlet } from "react-router-dom";
import Sidebar from "./Shared/Sidebar/Sidebar";

const Root = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1  bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
