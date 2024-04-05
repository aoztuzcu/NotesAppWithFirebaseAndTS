import React, { useEffect } from "react";
import { useAppDispatch, RootState } from "@/store";
import { useSelector } from "react-redux";
import {
  fetchNotesAsync,
  removeNoteAsync,
  setCurrentNote,
} from "@/store/notesSlice";
import { Note } from "@/types";
import { useNavigate } from "react-router-dom";
import { ViewName } from "@/types/enums";

const Welcome: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notes = useSelector((state: RootState) => state.notes);
  const { status, error, items: allNotes } = notes;

  useEffect(() => {
    dispatch(fetchNotesAsync()).then(() => console.log(allNotes));
  }, []);

  if (status === "loading") {
    return <div>Loading</div>;
  }
  if (error) return <div>{error}</div>;

  if (allNotes.length === 0) {
    return <div>Henüz Not Yok</div>;
  }

  const handleEdit = (note: Note) => {
    dispatch(setCurrentNote(note));
    navigate(ViewName.Edit + "/" + note.id);
  };

  const handleRemove = (id: string) => {
    dispatch(removeNoteAsync(id));
  };

  return (
    <div>
      <h1>Notlarım</h1>
      <ul className="note-list">
        {allNotes.length > 1 &&
          allNotes.map((item) => (
            <li key={item?.id}>
              <p onClick={() => navigate(ViewName.Detail + "/" + item.id)}>
                {item?.title}
              </p>
              <button onClick={() => handleEdit(item)}>Düzenle</button>
              <button onClick={() => handleRemove(item.id)}>Sil</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Welcome;
