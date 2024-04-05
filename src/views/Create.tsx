import NoteForm from "@/components/NoteForm";
import { NoteWithContent, NoteWithoutId } from "@/types";
import dayjs from "dayjs";
import { useAppDispatch, RootState } from "@/store";
import { useSelector } from "react-redux";
import { addNoteAsync } from "@/store/notesSlice";

const Create = () => {
  const dispatch = useAppDispatch();
  const notes = useSelector((state: RootState) => state.notes);
  const { status, error } = notes;

  if (status === "loading") {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const handleSubmit = (values: NoteWithContent) => {
    const now = dayjs().toISOString();
    const newNote: NoteWithoutId = {
      ...values,
      createdAt: now,
      updatedAt: now,
    };
    dispatch(addNoteAsync(newNote)).then(() => console.log("not eklendi"));
  };

  return (
    <div>
      <h1>Not Oluştur</h1>
      <NoteForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default Create;
