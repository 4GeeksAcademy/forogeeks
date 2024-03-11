import React, { useEffect,useContext } from 'react';
import { getAllCategories } from './ruta/al/archivo/con/la/funcion';
import { Context } from "../../store/appContext";


function MiComponente() {
    
	const { store, actions } = useContext(Context);



  const store = useStore();
  const categorias = store.categories;

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      <h1>Categorias</h1>
      {categorias && categorias.map((categoria) => (
        <div key={categoria.id}>
          <h2>{categoria.nombre}</h2>
          <p>{categoria.descripcion}</p> {/* Ejemplo de otros detalles */}
        </div>
      ))}
    </div>
  );
}