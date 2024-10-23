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
import { useAuth0 } from "@auth0/auth0-react";
import { userInfo } from "os";

export const ProyectoPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [showProyectos, setShowProyectos] = useState(true);
  const [proyectoSeleccionado, setProyectoSeleccionado] =
    useState<Proyecto | null>(null);
  const [isLoading, setIsloading] = useState(true);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    handleGetProyectos();
  }, []);

  function handleAddProyecto() {
    setProyectoSeleccionado(null);
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
    setProyectoSeleccionado(null);
  }

  async function handleGetProyectos() {
    setIsloading(true);
    if (!isAuthenticated || !user || !user.sub) {
      toast.error("Error al obtener proyectos");
      setIsloading(false);
      return;
    }
    try {
      const data = await proyectoService.obtenerProyectosPorUserId(user.sub);
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
              {proyectos.length === 0 ? (
                // Mostrar mensaje cuando no hay proyectos
                <tr>
                  <td colSpan={7} className="text-center">
                    No hay proyectos
                  </td>
                </tr>
              ) : (
                // Mostrar proyectos si existen
                proyectos.map((proyecto) => (
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
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                        onClick={() => setProyectoSeleccionado(proyecto)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Modal para confirmar eliminación */}
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    <span style={{ fontSize: "0.9em" }}>
                      ¿Está seguro de que quiere eliminar el proyecto:{" "}
                      <span style={{ color: "red" }}>
                        {proyectoSeleccionado?.nombreProyecto}
                      </span>
                      ?<br /> Esta acción no se puede deshacer.
                    </span>
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      if (proyectoSeleccionado) {
                        handleDeleteProyecto(proyectoSeleccionado.id);
                      }
                    }}
                    data-bs-dismiss="modal"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProyectoPage;
