import React from "react";
import { useEffect,useState } from "react";
import { useContext } from "react";
import { Context } from "../../store/appContext";

// ICONS
import { IconMessage, IconX, IconCheck, IconExclamationCircle } from "@tabler/icons-react";

const ThreadReport = ({ thread_id, autor, onDelete ,title,report}) => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true); 
  
  // Funciones para eliminar el hilo reportado o el reporte de hilo
  const handleDeleteThread = async () => {
    try {
      await actions.deleteThread(thread_id);
      // Realizar alguna acción adicional después de eliminar el hilo
    } catch (error) {
      console.error("Error deleting thread:", error);
      // Manejar el error si es necesario
    }
  };

  const handleDeleteReport = async () => {
    try {
      await actions.deleteThreadReport(report);
      // Realizar alguna acción adicional después de eliminar el reporte de hilo
    } catch (error) {
      console.error("Error deleting thread report:", error);
      // Manejar el error si es necesario
    }
  };


 
  // Retorno del componente
  return (
    <tr>
      {/* Columna del título del hilo */}
      <td className="col-sm-12 col-md-auto">
        <div className="d-flex justify-content-between align-items-center">
          {/* Contenido del título del hilo */}
          <div className="d-flex align-items-center">
            <IconExclamationCircle size={20} stroke={1.5} color="#FF0000" />
            <hr className="vr mx-3" />
            <div className="d-flex flex-column">
              {/* Muestra un mensaje de carga mientras se está cargando el título */}
              {loading ? <p className="m-0 p-0">Loading...</p> : <p className="m-0 p-0">{title}</p>}
              {/* Muestra el título del hilo */}
              <p className="m-0 p-0">{title}</p>
            </div>
          </div>

          {/* Botones para acciones */}
          <div className="d-flex gap-2 h-50">
            {/* Botón para no tomar ninguna acción */}
            <button onClick={handleDeleteReport}  className="btn btn-sm btn-primary d-flex gap-2 align-items-center">
              <IconCheck size={18} stroke={3} color="white" />
              <span className="text-white">No action</span>
            </button>
            {/* Botón para eliminar el hilo reportado */}
            <button onClick={handleDeleteThread} className="btn btn-sm btn-danger d-flex gap-2 align-items-center">
              <IconX size={18} stroke={3} color="white" />
              <span className="text-white">Eliminar</span>
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};


export default ThreadReport;