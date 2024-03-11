import React from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { useContext } from "react";
import { Context } from "../../store/appContext";



export const TextEditor = () => {
	const { store, actions } = useContext(Context);

	const textEditorStore = store.textEditorStore;


	const modules = {
		toolbar: [
			[{ header: "1" }, { header: "2" }, { font: [] }],
			[{ size: [] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],
			["link", "image", "video"],
			["clean"],
		],
	};

	const formats = [
		"header",
		"font",
		"size",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link",
		"image",
		"video",
	];

	const handleProcedureContentChange = (newContent) => {
		console.log("content: ", newContent);
		// console.log(editor.getContents());
		actions.setTextEditorStore(newContent);
	};

	return (
		<div className="col-md-12">
			<div className="border border-1 rounded-3 p-1">

				<ReactQuill
					theme="snow"
					modules={modules}
					formats={formats}
					placeholder="Escribe aquí..."
					onChange={handleProcedureContentChange}
					style={{
					}}></ReactQuill>
			</div>
		</div>
	);
};
