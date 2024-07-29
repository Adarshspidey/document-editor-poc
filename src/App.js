import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DocumentEditor from "./Pages/DocumentEditor";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AuditLog from "./Pages/AuditLog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="/log" element={<AuditLog/>} />
          <Route path="/editor/:id" element={<DocumentEditor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
