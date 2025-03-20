import { useState } from "react"
import { Home, ShoppingBag, Users, BarChart2, Settings, Package, MessageSquare, LogOut, Menu, X } from "lucide-react"

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: ShoppingBag, label: "Orders" },
    { icon: Package, label: "Products" },
    { icon: Users, label: "Customers" },
    { icon: BarChart2, label: "Analytics" },
    { icon: MessageSquare, label: "Reviews" },
    { icon: Settings, label: "Settings" },
  ]

  const sidebarClasses = `
    h-screen bg-base-200 text-base-content fixed top-0 left-0 z-40
    transition-all duration-300 ease-in-out
    ${collapsed ? "w-20" : "w-64"}
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-primary-content md:hidden"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-base-300">
            {collapsed ? (
              <div className="text-2xl font-bold">E</div>
            ) : (
              <div className="text-2xl font-bold">EShopDash</div>
            )}
          </div>

          {/* Toggle button (desktop only) */}
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-20 bg-primary text-primary-content p-1 rounded-full hidden md:block"
          >
            {collapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            )}
          </button>

          {/* Menu items */}
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="menu menu-md px-3 gap-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    className={`flex items-center ${item.active ? "bg-primary text-primary-content" : "hover:bg-base-300"}`}
                  >
                    <item.icon size={20} />
                    {!collapsed && <span>{item.label}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Logout button */}
          <div className="p-4 border-t border-base-300">
            <button className="btn btn-outline btn-block flex items-center justify-center gap-2">
              <LogOut size={20} />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

