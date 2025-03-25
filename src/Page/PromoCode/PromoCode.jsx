"use client"

import { useState, useEffect } from "react"
import useAxios from "../../Hooks/useAxios"

const PromoCode = () => {
  const axios = useAxios()
  const [promoCodes, setPromoCodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [addLoading, setAddLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage", // percentage or fixed
    discountAmount: "",
    expiryDate: "",
    minimumPurchase: "",
    usageLimit: "",
    isActive: true,
  })

  // Fetch promo codes
  const fetchPromoCodes = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/promo-codes")
      setPromoCodes(response.data)
      setError(null)
    } catch (err) {
      console.error("Error fetching promo codes:", err)
      setError("Failed to load promo codes")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPromoCodes()
  }, [axios])

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Add new promo code
  const handleAddPromoCode = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.code) {
      setError("Please provide a promo code")
      return
    }

    try {
      setAddLoading(true)

      // Create the payload according to what the server expects
      const payload = {
        code: formData.code,
        discountPercent: formData.discountType === "percentage" ? Number(formData.discountAmount) : 0,
        discountFixed: formData.discountType === "fixed" ? Number(formData.discountAmount) : 0,
        discountType: formData.discountType,
        expiryDate: formData.expiryDate,
        minimumPurchase: formData.minimumPurchase ? Number(formData.minimumPurchase) : 0,
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : 0,
        isActive: formData.isActive,
      }

      await axios.post("/promo-codes", payload)
      setFormData({
        code: "",
        discountType: "percentage",
        discountAmount: "",
        expiryDate: "",
        minimumPurchase: "",
        usageLimit: "",
        isActive: true,
      })
      setIsAdding(false)
      fetchPromoCodes()
      setError(null)
    } catch (err) {
      console.error("Error adding promo code:", err)
      setError("Failed to add promo code: " + (err.response?.data?.error || err.message))
    } finally {
      setAddLoading(false)
    }
  }

  // Delete promo code
  const handleDeletePromoCode = async (id) => {
    try {
      setDeleteLoading(id)
      await axios.delete(`/promo-codes/${id}`)
      setPromoCodes(promoCodes.filter((code) => code._id !== id))
      setError(null)
    } catch (err) {
      console.error("Error deleting promo code:", err)
      setError("Failed to delete promo code")
    } finally {
      setDeleteLoading(null)
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Check if promo code is expired
  const isExpired = (dateString) => {
    const expiryDate = new Date(dateString)
    const today = new Date()
    return expiryDate < today
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Promo Code Management</h1>
        <button onClick={() => setIsAdding(!isAdding)} className="btn bg-[#f98c25] text-white">
          {isAdding ? "Cancel" : "Add New Promo Code"}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button className="float-right" onClick={() => setError(null)}>
            ×
          </button>
        </div>
      )}

      {/* Add Promo Code Form */}
      {isAdding && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8 border">
          <h2 className="text-xl font-semibold mb-4">Add New Promo Code</h2>
          <form onSubmit={handleAddPromoCode}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Promo Code */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Promo Code*</span>
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g. SUMMER2023"
                  className="input input-bordered w-full"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Code must be unique</p>
              </div>

              {/* Discount Type */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Discount Type*</span>
                </label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>

              {/* Discount Amount */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Discount Amount*</span>
                </label>
                <input
                  type="number"
                  name="discountAmount"
                  value={formData.discountAmount}
                  onChange={handleChange}
                  placeholder={formData.discountType === "percentage" ? "e.g. 10" : "e.g. 5.99"}
                  className="input input-bordered w-full"
                  min="0"
                  step={formData.discountType === "percentage" ? "1" : "0.01"}
                  required
                />
              </div>

              {/* Expiry Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Expiry Date*</span>
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Minimum Purchase */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Minimum Purchase</span>
                </label>
                <input
                  type="number"
                  name="minimumPurchase"
                  value={formData.minimumPurchase}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  className="input input-bordered w-full"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty for no minimum</p>
              </div>

              {/* Usage Limit */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Usage Limit</span>
                </label>
                <input
                  type="number"
                  name="usageLimit"
                  value={formData.usageLimit}
                  onChange={handleChange}
                  placeholder="e.g. 100"
                  className="input input-bordered w-full"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty for unlimited usage</p>
              </div>

              {/* Active Status */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">Active</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button type="submit" className="btn bg-[#f98c25] text-white" disabled={addLoading}>
                {addLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Adding...
                  </>
                ) : (
                  "Add Promo Code"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Promo Codes List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : promoCodes.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No promo codes found</p>
              <button onClick={() => setIsAdding(true)} className="btn btn-sm bg-[#f98c25] text-white mt-4">
                Add Your First Promo Code
              </button>
            </div>
          ) : (
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th>Code</th>
                  <th>Discount</th>
                  <th>Expiry Date</th>
                  <th>Min. Purchase</th>
                  <th>Usage Limit</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {promoCodes.map((code) => (
                  <tr key={code._id} className="border-b">
                    <td className="font-medium">{code.code}</td>
                    <td>
                      {code.discountType === "percentage"
                        ? `${code.discountPercent}%`
                        : `$${Number.parseFloat(code.discountFixed || 0).toFixed(2)}`}
                    </td>
                    <td>
                      <span className={isExpired(code.expiryDate) ? "text-red-500" : ""}>
                        {formatDate(code.expiryDate)}
                      </span>
                    </td>
                    <td>{code.minimumPurchase ? `$${Number.parseFloat(code.minimumPurchase).toFixed(2)}` : "None"}</td>
                    <td>{code.usageLimit || "Unlimited"}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          !code.isActive || isExpired(code.expiryDate)
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {!code.isActive ? "Inactive" : isExpired(code.expiryDate) ? "Expired" : "Active"}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeletePromoCode(code._id)}
                        className="btn btn-sm btn-error text-white"
                        disabled={deleteLoading === code._id}
                      >
                        {deleteLoading === code._id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default PromoCode

