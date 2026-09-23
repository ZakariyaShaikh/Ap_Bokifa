import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;