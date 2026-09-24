import { FaStar } from 'react-icons/fa';
import { ProductCardHorizontal } from './ProductCardHorizontal';
import { useBooks } from '../context/admin/BooksContext';

const toProduct = (book) => ({
  id: book.id,
  image: book.cover_image,
  title: book.title,
  vendor: book.author_name || '—',
  price: book.price === null || book.price === undefined || book.price === '' ? '—' : `$${book.price}`,
  badge: '-15%',
  description: book.description || '',
});

export const PicksForYou = () => {
  const { books, loading, error } = useBooks();
  const list = Array.isArray(books) ? books : [];
  const featured = list.slice(0, 1).map(toProduct);
  const minis = list.slice(1, 5);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600 py-8">{error}</p>
        ) : list.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No data available</p>
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            {featured.slice(0, 1).map((product) => (
              <ProductCardHorizontal key={product.id} product={product} />
            ))}
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {minis.map((book) => (
              <div key={book.id} className="flex gap-4 p-3 border border-gray-100 rounded-lg bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:scale-[0.98] cursor-pointer">
                <div className="w-46 h-66 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                  <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div className="space-y-1">
                    <div className="flex items-center text-xs text-yellow-500">
                      {[...Array(5)].map((_, i) => <FaStar key={i} size={12} />)}
                      <span className="text-gray-400 ml-1">(0)</span>
                    </div>
                    <h4 className="font-serif text-sm font-medium text-gray-800 line-clamp-2">{book.title}</h4>
                    <p className="text-xs text-gray-500">{book.author_name || '—'}</p>
                  </div>
                  <p className="text-emerald-700 font-bold text-sm">{book.price === null || book.price === undefined || book.price === '' ? '—' : `$${book.price}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
};


