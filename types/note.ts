export type NoteTag = "work" | "study" | "personal" | "other";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;      
  tag: NoteTag;           
}
