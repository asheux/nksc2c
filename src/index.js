import * as React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";

import AppRoutes from "src/routes";
import { TccupTheme } from "src/commons/Themes";

import store from "src/redux/store";

const renderApp = () => {
  const container = document.getElementById("root");
  const root = createRoot(container);

  const App = () => {
    return (
      <Provider store={store}>
        <TccupTheme>
          <AppRoutes />
        </TccupTheme>
      </Provider>
    );
  };

  root.render(<App />);
};

// if (module.hot) {
//   module.hot.accept();
// }

renderApp();
