import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

//
import ConnectMetamask from "./components/web3/ConnectMetamask"; 
// 

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ConnectMetamask />
    </Provider>
  );
}

export default App;
