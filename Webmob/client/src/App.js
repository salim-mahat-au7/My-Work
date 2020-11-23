import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


//pages
import Home from "./pages/home";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
