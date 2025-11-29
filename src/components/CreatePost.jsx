import { Form, useActionData } from "react-router";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

function CreatePost() {
  const errorData = useActionData();
  const editorRef = useRef(null);
  const contentRef = useRef(null);

  return (
    <main>
      <Form
        method="POST"
        action="/create"
        onSubmit={() => {
          contentRef.current.value = editorRef.current.getContent();
        }}
      >
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" required />
        </p>

        <p>
          <Editor
            apiKey="yf1z09h1xzcovvleh9v80y07181spwueku204st0ukxh32o5"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue="<h1>What's on your mind?</h1>"
            plugins={"wordcount"}
            init={{
              width: "100%",
              height: 500,
              menubar: false,
              branding: false,
              paste_data_images: false,
              toolbar:
                "undo redo | blocks | " +
                "bold italic | alignleft aligncenter " +
                "alignright | bullist numlist | " +
                "removeformat",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
            }}
          />
        </p>

        <input type="hidden" name="content" ref={contentRef} />

        <fieldset>
          <legend>Post Visibility:</legend>
          <p>
            <input
              type="radio"
              name="visibility"
              value="PUBLIC"
              id="public"
              defaultChecked
            />
            <label htmlFor="public">Public</label>
          </p>
          <p>
            <input
              type="radio"
              name="visibility"
              value="PRIVATE"
              id="private"
            />
            <label htmlFor="private">Private</label>
          </p>
        </fieldset>

        {errorData && (
          <ul>
            {errorData.map((err) => (
              <li>{err.msg}</li>
            ))}
          </ul>
        )}

        <button type="submit">Submit Post</button>
      </Form>
    </main>
  );
}

export default CreatePost;
