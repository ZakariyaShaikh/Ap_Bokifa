import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useBlogs } from '../context/admin/BlogContext';

const fmtDate = (d) => {
  if (!d) return '';
  try { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase(); }
  catch { return ''; }
};

export const NewsEventsSection = () => {
  const { blogs, loading, error } = useBlogs();
  const list = Array.isArray(blogs) ? blogs : [];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-serif text-[#1A1A1A]">News & events</h2>
          <button className="border border-gray-300 rounded-full px-6 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
            Browse All &gt;
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
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={3}
          loop={list.length > 3}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="news-swiper"
        >
          {list.map((article) => (
            <SwiperSlide key={article.id}>
              <div className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl aspect-[3/2]">
                  <img 
                    src={article.featured_image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  
                  <div className="absolute bottom-4 left-4 rounded-full px-4 py-2 shadow-md bg-white text-gray-600">
                    <span className="text-[10px] font-bold tracking-widest uppercase">
                      {article.status ? `${article.status}` : ''}{article.created_at ? ` / ${fmtDate(article.created_at)}` : ''}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-serif text-[#1A1A1A] mt-4 leading-snug line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        )}
      </div>
    </section>
  );
};
