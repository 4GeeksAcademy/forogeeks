import React from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";

// import "../../../scss/text-editor.scss";

export const TextEditor = () => {
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

	const handleProcedureContentChange = (content, delta, source, editor) => {
		console.log("content: ", content);
		console.log(editor.getContents());
	};

	return (
		<div>
			<h1 style={{ textAlign: "center" }}></h1>
			<div style={{ display: "grid", justifyContent: "center" }}>
				<ReactQuill
					theme="snow"
					modules={modules}
					formats={formats}
					placeholder="Escribe aquí..."
					onChange={handleProcedureContentChange}
					style={{
						height: "220px",
					}}></ReactQuill>
			</div>
		</div>
	);
};
