import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home"; // Asegúrate de importar el componente Home
import ProyectoPage from "./pages/Proyectos"; // Asegúrate de importar el componente ProyectoPage
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Header />
      <div className="">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/proyectos"
            element={<ProtectedRoute element={ProyectoPage} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
