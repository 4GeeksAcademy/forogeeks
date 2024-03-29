import React, { useState, useContext, useEffect } from "react";
import ThreadReport from "../components/admin/threadReport.jsx";
import { IconTicket } from "@tabler/icons-react";
import { Context } from "../store/appContext";
import { Categories } from "../components/Thread/categories.jsx";
const AdminReport = (props) => {
  const { categoryId } = props; // Asegúrate de que estás pasando categoryId como prop
  const { store, actions } = useContext(Context);
  const content = store.CreateCategory;
  // State to manage the list of threads
  const category = store.categories
  const reportedThreads = store.reportedThreads;
  const [loading, setLoading] = useState(false);
  //AGREGAR CATEGORIA
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const [titleError, setTitleError] = useState({ isError: false, message: "" });
  const [iconError, setIconError] = useState({ isError: false, message: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setTitleError({ isError: false, message: "" });
      setIconError({ isError: false, message: "" });
      // Flag para verificar si hay errores
      console.log('Category created successfully!');
    } catch (error) {
      setError(error.message);
      console.error('[CreateCategoryForm] Error creating category:', error);
    }
  };
  const handleTest = (e) => {
    e.preventDefault();
    actions.createCategory(title, icon).then(() => { actions.getAllCategories() })
    console.log(title, icon)
  }
  useEffect(() => {
    if (categoryId) {
      // Aquí puedes realizar operaciones basadas en categoryId, como obtener datos específicos de la categoría
      console.log(`Categoría seleccionada: ${categoryId}`);
    } else {
      console.log('No se proporcionó categoryId');
    }
    actions.getAllCategories();
    console.log("reported list: ", reportedThreads)
    actions.getReportedThreads()
  }, [categoryId]); // Asegúrate de que categoryId está en la lista de dependencias
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mb-3 mb-md-0">
          <div className="shadow-sm rounded-3 mb-4 p-3 bg-white">
            <div className="">
              <h4 className="mb-4">Cosola de administrador</h4>
            </div>
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th scope="col" className="col-sm-6 col-md-8">Reportes</th>
                </tr>
              </thead>
              <tbody>
                {reportedThreads.map((thread, index) => (
                  <ThreadReport key={index} report={thread.id} thread_id={thread.thread.id} title={thread?.thread?.title} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-4">
          <div className="shadow-md rounded-3 bg-white p-3 mb-2">
            {/* Agregar Categoria */}
            <div>
              <div className="">
                <h5 className="mb-4">Agregar categorías</h5>
              </div>
              <form>
                {/* TITLE CATEGORY */}
                <div className="group mt-2 ">
                  <IconTicket stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                  <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Nombre" id="TitleCategoria" className=" inputSignUpandRegister " />
                </div>
                {/* ICON CATEGORY */}
                <div className="group mt-2 ">
                  <IconTicket stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                  <input value={icon} onChange={(e) => { setIcon(e.target.value); console.log(e.target.value) }} type="text" placeholder="Icono" id="Icon" className="inputSignUpandRegister " />
                </div>
                <div className="d-flex justify-content-end mt-2 w-100">
                  <button onClick={handleTest} type="submit" className="mt-2 btn btn-primary text-white rounded-5 w-100">Submit</button>
                </div>
              </form>
            </div>
          </div>
          <div className="shadow-md rounded-3 bg-white p-3">
            {/* Lista de Categorias */}
            <div className="mt-2">
              <div className="">
                <h5 className="mb-4">Lista de categorías</h5>
              </div>
              <div>
                {loading ? (
                  <LoaderCategory />
                ) : category.length === 0 ? (
                  <p>No hay categorías disponibles</p>
                ) : (
                  category.map((categoryItem, index) => (
                    <Categories key={index} title={categoryItem.title} icon={categoryItem.icon} categoryId={categoryItem.id} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminReport;