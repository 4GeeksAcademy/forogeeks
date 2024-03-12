import React from "react";
import { IconMessage, IconHeartFilled, IconMessages, IconTrash } from "@tabler/icons-react";

const ThreadReport = ({ title, likes, coments, autor, onDelete }) => {
  return (
    
    <tr key={title} onClick={() => onDelete(title)}>
      {/* Thread Title */}
      <td className="col-sm-6 col-md-auto">
        <div className="d-flex align-items-center">
          <IconMessage size={20} stroke={1.5} color="#007bff" />
          <hr className="vr mx-3" />
          <div className="d-flex flex-column">
            <p className="m-0 p-0">{title}</p>
            <div>
              <span className="text-muted small p-0 m-0">@user08</span>
              <span className="text-muted small p-0 m-0"> - 2h</span>
            </div>
          </div>
        </div>
      </td>

      {/* Likes and Comments */}
      <td className="col-sm-6 col-md-4 d-flex justify-content-end gap-3 text-muted small">
        <div className="d-flex align-items-center">
        
          <span className="ms-2">{likes}</span>
        </div>
        <div className="d-flex align-items-center">
        
          <span className="ms-2">{coments}</span>
        </div>
        <button onClick={() => onDelete(title)} className="btn btn-sm btn-danger ms-3">
          <IconTrash size={18} /> Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ThreadReport;