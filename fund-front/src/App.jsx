import "./App.css";
import Msg from "./Components/Common/Msg";
import { Messages } from "./Contexts/Messages";
import { Router } from "./Contexts/Router";
import AOS from "aos";
import "aos/dist/aos.css";
import { Modals } from "./Contexts/Modals";
import DeleteModal from "./Components/Common/DeleteModal";

function App() {
  AOS.init();

  return (
    <Messages>
      <Modals>
        <Msg />
        <DeleteModal />
        <Router />
      </Modals>
    </Messages>
  );
}

export default App;
