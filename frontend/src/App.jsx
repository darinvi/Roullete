import CombinedBoard from "./components/board/CombinedBoard";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import DisplayBets from "./components/displayBets/DisplayBets";
import SpinButton from "./components/SpinButton";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="flex bg-green-100 h-[100vh]">
        <div className="flex gap-8 p-4 mx-auto mt-10">
          <div className="flex flex-col gap-16">
            <CombinedBoard />
            <SpinButton />
          </div>
          <DisplayBets />
        </div>
      </div>
    </Provider>
  );
}

export default App;
