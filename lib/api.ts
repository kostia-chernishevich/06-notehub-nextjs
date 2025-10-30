import axios from "axios";

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
  tags?: string[];
}


export const createNote = async (payload: CreateNotePayload) => {
  const { data } = await instance.post("/notes", payload);
  return data;
};


export const fetchNotes = async ({
  page,
  perPage,
  search,
}: {
  page: number;
  perPage: number;
  search: string;
}) => {
  const { data } = await instance.get("/notes", {
    params: { page, perPage, search },
  });
  return data;
};


export const fetchNoteById = async (id: string) => {
  const { data } = await instance.get(`/notes/${id}`);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await instance.delete(`/notes/${id}`);
  return data;
};