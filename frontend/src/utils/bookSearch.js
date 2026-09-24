import { parsePrice } from "./format";

export const SORT_OPTIONS = [
  { value: "relevance", label: "Best match" },
  { value: "title-asc", label: "Title: A to Z" },
  { value: "title-desc", label: "Title: Z to A" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export const DEFAULT_FILTERS = {
  query: "",
  authorId: "all",
  maxPrice: null,
  sortBy: "relevance",
};

export const getBookTitle = (book) => (book?.title || "").toString();

export const getBookAuthor = (book) => (book?.author_name || book?.author || "").toString();

export const getBookAuthorId = (book) => {
  const id = book?.author_id ?? book?.authorId;

  return id === undefined || id === null ? "" : String(id);
};

export const getBookPrice = (book) => parsePrice(book?.price);


export const normalizeTerm = (term) => (term === null || term === undefined ? "" : String(term).trim().toLowerCase());

const includesTerm = (value, term) => normalizeTerm(value).includes(term);


const scoreBook = (book, term) => {
  if (!term) return 0;

  const title = normalizeTerm(getBookTitle(book));
  const author = normalizeTerm(getBookAuthor(book));

  let score = 0;

  if (title.startsWith(term)) score += 100;
  if (includesTerm(title, term)) score += 50;
  if (includesTerm(author, term)) score += 25;
  if (includesTerm(book?.isbn, term)) score += 15;
  if (includesTerm(book?.description, term)) score += 5;

  return score;
};

const matchesCriteria = (book, filters, term) => {
  if (filters.authorId !== "all" && getBookAuthorId(book) !== String(filters.authorId)) return false;

  if (filters.maxPrice !== null) {
    const price = getBookPrice(book);

    if (price === null || price > filters.maxPrice) return false;
  }

  if (!term) return true;

  return scoreBook(book, term) > 0;
};

const compareBySort = (sortBy) => (left, right) => {
  if (sortBy === "title-asc") return getBookTitle(left).localeCompare(getBookTitle(right));
  if (sortBy === "title-desc") return getBookTitle(right).localeCompare(getBookTitle(left));
  if (sortBy === "price-asc") return toComparablePrice(left) - toComparablePrice(right);
  if (sortBy === "price-desc") return toComparablePrice(right) - toComparablePrice(left);

  return 0;
};

const toComparablePrice = (book) => {
  const price = getBookPrice(book);

  return price === null ? Number.POSITIVE_INFINITY : price;
};


export const searchBooks = (books, filters = DEFAULT_FILTERS) => {
  const list = Array.isArray(books) ? books : [];
  const term = normalizeTerm(filters.query);

  const matched = list.filter((book) => matchesCriteria(book, filters, term));

  if (filters.sortBy && filters.sortBy !== "relevance") {
    return [...matched].sort(compareBySort(filters.sortBy));
  }

  if (!term) return matched;

  return [...matched].sort((left, right) => scoreBook(right, term) - scoreBook(left, term));
};


export const collectAuthorOptions = (books) => {
  const counts = new Map();

  (Array.isArray(books) ? books : []).forEach((book) => {
    const id = getBookAuthorId(book);
    const name = getBookAuthor(book);

    if (!id || !name) return;

    const entry = counts.get(id) || { id, name, count: 0 };

    entry.count += 1;
    counts.set(id, entry);
  });

  return [...counts.values()].sort((left, right) => right.count - left.count || left.name.localeCompare(right.name));
};


export const getMaxCataloguePrice = (books) => {
  const prices = (Array.isArray(books) ? books : [])
    .map(getBookPrice)
    .filter((price) => price !== null);

  if (prices.length === 0) return 0;

  return Math.ceil(Math.max(...prices));
};
