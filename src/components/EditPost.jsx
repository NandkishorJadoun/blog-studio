import { useLoaderData, useActionData, Form } from "react-router";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styles from "../assets/css/CreatePost.module.css";

function EditPost() {
  const { data } = useLoaderData();
  const errorData = useActionData();
  const editorRef = useRef(null);
  const contentRef = useRef(null);

  return (
    <main className={styles.container}>
      <Form
        method="PUT"
        action={`/posts/${data.id}/edit`}
        onSubmit={() => {
          contentRef.current.value = editorRef.current.getContent();
        }}
      >
        <div className={styles.formSection}>
          <label className={styles.titleLabel} htmlFor="title">
            Title
          </label>
          <input
            className={styles.titleInput}
            type="text"
            name="title"
            id="title"
            defaultValue={data.title}
            required
          />
        </div>

        <hr className={styles.separator} />

        <div className={styles.editorContainer}>
          <Editor
            apiKey="yf1z09h1xzcovvleh9v80y07181spwueku204st0ukxh32o5"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue={data.content}
            plugins={"wordcount"}
            init={{
              width: "100%",
              height: "600px",
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
        </div>

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
          <div>
            <input
              type="radio"
              name="visibility"
              value="PUBLIC"
              id="public"
              defaultChecked
            />
            <label htmlFor="public"> Public</label>
          </div>

          <div>
            <input
              type="radio"
              name="visibility"
              value="PRIVATE"
              id="private"
            />
            <label htmlFor="private"> Private</label>
          </div>
        </fieldset>

        <hr className={styles.separator} />

        <button className={styles.submitBtn} type="submit">
          Update Post
        </button>
      </Form>
    </main>
  );
}

export default EditPost;
