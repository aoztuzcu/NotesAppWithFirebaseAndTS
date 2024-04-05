import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import { editNoteAsync } from "@/store/notesSlice";
import NoteForm from "@/components/NoteForm";
import { Note, NoteWithContent, NoteWithoutId } from "@/types";
import dayjs from "dayjs";

const Edit: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentNote = useSelector(
    (state: RootState) => state.notes.currentNote
  );

  const handleSubmit = (values: NoteWithContent) => {
    const now = dayjs().toISOString();
    const updatedNote = {
      ...currentNote,
      ...values,
      updatedAt: now,
    } as Note;
    dispatch(editNoteAsync(updatedNote));
  };

  return (
    <div>
      <h1>Not Düzenle</h1>
      <NoteForm
        handleSubmit={handleSubmit}
        note={currentNote as NoteWithoutId}
      />
    </div>
  );
};

export default Edit;
