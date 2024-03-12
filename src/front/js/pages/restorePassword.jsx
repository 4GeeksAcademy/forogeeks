import React from "react";

// IMPORTAR SCSS
import "../../scss/profile.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export const RestorePassword = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {/* CONTENEDOR DEL HILO */}
          <div className="shadow-sm rounded-3 mb-4 py-4 px-3 bg-white">
            <h1 className="text-center mb-4">Recuperar contraseña</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">
                  Contraseña actual
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="currentPassword"
                  name="currentPassword"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
