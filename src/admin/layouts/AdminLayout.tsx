import Sidebar from "../components/Shared/Sidebar";
import { Outlet } from "react-router-dom"; // Для рендеринга дочерних маршрутов

function AdminLayout() {
  return (
    <div className="admin-wrapper">
      <div className="d-flex">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="admin-content">
          {/* Здесь будут рендериться дочерние компоненты */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
