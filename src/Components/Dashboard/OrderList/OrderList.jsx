import { useState } from "react"
import OrderItem from "../OrderItem/OrderItem"

const OrderList = ({ orders, loading, error, onStatusUpdate, onDeleteOrder }) => {
  const [filter, setFilter] = useState("all")

  // Group orders by status
  const getFilteredOrders = () => {
    if (filter === "all") {
      return orders
    }
    return orders.filter((order) => order.status.toLowerCase() === filter.toLowerCase())
  }

  // Separate active and completed orders
  const getActiveOrders = () => {
    return orders.filter((order) => ["pending", "processing", "shipped"].includes(order.status.toLowerCase()))
  }

  const getCompletedOrders = () => {
    return orders.filter((order) => ["delivered", "completed", "cancelled"].includes(order.status.toLowerCase()))
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Orders</h2>
        </div>
        <div className="animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b border-gray-200 py-4">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  const activeOrders = getActiveOrders()
  const completedOrders = getCompletedOrders()

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800">Orders ({orders.length})</h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === "all" ? "bg-[#f98c25] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("processing")}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === "processing" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Processing
          </button>
          <button
            onClick={() => setFilter("shipped")}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === "shipped" ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Shipped
          </button>
          <button
            onClick={() => setFilter("delivered")}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === "delivered" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Delivered
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              filter === "completed" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {filter === "all" ? (
        <>
          {/* Active Orders Section */}
          {activeOrders.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Active Orders</h3>
              <div className="space-y-6">
                {activeOrders.map((order) => (
                  <OrderItem
                    key={order._id}
                    order={order}
                    onStatusUpdate={onStatusUpdate}
                    onDeleteOrder={onDeleteOrder}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed Orders Section */}
          {completedOrders.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Completed Orders</h3>
              <div className="space-y-6">
                {completedOrders.map((order) => (
                  <OrderItem
                    key={order._id}
                    order={order}
                    onStatusUpdate={onStatusUpdate}
                    onDeleteOrder={onDeleteOrder}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-6">
          {getFilteredOrders().map((order) => (
            <OrderItem key={order._id} order={order} onStatusUpdate={onStatusUpdate} onDeleteOrder={onDeleteOrder} />
          ))}
        </div>
      )}

      {getFilteredOrders().length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === "all" ? "You have no orders yet." : `No ${filter} orders found.`}
          </p>
        </div>
      )}
    </div>
  )
}

export default OrderList

