import { FaShoppingBag, FaMoneyBillWave, FaCalendarDay, FaChartLine } from "react-icons/fa"

const OrderSummary = ({ metrics }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#f98c25]">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-orange-100 mr-4">
            <FaShoppingBag className="text-[#f98c25] text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-800">{metrics.totalOrders}</h3>
          </div>
        </div>
      </div>

      {/* Total Revenue */}
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 mr-4">
            <FaMoneyBillWave className="text-green-500 text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
            <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(metrics.totalRevenue)}</h3>
          </div>
        </div>
      </div>

      {/* Today's Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 mr-4">
            <FaCalendarDay className="text-blue-500 text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Today's Orders</p>
            <h3 className="text-2xl font-bold text-gray-800">{metrics.todayOrders}</h3>
          </div>
        </div>
      </div>

      {/* Today's Revenue */}
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 mr-4">
            <FaChartLine className="text-purple-500 text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Today's Revenue</p>
            <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(metrics.todayRevenue)}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary

