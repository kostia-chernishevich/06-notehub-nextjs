import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

// ⛔️ Без "use client" — це серверний компонент!
export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Prefetch notes на сервері
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, 12, ""],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
