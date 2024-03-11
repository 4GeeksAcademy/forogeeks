import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";

// COMPONENTS
import { TextEditor } from "../components/TextEditor/text-editor.jsx"

// ICONS
import { IconArrowNarrowRight } from '@tabler/icons-react';

export const CreateNewThread = () => {
    const { store, actions } = useContext(Context);
    const [title, setTitle] = useState("");
    const content = store.textEditorContent;
    const [category, setCategory] = useState("");
    const categories = store.categories;

    // Manejo de errores
    const [titleError, setTitleError] = useState({ error: false, message: "" });
    const [contentError, setContentError] = useState({ error: false, message: "" });
    const [categoryError, setCategoryError] = useState({ error: false, message: "" });

    const handleCreateThread = (e) => {
        e.preventDefault();

        // Reiniciar los errores
        setTitleError({ error: false, message: "" });
        setContentError({ error: false, message: "" });
        setCategoryError({ error: false, message: "" });

        let hasErrors = false;

        if (title.trim() === "") {
            hasErrors = true;
            setTitleError({ error: true, message: "El título es obligatorio" });
        }
        if (category === "") {
            hasErrors = true;
            setCategoryError({ error: true, message: "La categoría es obligatoria" });
        }
        if (content.trim() === "") {
            hasErrors = true;
            setContentError({ error: true, message: "El contenido es obligatorio" });
        }
        if (!hasErrors) {
            console.log("[createNewThread] Create new thread", title, content, category);
            actions.createNewThread(title, content, category);
            console.log("handleCreateThread" + title, content, category)
        }
    }
    

    useEffect(() => {
        actions.getAllCategories()
    }, [])
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="shadow-sm rounded-3 mb-4 py-1 px-3 bg-white">
                            <form>
                                <div className="d-flex justify-content-end mb-3 mt-3">
                                    <button type="submit" className="btn btn-primary rounded-5 text-white" onClick={handleCreateThread}>
                                        Crear hilo{" "}
                                    <IconArrowNarrowRight stroke={2} size={18} color="white"/></button>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select className="form-select" id="category" onChange={(e) => setCategory(e.target.value)}>
                                        <option value="">Elige una categoría</option>
                                        {categories && categories.map((category, index) => (
                                            <option key={index} value={category.id}>{category.title}</option>
                                        ))}
                                    </select>
                                    {categoryError.error && <span className="small" style={{ color: "red" }}>{categoryError.message}</span>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" onChange={(e) => setTitle(e.target.value)} />
                                    {titleError.error && <span className="small" style={{ color: "red" }}>{titleError.message}</span>}
                                </div>
                                <div className="mb-3">
                                    <TextEditor />
                                    {contentError.error && <span className="small" style={{ color: "red" }}>{contentError.message}</span>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}