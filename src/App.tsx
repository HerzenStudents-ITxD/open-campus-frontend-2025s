import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { TicketProvider } from './context/TicketContext';

function App() {
  return (
    <TicketProvider>
      <Router basename="/open-campus">
        <AppRoutes />
      </Router>
    </TicketProvider>
  );
}

export default App;
