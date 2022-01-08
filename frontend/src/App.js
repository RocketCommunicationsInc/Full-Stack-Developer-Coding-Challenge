import "./App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RequireAuth, AuthProvider } from "./components/Auth";
import NavBar from "./components/NavBar";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route path="*" element={<h1>Don't look over here!</h1>} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}
export default App;
