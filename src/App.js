import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Tickets from "./Tickets/Tickets";
import CreateTicket from "./Tickets/CreateTicket";
import { TicketProvider } from "./TicketContext";
import EditTicket from "./Tickets/EditTicket";
import Home from "./Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Switch>
          <TicketProvider>
            <Route exact={true} path="/" component={Home}></Route>
            <Route exact={true} path="/tickets" component={Tickets}></Route>
            <Route
              exact={true}
              path="/create-ticket"
              component={CreateTicket}
            ></Route>
            <Route
              exact={true}
              path="/edit-ticket/:id"
              component={EditTicket}
            ></Route>
          </TicketProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
