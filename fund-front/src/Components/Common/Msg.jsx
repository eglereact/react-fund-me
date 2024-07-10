import { useContext } from "react";
import { MessagesContext } from "../../Contexts/Messages";
import { IoIosClose } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { MdOutlineInfo } from "react-icons/md";
import { MdOutlineCheckCircle } from "react-icons/md";

const Msg = () => {
  const { msg, remMessage } = useContext(MessagesContext);

  if (msg.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-8 right-8 z-10 flex flex-col gap-2">
      {msg.map((m) => (
        <div
          key={m.id}
          data-aos="fade-left"
          data-aos-duration="600"
          className="bg-white shadow-md p-3 rounded relative"
        >
          <div className="border-b-2 py-1 text-gray-900 flex items-center gap-1 min-w-64">
            {m.type === "error" && (
              <span className="text-red-600">
                <MdErrorOutline size={20} />
              </span>
            )}
            {m.type === "info" && (
              <span className="text-blue-300">
                <MdOutlineInfo size={20} />
              </span>
            )}
            {m.type === "success" && (
              <span className="text-light">
                <MdOutlineCheckCircle size={20} />
              </span>
            )}
            <p className="text-lg font-bold">{m.title}</p>
            <button
              type="button"
              className=" top-2 absolute right-2 text-gray-900 hover:text-dark"
              onClick={() => remMessage(m.id)}
            >
              <IoIosClose size={30} />
            </button>
          </div>
          <div className="py-1 text-gray-900">{m.text}</div>
        </div>
      ))}
    </div>
  );
};
export default Msg;
