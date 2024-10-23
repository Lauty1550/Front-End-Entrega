const BASE_URL = "http://localhost:3000/Proyecto";

export const proyectoService = {
  async crearProyecto(data: any) {
    try {
      const response = await fetch(`${BASE_URL}/Crear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
      throw error;
    }
  },

  async obtenerProyectos() {
    try {
      const response = await fetch(`${BASE_URL}/Get-All`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
      throw error;
    }
  },

  async obtenerProyectosPorUserId(userId: string) {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
      throw error;
    }
  },

  async deleteProyecto(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/Borrar/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
      throw error;
    }
  },

  async actualizarProyecto(id: string, data: any) {
    const response = await fetch(`${BASE_URL}/Update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar el proyecto");
  },
};
