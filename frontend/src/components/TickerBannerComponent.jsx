

import { useAuthors } from '../context/admin/AuthorContext';
import { useBooks } from '../context/admin/BooksContext';

export const TickerBanner = () => {

  const { authors } = useAuthors();
  const { books } = useBooks();

  const authorCount = Array.isArray(authors) ? authors.length : 0;
  const bookCount = Array.isArray(books) ? books.length : 0;

  const stats = [
    { value: String(authorCount), label: 'authors' },
    { value: String(bookCount), label: 'total books' },
  ];

  const repeatedStats = Array.from({ length: 8 }, () => stats).flat();

  return (
    <div className="w-full bg-[#fdfcf9] border-y border-stone-200 py-3 overflow-hidden">

      <div className="ticker-track flex w-max items-center">

        {[0, 1].map((half) => (

          <div key={half} aria-hidden={half === 1} className="flex items-center">
            {repeatedStats.map((item, index) => (
              <div
                key={`${half}-${index}`}
                className="flex items-center gap-1.5 text-sm md:text-base whitespace-nowrap px-4"
              >
                <span className="font-bold text-emerald-800">{item.value}</span>
                <span className="text-stone-800">{item.label}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
