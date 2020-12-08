//stylesheet
import "./App.css";

//components
import Aservice from "./pages/aservice";
import Pservice from "./pages/pservice";

function App() {
  return (
    <>
      <div className="container mt-5">
        <Pservice />
        <Aservice />
      </div>
    </>
  );
}

export default App;
