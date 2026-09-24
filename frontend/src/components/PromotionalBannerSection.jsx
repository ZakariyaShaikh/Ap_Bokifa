import { useBooks } from '../context/admin/BooksContext';

export const PromotionalBannerSection = () => {
  const { books, loading, error } = useBooks();
  const list = Array.isArray(books) ? books.slice(0, 3) : [];
  const bg = [
    "bg-gradient-to-r from-blue-900 to-blue-700",
    "bg-gradient-to-r from-red-900 to-purple-800",
    "bg-gradient-to-r from-green-900 to-teal-700",
  ];
  const eyebrows = ["Game. Anime. Life", "New this week", "Fiction bestsellers."];

  if (loading) {
    return (
      <section className="py-10 max-w-20xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 py-8">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 max-w-20xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-red-600 py-8">{error}</p>
      </section>
    );
  }

  if (list.length === 0) {
    return (
      <section className="py-10 max-w-20xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 py-8">No data available</p>
      </section>
    );
  }

  return (
    <section className="py-10 max-w-20xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {list.map((book, idx) => (
          <div key={book.id} className={`rounded-3xl p-8 flex items-center h-64 ${bg[idx % bg.length]}`}>
            
            <div className="w-1/3 h-full flex items-center justify-center">
              <img
                src={book.cover_image}
                alt={book.title}
                className="max-h-full object-contain rounded-lg shadow-lg"
              />
            </div>

            
            <div className="w-2/3 pl-6">
              <p className="text-white opacity-90 uppercase text-xs tracking-widest font-semibold">{eyebrows[idx % eyebrows.length]}</p>
              <h2 className="text-white text-3xl font-serif font-bold my-3 leading-tight uppercase line-clamp-2">
                {book.title}
              </h2>
              <button className="bg-white text-black rounded-full px-6 py-2 text-sm font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                Shop Now <span>&rarr;</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
