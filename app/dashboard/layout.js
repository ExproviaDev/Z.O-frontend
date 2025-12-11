// /app/dashboard/layout.jsx
import Dashboard from "../Components/Dashboard/Dashboard";
import Sidebar from "../Components/Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <main>
      <Dashboard></Dashboard>
      <section className="max-w-7xl mx-auto px-5 pt-5 pb-16 flex justify-center  border-red-400">
        <Sidebar />
        <section className="flex-1 p-6">
          {children} {/* Dynamic content will be loaded here */}
        </section>
      </section>
    </main>
  );
};

export default DashboardLayout;
