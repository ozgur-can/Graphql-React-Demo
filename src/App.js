import React from "react";
import CharacterList from "./components/CharacterList";
import Character from "./pages/Character";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Footer, FooterSection } from "./styled-components";

const App = () => {
  return (
    <div style={{ margin: "3em 4em" }}>
      <Switch>
        <Route exact path="/">
          <CharacterList />
        </Route>
        <Route exact path="/character/:id">
          <Character />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
