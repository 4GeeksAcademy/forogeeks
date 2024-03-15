import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();
    const confettiCanvasRef = useRef(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showThreadCreated, setShowThreadCreated] = useState(false); // Estado para mostrar el título del hilo creado
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        actions.getAllCategories()
    }, [])

    useEffect(() => {
        if (showConfetti) {
            shootConfetti();
            const timeoutId = setTimeout(() => {
                setShowConfetti(false);
                setShowThreadCreated(true); // Cambiar el estado para mostrar el título del hilo creado
                navigate("/");
            }, 2000);

            return () => clearTimeout(timeoutId);
        }
    }, [showConfetti]);

    const shootConfetti = () => {
        const canvas = confettiCanvasRef.current;
        if (!canvas) return; // Verificar si el canvas está disponible
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pieces = [];
        const numberOfPieces = 200;

        for (let i = 0; i < numberOfPieces; i++) {
            pieces.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 4 + 1, // tamaño
                d: Math.random() * numberOfPieces // densidad
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'blue';
            pieces.forEach(piece => {
                ctx.beginPath();
                ctx.moveTo(piece.x, piece.y);
                ctx.arc(piece.x, piece.y, piece.r, 0, Math.PI * 2, false);
                ctx.fill();
            });
            update();
        }

        function update() {
            pieces.forEach(piece => {
                piece.y += Math.cos(piece.d) + 1 + piece.r / 2; // Velocidad y dirección de caída
                piece.x += Math.sin(piece.d) * 2; // Movimiento en X basado en la dirección
                if (piece.y > canvas.height) {
                    piece.y = 0 - piece.r;
                    piece.x = Math.random() * canvas.width;
                }
            });
        }

        function loop() {
            requestAnimationFrame(loop);
            draw();
        }

        loop();
    };

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
            actions.getTrendingThreads();
            // Establece el estado para mostrar el confeti después de crear el hilo
            setShowConfetti(true);
            setShowAlert(true);
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {showAlert && (
                            <div className="alert alert-info" role="alert">
                                Hilo creado. Redirigiendo a la página principal...
                            </div>
                        )}
                        <div className="shadow-sm rounded-3 mb-4 py-1 px-3 bg-white">
                            <form>
                                <div className="d-flex justify-content-end mb-3 mt-3">
                                    <button type="submit" className="btn btn-primary rounded-5 text-white" onClick={handleCreateThread}>
                                        Crear hilo{" "}
                                        <IconArrowNarrowRight stroke={2} size={18} color="white" /></button>
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
            {showConfetti && ( // Mostrar el confeti si showConfetti es true
                <canvas ref={confettiCanvasRef} id="confetti-canvas" style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 9999,
                    pointerEvents: "none"
                }}></canvas>
            )}
        </>
    )
}
