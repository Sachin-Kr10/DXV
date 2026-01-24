import { useEffect, useState } from "react";
import axios from "axios";
import { FiUserX, FiUserCheck } from "react-icons/fi";

const Users = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    axios
      .get("http://localhost:3000/api/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleBlock = (id) => {
    axios
      .patch(`http://localhost:3000/api/admin/users/${id}/toggle`)
      .then(loadUsers)
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#1A1A1A]">
          Users
        </h1>
        <p className="text-sm text-[#8E8E8E]">
          Manage registered customers
        </p>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F7F7F7]">
            <tr>
              <th className="p-4 text-left">User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-4 font-medium">
                  {user.name}
                </td>

                <td>{user.email}</td>

                <td>
                  <span className="text-xs px-2 py-1 rounded-full bg-[#E5E5E5]">
                    {user.role || "user"}
                  </span>
                </td>

                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      user.isBlocked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>

                <td className="p-4 flex justify-end">
                  <button
                    onClick={() => toggleBlock(user._id)}
                    className="text-[#8E8E8E] hover:text-[#0B0B0B]"
                    title={user.isBlocked ? "Unblock" : "Block"}
                  >
                    {user.isBlocked ? (
                      <FiUserCheck size={18} />
                    ) : (
                      <FiUserX size={18} />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="p-6 text-center text-[#8E8E8E]">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default Users;
