import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { FaEye, FaSyncAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../context/admin/BooksContext';

import { WishlistButton } from './shop/WishlistButton';
import { AddToCartButton } from './shop/AddToCartButton';

const formatPrice = (price) => (price === null || price === undefined || price === '' ? '—' : `$${price}`);

export const WeekHighlights = () => {
  const { books, loading, error } = useBooks();

  const navigate = useNavigate();
  const list = Array.isArray(books) ? books.slice(0, 10) : [];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-serif text-gray-900">This week's highlights</h2>
          
          <button
            type="button"
            onClick={() => navigate('/books')}
            className="text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 px-6 py-2 rounded-full flex items-center gap-2"
          >
            Browse All <span>&gt;</span>
          </button>
        </div>
        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600 py-8">{error}</p>
        ) : list.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No data available</p>
        ) : (
        <Swiper
          spaceBetween={20}
          slidesPerView={6}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          className="bestselling-books-swiper"
        >
          {list.map((book) => (
            <SwiperSlide key={book.id}>
              <div className="group relative flex flex-col items-center bg-white rounded-lg p-4 transition-all duration-300 hover:shadow-lg">
                <div className="relative w-full overflow-hidden rounded-lg">
                  <img src={book.cover_image} alt={book.title} className="w-full h-80 object-cover" />
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-15%</span>
                  
                  
                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <WishlistButton book={book} />
                    <button type="button" aria-label="Quick view" className="bg-white p-2 rounded-full shadow hover:bg-gray-100"><FaEye /></button>
                    <button type="button" aria-label="Compare" className="bg-white p-2 rounded-full shadow hover:bg-gray-100"><FaSyncAlt /></button>
                  </div>

                  
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <AddToCartButton book={book} variant="overlay" size="sm" />
                  </div>
                </div>
                
                <div className="w-full text-center mt-4">
                  <p className="text-xs text-gray-400 mb-1">★★★★★ (0)</p>
                  <h3 className="text-sm font-semibold text-gray-800 truncate">{book.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{book.author_name || '—'}</p>
                  <p className="text-lg font-bold text-green-700 mt-2">{formatPrice(book.price)}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        )}
      </div>
    </section>
  );
};
