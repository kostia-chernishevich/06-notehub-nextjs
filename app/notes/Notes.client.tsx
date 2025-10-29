"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import css from "../page.module.css"; 

const NotesClient = () => {
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [search] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, perPage, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch }),
    placeholderData: (prev) => prev,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Could not fetch notes.</p>;

 
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <input
          type="text"
          placeholder="Search notes"
          className={css.search}
        />
        <button className={css.button}>Create note +</button>
      </header>

      <h2>Notes list</h2>
      {data?.notes?.length === 0 && <p>No notes found.</p>}
      <ul>
        {data?.notes?.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>{note.createdAt}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesClient;
