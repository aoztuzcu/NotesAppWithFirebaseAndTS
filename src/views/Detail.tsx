import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchNoteAsync } from "@/store/notesSlice";
import { useAppDispatch, RootState } from "@/store";
import { useSelector } from "react-redux";

const Detail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const notes = useSelector((state: RootState) => state.notes);
  const { status, error, currentNote } = notes;

  useEffect(() => {
    if (id) {
      dispatch(fetchNoteAsync(id));
    }
  }, []);

  if (status === "loading") {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="note-detail">
      <h1>{currentNote?.title}</h1>
      <p>{currentNote?.content}</p>
      <p>{currentNote?.createdAt} Tarihinde oluşturuldu.</p>
      <p>{currentNote?.updatedAt} Tarihinde Güncellendi</p>
    </div>
  );
};

export default Detail;
