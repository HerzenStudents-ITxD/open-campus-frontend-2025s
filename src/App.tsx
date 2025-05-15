import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <Router basename="/open-campus">
      <AppRoutes />
    </Router>
  );
}

export default App;
