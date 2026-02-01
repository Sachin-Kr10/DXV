import { useEffect, useState } from "react";
import axios from "axios";
import { FiEye } from "react-icons/fi";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    axios
      .get("")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = (id, status) => {
    axios
      .patch(`http://localhost:3000/api/admin/orders/${id}/status`, {
        status,
      })
      .then(loadOrders)
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#1A1A1A]">
          Orders
        </h1>
        <p className="text-sm text-[#8E8E8E]">
          Manage customer orders
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F7F7F7]">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-4 font-medium">
                  #{order._id.slice(-6)}
                </td>

                <td>{order.customerName}</td>

                <td>₹{order.totalAmount}</td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border rounded-lg px-2 py-1 text-xs"
                  >
                    <option value="placed">Placed</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="p-4 text-right">
                  <button className="text-[#8E8E8E] hover:text-[#0B0B0B]">
                    <FiEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="p-6 text-center text-[#8E8E8E]">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
