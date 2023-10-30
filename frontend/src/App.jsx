import CombinedBoard from "./components/board/CombinedBoard";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import DisplayBets from "./components/displayBets/DisplayBets";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="flex gap-8 p-4">
        <CombinedBoard />
        <DisplayBets />
      </div>
    </Provider>
  );
}

export default App;
