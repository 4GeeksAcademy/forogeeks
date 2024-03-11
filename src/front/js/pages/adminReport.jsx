import React, { useState } from "react";
import ThreadReport from "../components/admin/threadReport.jsx";

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
        <div className="">
							<h4 className="mb-4">Agregar Categorias</h4>
						</div>

          <form>
            <div>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="titulo" />
            </div>
            <div>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="categoria" />
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>

  );
};


export default AdminReport;