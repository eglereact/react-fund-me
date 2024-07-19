import axios from "axios";
import { SERVER_URL } from "../Constants/urls";
import { useCallback, useContext, useState } from "react";
import { MessagesContext } from "../Contexts/Messages";
import { LoaderContext } from "../Contexts/Loader";

const useServerGet = (url) => {
  const [response, setResponse] = useState(null);

  const { messageError, messageSuccess } = useContext(MessagesContext);

  const { setShow } = useContext(LoaderContext);

  const doAction = useCallback(
    (dataString = "") => {
      axios
        .get(`${SERVER_URL}${url}${dataString}`, { withCredentials: true })
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
        })
        .finally(() => {
          setShow(false);
        });
    },
    [messageError, messageSuccess, url]
  );

  return { doAction, response };
};

export default useServerGet;
