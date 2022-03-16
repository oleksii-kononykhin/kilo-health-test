import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { store, persistor } from "./state/store";
import { Quiz, NotFound } from "./components";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider>
        <BrowserRouter>
          <Quiz />
        </BrowserRouter>
      </ChakraProvider>
    </PersistGate>
  </Provider>
);

export default App;
