import Link from "next/link";
import { getUsers } from "../services/users";

const Users = async () => {
  const users = await getUsers();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="font-bold text-3xl mb-5">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.username}
            className="border rounded p-3 hover:bg-gray-700 mt-5"
          >
            <Link
              href={`/users/${user.username}`}
              className="text-amber-600 hover:underline"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
