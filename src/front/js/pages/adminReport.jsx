import React, { useState } from "react";
import ThreadReport from "../components/admin/threadReport.jsx";
import { IconTicket } from "@tabler/icons-react";

// ... otros imports

const example = [
  {
    title: "Icidencia test",
    likes: 20,
    coments: 10,
    autor: "Usuario 1", // Add author if needed
  },
  {
    title: "Icidencia test2",
    likes: 10,
    coments: 5,
    autor: "Usuario 2", // Add author if needed
  },
  {
    title: "Icidencia test 3",
    likes: 10,
    coments: 5,
    autor: "Usuario 2", // Add author if needed
  },
  {
    title: "Icidencia test 4",
    likes: 10,
    coments: 5,
    autor: "Usuario 2", // Add author if needed
  },
  {
    title: "Icidencia test 5",
    likes: 10,
    coments: 5,
    autor: "Usuario 2", // Add author if needed
  },
  // ... add more thread objects
];

const AdminReport = ({ math }) => {
  // ... other parts of the component

  // State to manage the list of threads
  const [threads, setThreads] = useState(example);

  // Function to handle thread deletion
  const handleDelete = (title) => {
    const updatedThreads = threads.filter((thread) => thread.title !== title);
    setThreads(updatedThreads);
  };

  // Render the list of threads

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mb-3 mb-md-0">
          <div className="shadow-sm rounded-3 mb-4 p-3">
            <div className="">
              <h4 className="mb-4">Cosola De Administrador</h4>
            </div>
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th scope="col" className="col-sm-6 col-md-8">Reportes</th>

                </tr>
              </thead>
              <tbody>
                {threads.map((thread) => (
                  <ThreadReport
                    key={thread.title}
                    title={thread.title}

                    autor={thread.autor} // Add author if needed
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-4">
          {/* Agregar Categoria */}
          <div>
            <div className="">
              <h4 className="mb-4">Agregar Categorias</h4>
            </div>
            <form>
              <div className="group mt-2 ">
                <IconTicket stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                <input className="inputSignUpandRegister " type="text" placeholder="Title categoria" id="TitleCategoria" />
              </div>
              <div className="group mt-2 ">
                <IconTicket stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                <input className="inputSignUpandRegister " type="text" placeholder="Categoria" id="Categoria" />
              </div>
              <button type="submit" className=" mt-2 btn btn-primary">Submit</button>
            </form>
          </div>
          {/* Lista de Categorias */}
          <div className="mt-2">
            <div className="">
              <h4 className="mb-4">Lista de Categorias</h4>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">An item</li>
              <li className="list-group-item">A second item</li>
              <li className="list-group-item">A third item</li>
              <li className="list-group-item">A fourth item</li>
              <li className="list-group-item">And a fifth one</li>
            </ul>
          </div>

        </div>
      </div>
    </div>

  );
};


export default AdminReport;