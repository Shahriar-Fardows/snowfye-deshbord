
import {  useEffect, useState } from "react"
import useAxios from "../Hooks/useAxios"
import OrderSummary from "../Components/Dashboard/OrderSummary/OrderSummary"
import OrderList from "../Components/Dashboard/OrderList/OrderList"

const Dashboard = () => {
  const axios = useAxios()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    todayOrders: 0,
    todayRevenue: 0,
  })

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/orders")
      const fetchedOrders = response.data

      // Sort orders by date (newest first)
      fetchedOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))

      setOrders(fetchedOrders)
      calculateMetrics(fetchedOrders)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching orders:", err)
      setError("Failed to load orders. Please try again.")
      setLoading(false)
      
    }
  }

  const calculateMetrics = (orderData) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let totalRevenue = 0
    let todayOrders = 0
    let todayRevenue = 0

    orderData.forEach((order) => {
      // Add to total revenue
      totalRevenue += order.orderSummary.total

      // Check if order is from today
      const orderDate = new Date(order.orderDate)
      orderDate.setHours(0, 0, 0, 0)

      if (orderDate.getTime() === today.getTime()) {
        todayOrders++
        todayRevenue += order.orderSummary.total
      }
    })

    setMetrics({
      totalOrders: orderData.length,
      totalRevenue: totalRevenue,
      todayOrders: todayOrders,
      todayRevenue: todayRevenue,
    })
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`/orders/${orderId}`, { status: newStatus })

      // Update local state
      const updatedOrders = orders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order))

      setOrders(updatedOrders)
      calculateMetrics(updatedOrders)
    } catch (err) {
      console.error("Error updating order status:", err)
      alert("Failed to update order status. Please try again.")
    }
  }

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`/orders/${orderId}`)

        // Update local state
        const updatedOrders = orders.filter((order) => order._id !== orderId)
        setOrders(updatedOrders)
        calculateMetrics(updatedOrders)
      } catch (err) {
        console.error("Error deleting order:", err)
        alert("Failed to delete order. Please try again.")
      }
    }
  }

 

  return (
    <div className="min-h-screen py-8">
      <div className=" px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Order Management</h1>

        {/* Order Summary Metrics */}
        <OrderSummary metrics={metrics} />

        {/* Order List */}
        <OrderList
          orders={orders}
          loading={loading}
          error={error}
          onStatusUpdate={handleStatusUpdate}
          onDeleteOrder={handleDeleteOrder}
        />
      </div>
    </div>
  )
}

export default Dashboard

