import React, { useState,useContext } from 'react';
import { Context } from "../../store/appContext";

const CreateCategory = () => {
    const { store, actions } = useContext(Context);
    const [title, setTitle] = useState("");
    const content = store.CreateCategory;
    const [category, setCategory] = useState("");
    const categories = store.categories;


    const [titleError, setTitleError] = useState({ error: false, message: "" });
    const [categoryError, setCategoryError] = useState({ error: false, message: "" });


    };
return(
    <div>

    </div>

)
    
  };

