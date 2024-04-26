import WithTheme from "./theme/theme";

import AppWrapper from "./router";

import "./styles/global.css";

function App() {
  return (
    <WithTheme>
      <AppWrapper />
    </WithTheme>
  );
}

export default App;
