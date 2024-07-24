import "./App.css";
import Msg from "./Components/Common/Msg";
import { Messages } from "./Contexts/Messages";
import { Router } from "./Contexts/Router";
import AOS from "aos";
import "aos/dist/aos.css";
import { Modals } from "./Contexts/Modals";
import DeleteModal from "./Components/Common/DeleteModal";
import { Loader } from "./Contexts/Loader";
import LoaderContainer from "./Components/Common/Loader";
import { Auth } from "./Contexts/Auth";

function App() {
  AOS.init();

  return (
    <Messages>
      <Loader>
        <Auth>
          <Modals>
            <Msg />
            <DeleteModal />
            <LoaderContainer />
            <Router />
          </Modals>
        </Auth>
      </Loader>
    </Messages>
  );
}

export default App;
