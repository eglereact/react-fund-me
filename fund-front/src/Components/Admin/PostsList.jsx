import { donationPosts } from "../../Data/links";
import { FaCheck, FaTimes } from "react-icons/fa";

const PostsList = () => {
  return (
    <div class="flex flex-col">
      <h1 className="text-4xl mb-10">Posts</h1>
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Money Goal
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Amount Raised
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Featured
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase "
                  >
                    Approved
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 ">
                {donationPosts.map((post) => (
                  <tr key={post.id} class="hover:bg-gray-100 ">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                      {post.title}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 capitalize">
                      {post.author}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                      {post.category}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                      {post.moneyGoal}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                      {post.amountRaised}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
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
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
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
                    <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium gap-2 flex justify-end">
                      <button
                        type="button"
                        class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800"
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
