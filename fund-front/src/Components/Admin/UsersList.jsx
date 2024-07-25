import useServerGet from "../../Hooks/useServerGet";
import * as l from "../../Constants/urls";
import { useCallback, useContext, useEffect, useState } from "react";
import useServerDelete from "../../Hooks/useServerDelete";
import { ModalsContext } from "../../Contexts/Modals";

const UsersList = () => {
  const { doAction: doGet, response: serverGetResponse } = useServerGet(
    l.SERVER_GET_USERS
  );
  const { doAction: doDelete, serverResponse: serverDeleteResponse } =
    useServerDelete(l.SERVER_DELETE_USER);
  const { setDeleteModal } = useContext(ModalsContext);
  const [users, setUsers] = useState(null);

  const hideUser = (user) => {
    setUsers((u) =>
      u.map((u) => (u.id === user.id ? { ...u, hidden: true } : u))
    );
  };

  const showUser = useCallback((_) => {
    setUsers((u) =>
      u.map((u) => {
        delete u.hidden;
        return u;
      })
    );
  }, []);

  const removeHidden = useCallback((_) => {
    setUsers((u) => u.filter((u) => !u.hidden));
  }, []);

  useEffect(() => {
    doGet();
  }, [doGet]);

  useEffect(
    (_) => {
      if (null === serverGetResponse) {
        return;
      }
      setUsers(serverGetResponse.data.users ?? null);
    },
    [serverGetResponse]
  );

  useEffect(
    (_) => {
      if (null === serverDeleteResponse) {
        return;
      }
      if (serverDeleteResponse.type === "error") {
        showUser();
      } else {
        removeHidden();
      }
    },
    [serverDeleteResponse, showUser, removeHidden]
  );

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl mb-10">Users</h1>
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 ">
                {users === null && (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                )}
                {users !== null &&
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 capitalize">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium gap-2 flex justify-end">
                        <button
                          type="button"
                          onClick={(_) =>
                            setDeleteModal({
                              data: user,
                              doDelete,
                              hideData: hideUser,
                            })
                          }
                          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Delete
                        </button>
                        <ul>
                          <li>
                            <a
                              href={l.USER_EDIT + "/" + user.id}
                              type="button"
                              className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                            >
                              Edit
                            </a>
                          </li>
                        </ul>
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
export default UsersList;
