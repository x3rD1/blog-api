import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

function TinyEditor({ value, onChange }) {
  const editorRef = useRef(null);

  return (
    <Editor
      apiKey="0mysonpndgbo09rc82p4wzlscvef0xiz63d98sy9iqx9z9ue"
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={value}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code",
      }}
      onEditorChange={(content) => onChange(content)}
    />
  );
}

export default TinyEditor;
