import { parsePrice } from "./format";



export const toBookItem = (book) => {
  if (!book || typeof book !== "object") return null;

  const id = book.id ?? book.book_id;

  if (id === null || id === undefined) return null;

  return {
    id,
    title: book.title || "Untitled",
    author: book.author || book.author_name || "—",
    authorId: book.authorId ?? book.author_id ?? null,
    price: parsePrice(book.price),
    cover: book.cover || book.cover_image || null,
    description: book.description || "",
  };
};

export const toBookItems = (books) => (Array.isArray(books) ? books.map(toBookItem).filter(Boolean) : []);



export const rehydrateStoredItems = (storedItems, catalog) => {
  const freshById = new Map(toBookItems(catalog).map((item) => [String(item.id), item]));

  return storedItems
    .map((stored) => {
      const fresh = freshById.get(String(stored.id));

      if (!fresh) return null;

      return { ...fresh, ...pickOwnFields(stored) };
    })
    .filter(Boolean);
};


const pickOwnFields = (stored) => {
  const own = {};

  Object.keys(stored).forEach((key) => {
    if (["quantity", "addedAt"].includes(key)) own[key] = stored[key];
  });

  return own;
};
