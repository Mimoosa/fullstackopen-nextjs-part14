import { generateNewToken } from "../actions/users";
import { getUserInfo } from "../actions/users";
import { notFound } from "next/navigation";

const MyPage = async () => {
  const user = await getUserInfo();

  if (user === null) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="font-bold text-3xl mb-5">My Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Username: {user?.username}</p>
      <h3 className="text-lg mt-5">API Token</h3>
      {user?.token ? (
        <div className="bg-gray-800 rounded p-3 mt-2">
          <p>Current token:</p>
          <p> {user?.token}</p>
        </div>
      ) : (
        <p>no token generated</p>
      )}
      <form action={generateNewToken}>
        <button className="border rounded p-3 hover:bg-gray-700 mt-5">
          Generate New Token
        </button>
      </form>
    </div>
  );
};

export default MyPage;
