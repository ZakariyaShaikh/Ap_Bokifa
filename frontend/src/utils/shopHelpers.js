



export const getBookTitle = (book) => {

  if (!book || !book.title) return "";

  return String(book.title);
};


export const getBookAuthor = (book) => {
  if (!book) return "";

  return String(book.author_name || book.author || "");
};


export const getBookPrice = (book) => {

  if (book?.price === null || book?.price === undefined || book?.price === "") return null;

  const amount = Number(book.price);

  return Number.isFinite(amount) ? amount : null;
};


export const formatPrice = (price) => {
  const amount = getBookPrice({ price });
  if (amount === null) return "-";
  return `$${amount.toFixed(2)}`;
};


export const normalizeTerm = (term) => {
  if (term === null || term === undefined) return "";
  return String(term).trim().toLowerCase();
};


export const matchesSearch = (book, term) => {

  const clean = normalizeTerm(term);
  if (!clean) return true;

  const haystack = normalizeTerm(
    `${getBookTitle(book)} ${getBookAuthor(book)} ${book?.description || ""}`
  );

  return haystack.includes(clean);
};
