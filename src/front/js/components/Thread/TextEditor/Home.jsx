import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function App() {
    useEffect(() => {
        viewPost();
    }, []);

    const [ispost, setpost] = useState([]);
    const viewPost = async () => {
        try {
            await axios.get(`http://localhost:8080/allPost`,)
                .then(res => {
                    if (res.data.success === true) {
                        setpost(res.data.listall);
                    }
                })
        } catch (error) { throw error; }
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <h1 className="App__tittle"> React <span> Quill </span> powerful rich text editor </h1>
                    <Link to="/Add" className="btn btn__theme btn__add"> Create Now </Link>

                    {ispost.map((item, index) => (
                        <div className="post__list" key={index}>
                            <h2>{item.title}</h2>

                            <div className="post__description" dangerouslySetInnerHTML={{ __html: item.description }} />
                            <div className="post__description" dangerouslySetInnerHTML={{ __html: item.information }} />
                            <Link to={`/Edit/${item.id}`} className="btn btn__theme"> Edit </Link>

                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default App;