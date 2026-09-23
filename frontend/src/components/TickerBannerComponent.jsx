import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
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

  // Duplicate items array to prevent empty space during loop transitions
  const displayItems = [...stats, ...stats, ...stats];

  return (
    <div className="w-full bg-[#fdfcf9] border-y border-stone-200 py-3 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={32}
        loop={true}
        speed={4000}
        allowTouchMove={false}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        freeMode={true}
        className="marquee-swiper ease-linear"
      >
        {displayItems.map((item, index) => (
          <SwiperSlide key={index} className="!w-auto flex items-center">
            <div className="flex items-center gap-1.5 text-sm md:text-base whitespace-nowrap">
              <span className="font-bold text-emerald-800">{item.value}</span>
              <span className="text-stone-800">{item.label}</span>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
      <style dangerouslySetInnerHTML={{ __html: `
        .marquee-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}} />
    </div>
  );
};

