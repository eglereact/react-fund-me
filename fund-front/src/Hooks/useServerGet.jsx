import axios from "axios";
import { SERVER_URL } from "../Constants/urls";
import { useCallback, useContext, useState } from "react";
import { MessagesContext } from "../Contexts/Messages";

const useServerGet = (url) => {
  const [response, setResponse] = useState(null);

  const { messageError, messageSuccess } = useContext(MessagesContext);

  const doAction = useCallback(() => {
    axios
      .get(`${SERVER_URL}${url}`)
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
  }, [messageError, messageSuccess, url]);

  return { doAction, response };
};

export default useServerGet;
