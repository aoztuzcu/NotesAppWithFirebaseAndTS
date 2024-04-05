import React from "react";
import { NoteWithContent, NoteWithoutId } from "@/types";
import { useFormik } from "formik";
import * as Yup from "yup";

interface NoteFormProps {
  note?: NoteWithoutId;
  handleSubmit: (values: NoteWithContent) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, handleSubmit }) => {
  const initialValues: NoteWithContent = {
    title: note?.title || "",
    content: note?.content || "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Zorunlu"),
    content: Yup.string().required("Zorunlu"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const { title, content } = values;
      handleSubmit({ title, content });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="note-form">
      <div className="form-group">
        <label htmlFor="title">Başlık</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="error">{formik.errors.title}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="contentTextArea">İçerik</label>
        <textarea
          name="content"
          id="contentTextArea"
          rows={5}
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.content && formik.errors.content && (
          <div className="error">{formik.errors.content}</div>
        )}
      </div>

      <button type="submit" className="button">
        {note ? "Güncelle" : "Oluştur"}
      </button>
    </form>
  );
};

export default NoteForm;
