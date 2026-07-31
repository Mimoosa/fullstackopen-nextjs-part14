import { generateNewToken } from "../actions/users";
import { getUserInfo } from "../actions/users";
import { getMyReadingLists } from "../services/readingLists";
import { markReadingListAsRead } from "../actions/readingLists";
import { redirect } from "next/navigation";
const MyPage = async () => {
  const user = await getUserInfo();
  if (user === null) {
    redirect("/login");
  }

  const readingLists = await getMyReadingLists();
  console.log("readingLists", readingLists);

  const unReadReadingLists = readingLists.filter((list) => list.read === false);
  const readReadingLists = readingLists.filter((list) => list.read === true);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div
        data-testid="user-profile"
        className="w-full border-b border-gray-400 py-5"
      >
        <h2 className="font-bold text-3xl mb-5">My Profile</h2>
        <p data-testid="user-name">Name: {user?.name}</p>
        <p data-testid="user-username">Username: {user?.username}</p>
      </div>
      <div
        data-testid="reading-list-section"
        className="w-full border-b border-gray-400 py-5"
      >
        <h3 className="text-lg">Reading Lists</h3>
        {readingLists.length > 0 ? (
          <>
            <div data-testid="unread-section">
              <p className="mt-5">Unread ({unReadReadingLists.length})</p>

              {unReadReadingLists.length > 0 ? (
                <ul>
                  {unReadReadingLists.map((list) => (
                    <li
                      key={list.id}
                      className="flex items-center justify-between bg-yellow-100 rounded p-3 mt-5"
                    >
                      <p className="text-blue-600">
                        {list.blog.title} by {list.blog.author}
                      </p>
                      <form action={markReadingListAsRead}>
                        <input type="hidden" name="id" value={list.id} />
                        <button
                          data-testid={`mark-read-${list.id}`}
                          className="bg-green-700 rounded px-3 hover:bg-green-600"
                        >
                          mark as read
                        </button>
                      </form>
                    </li>
                  ))}{" "}
                </ul>
              ) : (
                <p data-testid="no-unread-blogs">No unread blogs</p>
              )}
            </div>

            <p className="mt-5">Rread ({readReadingLists.length})</p>
            <ul>
              {readReadingLists.map((list) => (
                <li
                  key={list.id}
                  className="flex items-center justify-between bg-green-100 rounded p-3 mt-5"
                >
                  <p className="text-blue-600">
                    {list.blog.title} by {list.blog.author}
                  </p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p data-testid="empty-reading-list">No blogs in your reading list</p>
        )}
      </div>
      <div data-testid="api-token-section">
        <h3 className="text-lg mt-5">API Token</h3>
        {user?.token ? (
          <div
            data-testid="token-display"
            className="bg-gray-800 rounded p-3 mt-2"
          >
            <p>Current token:</p>
            <code data-testid="api-token">{user?.token}</code>
          </div>
        ) : (
          <p data-testid="no-token-message">no token generated</p>
        )}
        <form action={generateNewToken}>
          <button
            data-testid="generate-token-button"
            className="bg-blue-700 rounded p-3 hover:bg-blue-600 mt-5"
          >
            Generate New Token
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
