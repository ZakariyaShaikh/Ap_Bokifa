import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useAuthors } from '../context/admin/AuthorContext';

export const FeaturedAuthors = () => {
  const { authors, loading, error } = useAuthors();
  const list = Array.isArray(authors) ? authors : [];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-serif text-gray-900">Featured Authors</h2>
        </div>
        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600 py-8">{error}</p>
        ) : list.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No data available</p>
        ) : (
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          autoplay={true}
          spaceBetween={30}
          slidesPerView={7}
          loop={list.length > 7}
          breakpoints={{
            320: { slidesPerView: 3 },
            640: { slidesPerView: 5 },
            1024: { slidesPerView: 8 },
          }}
          className="featured-authors-swiper"
        >
          {list.map((author) => (
            <SwiperSlide key={author.id}>
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-green-700 transition-all duration-300">
                  <img src={author.profile_image} alt={author.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center">{author.name}</h3>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev !text-black !w-10 !h-10 "></div>
          <div className="swiper-button-next !text-black !w-10 !h-10"></div>
        </Swiper>
        )}
      </div>
    </section>
  );
};
