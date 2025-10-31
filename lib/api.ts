import axios from "axios";
import type { Note, NoteTag } from "@/types/note"; 


const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});


instance.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag; 
}


export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const { data } = await instance.post<Note>("/notes", payload);
  return data;
};


export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
}: {
  page?: number;
  perPage?: number;
  search?: string;
}): Promise<{ notes: Note[]; totalPages: number }> => {
  const { data } = await instance.get<{ notes: Note[]; totalPages: number }>(
    "/notes",
    {
      params: { page, perPage, search },
    }
  );
  return data;
};


export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};


export const deleteNote = async (id: string): Promise<void> => {
  await instance.delete(`/notes/${id}`);
};
