import "./App.css";
import Msg from "./Components/Common/Msg";
import { Messages } from "./Contexts/Messages";
import { Router } from "./Contexts/Router";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  AOS.init();

  return (
    <Messages>
      <Msg />
      <Router />;
    </Messages>
  );
}

export default App;
