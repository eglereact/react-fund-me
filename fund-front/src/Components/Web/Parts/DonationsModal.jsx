import { FaTimes } from "react-icons/fa";

const DonationsModal = ({ show, onClose, children, title, link }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 max-w-md mx-auto">
        <div className="flex justify-between">
          <h1 className="text-xl">{title}</h1>
          <button
            className="text-gray-900 hover:text-gray-800"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>
        <div className="mt-4 overflow-y-auto h-96">{children}</div>
        <div className="pt-4 text-center border-t-2 mt-2 border-gray-100">
          <p>
            <span className="text-lg mr-2">Want to be on the list?</span>
            <a href={link} className="button-light py-2">
              Donate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationsModal;
