import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NewProyecto } from "../components/ProyectoForm";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Flip } from "react-toastify";
import { proyectoService } from "../service/ProyectoService";
import { Proyecto } from "../Dto/ProyectoDto";
import "../css/ProyectoTable.css";
import "../css/Modal.css";
import "../css/BotonEditar.css";
import "../css/BotonEliminar.css";
import "../css/BotonAgregarProyecto.css";
import SpinLoader from "../components/Loader";
import "../css/ProyectoPage.css";

export const ProyectoPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [showProyectos, setShowProyectos] = useState(true);
  const [proyectoSeleccionado, setProyectoSeleccionado] =
    useState<Proyecto | null>(null);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    handleGetProyectos();
  }, []);

  function handleAddProyecto() {
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
    setProyectoSeleccionado(null);
  }

  async function handleGetProyectos() {
    setIsloading(true);
    try {
      const data = await proyectoService.obtenerProyectos();
      setProyectos(data);
      setShowProyectos(true);
      console.log("Proyectos obtenidos exitosamente");
    } catch (error) {
      toast.error("Error al obtener proyectos");
      console.log("Error al obtener proyectos", error);
    }
    setTimeout(() => {
      setIsloading(false);
    }, 500);
  }

  async function handleDeleteProyecto(id: string) {
    try {
      await proyectoService.deleteProyecto(id);
      toast.success("Proyecto eliminado exitosamente");
      console.log("Proyecto eliminado exitosamente ");
      handleGetProyectos();
    } catch (error) {
      toast.error("Error al eliminar proyecto");
      console.log("Error al eliminar proyecto", error);
    }
  }

  function handleEditProyecto(proyecto: Proyecto) {
    setProyectoSeleccionado(proyecto);
    setShowForm(true);
  }

  return (
    <>
      <SpinLoader isLoading={isLoading} />
      <div className={`container mt-3 ${isLoading ? "hidden" : ""}`}>
        <h1 className="titulo"> Proyecto</h1>

        {showForm && (
          <NewProyecto
            proyecto={proyectoSeleccionado}
            onClose={handleCloseForm}
            onUpdate={handleGetProyectos}
          />
        )}
        <ToastContainer
          position="top-center"
          autoClose={3500}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme="colored"
          transition={Flip}
        />
        <br />
      </div>

      {/* Renderiza la lista de proyectos */}
      {showProyectos && (
        <div className={`mt-3 text-center ${isLoading ? "hidden" : ""}`}>
          <button
            type="button"
            className="btn btn-primary btn-add-proyecto"
            onClick={handleAddProyecto}
          >
            Agregar Proyecto
          </button>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Ubicación</th>
                <th>Tipo de obra</th>
                <th>Destino</th>
                <th>Escala</th>
                <th>Antecedente</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((proyecto) => (
                <tr key={proyecto.id}>
                  <td>{proyecto.nombreProyecto}</td>
                  <td>{proyecto.ubicacion}</td>
                  <td>{proyecto.obra}</td>
                  <td>{proyecto.destino}</td>
                  <td>{proyecto.escala}</td>
                  <td>{proyecto.antecedente}</td>
                  <td>
                    <button
                      type="button"
                      className="boton-editar"
                      onClick={() => handleEditProyecto(proyecto)}
                    >
                      <i className="bi bi-pen"></i>
                    </button>
                    <button
                      type="button"
                      className="boton-eliminar"
                      onClick={() => handleDeleteProyecto(proyecto.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ProyectoPage;
