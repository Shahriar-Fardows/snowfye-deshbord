import { useState } from "react"
import { format } from "date-fns"

const OrderItem = ({ order, onStatusUpdate, onDeleteOrder }) => {
  const [expanded, setExpanded] = useState(false)

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy h:mm a")
    } catch (error) {
        console.log("Error formatting date:", error)
      return dateString
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-indigo-100 text-indigo-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Order Header */}
      <div className="bg-gray-50 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900">Order #{order._id.slice(-6)}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Placed on {formatDate(order.orderDate)}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">{formatCurrency(order.orderSummary.total)}</span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#f98c25] hover:text-[#e07b1a] text-sm font-medium"
          >
            {expanded ? "Hide Details" : "View Details"}
          </button>
        </div>
      </div>

      {/* Order Details (Expanded) */}
      {expanded && (
        <div className="p-4 border-t border-gray-200">
          {/* Customer Information */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  Name: <span className="text-gray-900">{order.customerInfo.name}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Email: <span className="text-gray-900">{order.customerInfo.email}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Phone: <span className="text-gray-900">{order.customerInfo.phone}</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Shipping Method: <span className="text-gray-900">{order.shippingMethod}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Payment Method: <span className="text-gray-900">{order.paymentMethod}</span>
                </p>
                {order.promoCode && (
                  <p className="text-sm text-gray-500">
                    Promo Code: <span className="text-gray-900">{order.promoCode}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Shipping Address:</p>
              <p className="text-sm text-gray-900 whitespace-pre-line">{order.customerInfo.address}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Size/Color
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={item.image || "/placeholder.svg"}
                              alt={item.productName}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.size} / {item.color}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatCurrency(item.price)}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.quantity}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatCurrency(item.totalPrice)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Order Summary</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between py-1">
                <span className="text-sm text-gray-500">Subtotal:</span>
                <span className="text-sm text-gray-900">{formatCurrency(order.orderSummary.subtotal)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-sm text-gray-500">Shipping:</span>
                <span className="text-sm text-gray-900">{formatCurrency(order.orderSummary.shipping)}</span>
              </div>
              {order.orderSummary.discount > 0 && (
                <div className="flex justify-between py-1">
                  <span className="text-sm text-gray-500">Discount:</span>
                  <span className="text-sm text-green-600">-{formatCurrency(order.orderSummary.discount)}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-t border-gray-200 mt-2 pt-2">
                <span className="text-sm font-medium text-gray-900">Total:</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(order.orderSummary.total)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 justify-end">
            <select
              value={order.status}
              onChange={(e) => onStatusUpdate(order._id, e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f98c25] focus:border-[#f98c25]"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              onClick={() => onDeleteOrder(order._id)}
              className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
            >
              Delete Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderItem

