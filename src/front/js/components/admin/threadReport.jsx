import React from "react";
import { useEffect,useState } from "react";
import { useContext } from "react";
import { Context } from "../../store/appContext";

// ICONS
import { IconMessage, IconX, IconCheck, IconExclamationCircle } from "@tabler/icons-react";

const ThreadReport = ({ thread_id, autor, onDelete ,title}) => {
  const { store, actions } = useContext(Context);
  const [loading, setLoading] = useState(true); 

 {/* Thread 
  useEffect(() => {
    actions.getThreadById(thread_id)
      .then(threadData => {
        const { title } = threadData.thread;
        setLoading(false);
      });
  }, ); */}

  // Retorno dentro de la función del componente
  return (
    <tr>
      {/* Thread Title */}
      <td className="col-sm-12 col-md-auto">

        <div className="d-flex justify-content-between align-items-center">
          {/* CONTENT */}
          <div className="d-flex align-items-center">
            <IconExclamationCircle size={20} stroke={1.5} color="#FF0000" />
            <hr className="vr mx-3" />
            <div className="d-flex flex-column">
              {loading ? <p className="m-0 p-0">Loading...</p> : <p className="m-0 p-0">{title}</p>}
              <p className="m-0 p-0">{title}</p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="d-flex gap-2 h-50">

            <button className="btn btn-sm btn-primary d-flex gap-2 align-items-center">
              <IconCheck size={18} stroke={3} color="white" />
              <span className="text-white">No action</span>
            </button>
            <button className="btn btn-sm btn-danger d-flex gap-2 align-items-center">
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