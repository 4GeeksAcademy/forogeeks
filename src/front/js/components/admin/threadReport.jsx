import React from "react";
import { IconMessage, IconHeartFilled, IconMessages, IconTrash } from "@tabler/icons-react";

const ThreadReport = ({ title, likes, coments, autor, onDelete }) => {
  return (
    <div className="container" onClick={() => onDelete(title)}>
      <div className="row">
        <div className="col-md-12">
          {/* TITULO */}
          <div className="shadow-sm rounded-3 mb-4 py-1 px-3">
            <div className="row align-items-center">
              <div className="col-sm-6 d-flex align-items-center">
                {/* Icono */}
                <IconMessage size={20} stroke={1.5} color="#007bff" />
                {/* Separador */}
                <hr className="vr mx-3"></hr>
                <div className="d-flex flex-column">
                  {/* TITULO DEL HILO */}
                  <p className="m-0 p-0">{title}</p>
                  {/* NOMBRE DE USUARIO Y FECHA */}
                  <div>
                    <span className="text-muted small p-0 m-0">@user08</span>
                    <span className="text-muted small p-0 m-0"> - 2h</span>
                  </div>
                </div>
              </div>
              {/* NUMERO DE LIKES Y COMENTS */}
              <div className="col-sm-6 d-flex justify-content-end gap-3 text-muted small">
                <hr className="vr mx-3"></hr>
                <div className="d-flex align-items-center">
                  <IconHeartFilled size={20} stroke={1} />
                  <span className="ms-2">{likes}</span>
                </div>
                <div className="d-flex align-items-center">
                  <IconMessages size={20} stroke={1} />
                  <span className="ms-2">{coments}</span>
                </div>
                <button onClick={() => onDelete(title)} className="btn btn-sm btn-danger ms-3">
                  <IconTrash size={18} /> Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadReport;