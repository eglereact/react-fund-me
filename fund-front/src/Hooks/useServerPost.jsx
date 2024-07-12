import axios from "axios";
import { SERVER_URL } from "../Constants/urls";
import { useContext, useState } from "react";
import { MessagesContext } from "../Contexts/Messages";

const useServerPost = (url) => {
  const [response, setResponse] = useState(null);

  const { messageError, messageSuccess } = useContext(MessagesContext);

  const doAction = (data) => {
    axios
      .post(`${SERVER_URL}${url}`, data)
      .then((res) => {
        messageSuccess(res);
        setResponse({
          type: "success",
          data: res.data,
        });
      })
      .catch((error) => {
        messageError(error);
        setResponse({
          type: "error",
          data: error,
        });
      });
  };

  return { doAction, response, messageSuccess };
};

export default useServerPost;
