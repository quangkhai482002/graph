import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import { Dashboard, Account } from "./scenes";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
