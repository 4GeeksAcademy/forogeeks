import React, { useState } from "react";
import ThreadReport from "../components/admin/threadReport.jsx";

// ... otros imports

const example = [
  {
    title: "¿Qué es el Lorem Ipsum?",
    likes: 20,
    coments: 10,
    autor: "Usuario 1", // Add author if needed
  },
  {
    title: "¿Por qué usamos Lorem Ipsum?",
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
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-12 ">
          <div className="shadow-sm rounded-3 mb-4 p-3">
            <h3>Threads:</h3>
            {threads.map((thread) => (
              <ThreadReport
                key={thread.title}
                title={thread.title}
                likes={thread.likes}
                coments={thread.coments}
                autor={thread.autor} // Add author if needed
                onDelete={handleDelete} // Pass handleDelete with title
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReport;