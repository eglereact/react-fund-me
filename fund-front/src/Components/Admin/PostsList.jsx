import { useCallback, useContext, useEffect, useState } from "react";
import { donationPosts } from "../../Data/links";
import { FaCheck, FaTimes } from "react-icons/fa";
import { ModalsContext } from "../../Contexts/Modals";
import * as l from "../../Constants/urls";
import useServerGet from "../../Hooks/useServerGet";
import useServerDelete from "../../Hooks/useServerDelete";

const PostsList = () => {
  const { doAction: doGet, response: serverGetResponse } = useServerGet(
    l.SERVER_GET_POSTS
  );

  const { doAction: doDelete, serverResponse: serverDeleteResponse } =
    useServerDelete(l.SERVER_DELETE_POST);
  const { setDeleteModal } = useContext(ModalsContext);
  const [posts, setPosts] = useState(null);

  const hidePost = (post) => {
    setPosts((p) =>
      p.map((p) => (p.id === post.id ? { ...p, hidden: true } : p))
    );
  };

  const showPost = useCallback(() => {
    setPosts((p) =>
      p.map((p) => {
        delete p.hidden;
        return p;
      })
    );
  }, []);

  const removeHidden = useCallback(() => {
    setPosts((p) => p.filter((p) => !p.hidden));
  }, []);

  useEffect(() => {
    doGet();
  }, [doGet]);

  useEffect(() => {
    if (null === serverGetResponse) {
      return;
    }
    setPosts(serverGetResponse.data.posts ?? null);
  }, [serverGetResponse]);

  useEffect(() => {
    if (null === serverDeleteResponse) {
      return;
    }
    if (serverDeleteResponse.type === "error") {
      showPost();
    } else {
      removeHidden();
    }
  }, [serverDeleteResponse, showPost, removeHidden]);

  console.log(posts);

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl mb-10">Posts</h1>
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Money Goal
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Amount Raised
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Featured
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Approved
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {posts === null && (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                )}
                {posts !== null &&
                  posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-100 ">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                        {post.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 capitalize">
                        {post.authorUsername}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                        {post.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                        {post.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                        {post.amountRaised}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                        {post.featured ? (
                          <span className="text-light">
                            <FaCheck />
                          </span>
                        ) : (
                          <span className="text-danger">
                            <FaTimes />
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                        {post.approved ? (
                          <span className="text-light">
                            <FaCheck />
                          </span>
                        ) : (
                          <span className="text-danger">
                            <FaTimes />
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium gap-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteModal({
                              data: post,
                              doDelete,
                              hideData: hidePost,
                            })
                          }
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostsList;
