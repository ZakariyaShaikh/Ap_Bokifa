import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Authors", path: "/admin/authors" },
  { icon: BookOpen, label: "Books", path: "/admin/books" },
  { icon: FileText, label: "Blogs", path: "/admin/blogs" },
];

const Sidebar = ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-16" : "w-64"}
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          bg-white border-r border-gray-200 shadow-sm`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {!isCollapsed && (
            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0f5a45] flex items-center justify-center">
                <span className="text-white font-bold text-sm">AP</span>
              </div>
              <span className="font-semibold text-[#0f5a45]">AP Bokifa</span>
            </Link>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-[#0f5a45] flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">AP</span>
            </div>
          )}

          {/* Mobile Close */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${isActive
                    ? "bg-[#0f5a45] text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#0f5a45]"
                  }
                  ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : ""}`} />
                {!isCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle - Desktop Only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute bottom-4 right-0 translate-x-1/2 w-6 h-6 items-center justify-center 
            bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;