import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";

// COMPONENTS
import { TextEditor } from "../components/TextEditor/text-editor.jsx";

// ICONS

export const CreateNewThread = () => {
    const { store, actions } = useContext(Context);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        actions.getAllCategories()
    }, [])
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="shadow-sm rounded-3 mb-4 py-1 px-3">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select className="form-select" id="category" onChange={(e) => setCategory(e.target.value)}>
                                        <option value="1">General</option>
                                        <option value="2">React</option>
                                        <option value="3">Python</option>
                                        <option value="4">JavaScript</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div>
                                    <TextEditor />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}