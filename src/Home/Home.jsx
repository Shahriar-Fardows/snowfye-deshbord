import { TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight, Search, Bell } from "lucide-react"

const Home = () => {
  // Sample data for stats cards
  const stats = [
    {
      title: "Total Revenue",
      value: "$24,560",
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Total Orders",
      value: "1,243",
      change: "+8.2%",
      isPositive: true,
      icon: ShoppingBag,
      color: "bg-accent/10 text-accent",
    },
    {
      title: "New Customers",
      value: "356",
      change: "+4.3%",
      isPositive: true,
      icon: Users,
      color: "bg-secondary/10 text-secondary",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-0.5%",
      isPositive: false,
      icon: TrendingUp,
      color: "bg-info/10 text-info",
    },
  ]

  // Sample data for recent orders
  const recentOrders = [
    { id: "#ORD-7352", customer: "John Doe", date: "2023-03-19", status: "Delivered", amount: "$125.00" },
    { id: "#ORD-7351", customer: "Jane Smith", date: "2023-03-18", status: "Processing", amount: "$245.99" },
    { id: "#ORD-7350", customer: "Robert Johnson", date: "2023-03-18", status: "Pending", amount: "$89.50" },
    { id: "#ORD-7349", customer: "Emily Davis", date: "2023-03-17", status: "Delivered", amount: "$432.25" },
    { id: "#ORD-7348", customer: "Michael Brown", date: "2023-03-17", status: "Cancelled", amount: "$65.00" },
  ]

  // Sample data for top products
  const topProducts = [
    { name: "Wireless Headphones", sales: 245, stock: 43, price: "$89.99" },
    { name: "Smart Watch Series 5", sales: 190, stock: 21, price: "$299.99" },
    { name: "Laptop Pro 2023", sales: 87, stock: 14, price: "$1299.00" },
    { name: "Smartphone Ultra", sales: 65, stock: 38, price: "$899.00" },
  ]

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "badge-success"
      case "Processing":
        return "badge-info"
      case "Pending":
        return "badge-warning"
      case "Cancelled":
        return "badge-error"
      default:
        return "badge-ghost"
    }
  }

  return (
    <div className="min-h-screen bg-base-100">

      {/* Main content */}
      <div className="md:ml-20 lg:ml-64 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-base-content/60">Welcome back, Admin</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <input type="text" placeholder="Search..." className="input input-bordered w-full md:w-64 pl-10" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/60" size={18} />
            </div>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <Bell size={20} />
                  <span className="badge badge-sm badge-primary indicator-item">3</span>
                </div>
              </div>
            </div>

            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="/placeholder.svg?height=40&width=40" alt="Avatar" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="card bg-base-100 shadow-md">
              <div className="card-body p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base-content/60 text-sm">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    <div className="flex items-center mt-2">
                      {stat.isPositive ? (
                        <ArrowUpRight size={16} className="text-success" />
                      ) : (
                        <ArrowDownRight size={16} className="text-error" />
                      )}
                      <span className={stat.isPositive ? "text-success text-sm" : "text-error text-sm"}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent orders */}
          <div className="card bg-base-100 shadow-md lg:col-span-2">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Recent Orders</h3>
                <button className="btn btn-sm btn-ghost">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.date}</td>
                        <td>
                          <span className={`badge ${getStatusClass(order.status)}`}>{order.status}</span>
                        </td>
                        <td>{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Top products */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Top Products</h3>
                <button className="btn btn-sm btn-ghost">View All</button>
              </div>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-base-content/60">Sales: {product.sales}</span>
                        <span className="text-xs text-base-content/60">Stock: {product.stock}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

