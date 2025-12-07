import { Form, Navigate, useActionData } from "react-router";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "../assets/css/CreatePost.module.css";

function CreatePost() {
  const errorData = useActionData();
  const editorRef = useRef(null);
  const contentRef = useRef(null);

  if (!localStorage.getItem("token")) {
    return <Navigate to={"/login"} />;
  }

  return (
    <main className={styles.container}>
      <Form
        method="POST"
        action="/create"
        onSubmit={() => {
          contentRef.current.value = editorRef.current.getContent();
        }}
      >
        <p className={styles.formSection}>
          <label className={styles.titleLabel} htmlFor="title">
            Title
          </label>
          <input
            className={styles.titleInput}
            type="text"
            name="title"
            id="title"
            placeholder="What's on your mind?"
            required
          />
        </p>

        <hr className={styles.separator} />

        <p className={styles.editorContainer}>
          <Editor
            apiKey="yf1z09h1xzcovvleh9v80y07181spwueku204st0ukxh32o5"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue="<h2>What's on your mind?</h2>"
            plugins={["wordcount", "lists", "codesample"]}
            init={{
              width: "100%",
              height: "600px",
              menubar: false,
              branding: false,
              paste_data_images: false,
              toolbar:
                "undo redo | blocks | " +
                "bold italic | alignleft aligncenter " +
                "alignright | bullist numlist codesample| " +
                "removeformat",
              block_formats:
                "Paragraph=p; Preformatted=pre; Heading 2=h2; Heading 3=h3; Heading 4=h4;",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; } ",
            }}
          />
        </p>

        <input type="hidden" name="content" ref={contentRef} />

        {errorData && (
          <>
            <hr className={styles.separator} />

            <ul className={styles.errList}>
              {errorData.map((err) => (
                <li>{err.msg}</li>
              ))}
            </ul>
          </>
        )}

        <hr className={styles.separator} />

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Post Visibility</legend>
          <p>
            <input
              type="radio"
              name="visibility"
              value="PUBLIC"
              id="public"
              defaultChecked
            />
            <label htmlFor="public"> Public</label>
          </p>
          <p>
            <input
              type="radio"
              name="visibility"
              value="PRIVATE"
              id="private"
            />
            <label htmlFor="private"> Private</label>
          </p>
        </fieldset>

        <hr className={styles.separator} />

        <button className={styles.submitBtn} type="submit">
          Submit Post
        </button>
      </Form>
    </main>
  );
}

export default CreatePost;
