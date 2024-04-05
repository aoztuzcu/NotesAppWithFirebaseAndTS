export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export type NoteWithoutId = Omit<Note, "id">;
export type NoteWithContent = Pick<Note, "title" | "content">;
export type Notes = Note[];

export type StateStatus = "idle" | "loading" | "succeeded" | "failed";
