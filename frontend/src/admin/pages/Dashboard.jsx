import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiShoppingBag,
  FiBox,
  FiUsers,
  FiDollarSign,
} from "react-icons/fi";

const Dashboard = () => {
  const [stats, setStats] = useState({
    orders: 0,
    products: 0,
    users: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const loadDashboard = () => {
    axios
      .get("http://localhost:3000/api/admin/dashboard")
      .then((res) => {
        setStats(res.data.stats);
        setRecentOrders(res.data.recentOrders);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#1A1A1A]">
          Dashboard
        </h1>
        <p className="text-sm text-[#8E8E8E]">
          Store overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FiShoppingBag />}
          label="Orders"
          value={stats.orders}
        />
        <StatCard
          icon={<FiBox />}
          label="Products"
          value={stats.products}
        />
        <StatCard
          icon={<FiUsers />}
          label="Users"
          value={stats.users}
        />
        <StatCard
          icon={<FiDollarSign />}
          label="Revenue"
          value={`₹${stats.revenue}`}
        />
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="font-medium">Recent Orders</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-[#F7F7F7]">
            <tr>
              <th className="p-4 text-left">Order</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-4 font-medium">
                  #{order._id.slice(-6)}
                </td>
                <td>{order.customerName}</td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <span className="text-xs px-2 py-1 rounded-full bg-[#E5E5E5]">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {recentOrders.length === 0 && (
          <p className="p-6 text-center text-[#8E8E8E]">
            No recent orders
          </p>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => {
  return (
    <div className="bg-white rounded-xl border p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-[#F7F7F7] flex items-center justify-center text-[#0B0B0B]">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#8E8E8E]">{label}</p>
        <p className="text-lg font-semibold text-[#1A1A1A]">
          {value}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
