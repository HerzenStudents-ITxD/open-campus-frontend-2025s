import Sidebar from "../components/Shared/Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="admin-wrapper d-flex">
      <div className="admin-sidebar hover-expand">
        <Sidebar />
      </div>

      <div className="admin-content flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
