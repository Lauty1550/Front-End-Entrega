import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import "../css/NewProyecto.css";
import "../enum/tipoObra";
import { TipoObra } from "../enum/tipoObra";
import { TipoDestino } from "../enum/tipoDestino";
import { proyectoService } from "../service/ProyectoService";
import { toast } from "react-toastify";
import "../css/Modal.css";
import { Proyecto } from "../Dto/ProyectoDto";

interface NewProyectoProps {
  proyecto?: Proyecto | null;
  onClose: () => void;
  onUpdate: () => void;
}

export const NewProyecto: React.FC<NewProyectoProps> = ({
  proyecto,
  onClose,
  onUpdate,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (proyecto) {
      reset(proyecto); // Carga los datos del proyecto seleccionado en el formulario
    }
  }, [proyecto, reset]);

  const onSubmit = async (data: any) => {
    try {
      if (proyecto) {
        await proyectoService.actualizarProyecto(proyecto.id, data);
        toast.success("Proyecto actualizado exitosamente");
      } else {
        await proyectoService.crearProyecto(data);
        toast.success("Proyecto creado exitosamente");
      }
      onUpdate();
      onClose();
    } catch (error) {
      toast.error("Error al guardar el proyecto");
      console.log("Error al guardar proyecto", error);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar Nuevo Proyecto</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="nombreProyecto" className="form-label">
                  Nombre del proyecto
                </label>
                <input
                  type="text"
                  id="nombreProyecto"
                  placeholder=" Hospital"
                  className="form-control"
                  {...register("nombreProyecto", {
                    required: true,
                    maxLength: 20,
                  })}
                />

                {errors.nombreProyecto?.type === "required" && (
                  <p className="text-error">El campo de nombre es requerido</p>
                )}
                {errors.nombreProyecto?.type === "maxLength" && (
                  <p className="text-error">
                    El campo de nombre debe tener menos de 20 caracteres
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="ubicacion" className="form-label">
                  Direccion
                </label>
                <input
                  type="text"
                  id="ubicacion"
                  className="form-control"
                  {...register("ubicacion", {
                    required: true,
                    maxLength: 20,
                  })}
                />
                {errors.ubicacion?.type === "required" && (
                  <p className="text-error">
                    El campo de direccion es requerido
                  </p>
                )}
                {errors.ubicacion?.type === "maxLength" && (
                  <p className="text-error">
                    El campo de direccion debe tener menos de 20 caracteres
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="antecedente" className="form-label">
                  Antecedente
                </label>
                <input
                  type="text"
                  id="antecedente"
                  className="form-control"
                  {...register("antecedente", {
                    required: true,
                    maxLength: 30,
                  })}
                />
                {errors.antecedente?.type === "required" && (
                  <p className="text-error">
                    El campo de antecedente es requerido
                  </p>
                )}
                {errors.antecedente?.type === "maxLength" && (
                  <p className="text-error">
                    El campo de antecedente debe tener menos de 30 caracteres
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="escala" className="form-label">
                  Escala del proyecto
                </label>
                <input
                  type="text"
                  id="escala"
                  placeholder=" 1:100"
                  className="form-control"
                  {...register("escala", {
                    required: true,
                    maxLength: 5,
                  })}
                />

                {errors.escala?.type === "required" && (
                  <p className="text-error">El campo de escala es requerido</p>
                )}
                {errors.escala?.type === "maxLength" && (
                  <p className="text-error">
                    El campo de escala debe tener menos de 5 caracteres
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="tipoObra" className="form-label">
                  Tipo de Obra
                </label>
                <select
                  id="tipoObra"
                  className="form-control-select"
                  {...register("obra", { required: true })}
                >
                  <option value="">Seleccionar...</option>
                  {Object.entries(TipoObra).map(([key, value]) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.obra && (
                  <p className="text-error">
                    El campo de tipo de obra es requerido
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="destino" className="form-label">
                  Destino
                </label>
                <select
                  id="tipoDestino"
                  className="form-control-select"
                  {...register("destino", { required: true })}
                >
                  <option value="">Seleccionar...</option>
                  {Object.entries(TipoDestino).map(([key, value]) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.obra && (
                  <p className="text-error">El campo de destino es requerido</p>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Agregar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
