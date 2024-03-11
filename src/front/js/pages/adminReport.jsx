import React, { useState,useContext,useEffect } from "react";
import ThreadReport from "../components/admin/threadReport.jsx";
import { IconTicket } from "@tabler/icons-react";
import { Context } from "../store/appContext";
import { Categories } from "../components/Thread/categories.jsx";


// ... otros imports

const AdminReport = () => {
  const { store, actions } = useContext(Context);
  const content = store.CreateCategory;

  // State to manage the list of threads
  const category = store.categories
  const [loading,setLoading]= useState(false);
  // ESYO AHI QUE QUITARLO NO FUNCIONA
  const handleDelete = (title) => {
    const updatedThreads = threads.filter((thread) => thread.title !== title);
    setThreads(updatedThreads);
  };
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

  const handleTest =  (e) => {
    e.preventDefault();
    actions.createCategory(title,icon).then( () =>{ actions.getAllCategories()})
    
    console.log(title,icon)
     }

//MUESTRA CATEGORIAS
  useEffect(() => {
    actions.getAllCategories();
  }, []);



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
                <input     value={title} onChange={(e) => setTitle(e.target.value)}  type="text" placeholder="Titlecategoria" id="TitleCategoria" className=" inputSignUpandRegister "/>
              </div>
              <div className="group mt-2 ">
                <IconTicket stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="icon" strokeLinejoin="round" strokeLinecap="round" />
                <input value={icon}  onChange={  (e) => {setIcon(e.target.value);console.log(e.target.value) }}   type="text" placeholder="Icon" id="Icon"className="inputSignUpandRegister " />
              </div>
              <button onClick={handleTest} type="submit" className=" mt-2 btn btn-primary">Submit</button>
            </form>
          </div>
          {/* Lista de Categorias */}
          <div className="mt-2">
            <div className="">
              <h4 className="mb-4">Lista de Categorias</h4>
            </div>
            <div>
            {loading ? (
                            <LoaderCategory />
                        ) : category.length === 0 ? (
                            <p>No hay categorías disponibles</p>
                        ) : (
                            category.map((categoryItem, index) => (
                                <Categories key={index} title={categoryItem.title} icon={categoryItem.icon} id={categoryItem.id} />
                            ))
                        )}
                        </div>
          </div>

        </div>
      </div>
    </div>

  );
};


export default AdminReport;