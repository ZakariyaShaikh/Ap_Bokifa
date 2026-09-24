import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';

const testimonials = [
  { id: 1, name: 'Alice Johnson', rating: 5, date: '12 Sep 2026', title: 'Incredible selection!', review: 'Incredible selection of books! The delivery was fast and the packaging was great. I was honestly surprised by how quickly it arrived. The quality of the books is excellent, and the packaging kept them in perfect condition. I will definitely be ordering again very soon!' },
  { id: 2, name: 'Bob Smith', rating: 4, date: '10 Sep 2026', title: 'Easy to use', review: 'Great experience, easy to navigate website and found exactly what I was looking for. The search functionality is very intuitive, and the categories are well-organized. It made finding my favorite genres a breeze. Highly recommended for any book lover out there!' },
  { id: 3, name: 'Charlie Davis', rating: 5, date: '08 Sep 2026', title: 'Fantastic service!', review: 'Fantastic customer service! Had an issue with an order and they resolved it immediately. I was really impressed by the speed of their response and the professionalism they showed. It is rare to find such dedicated support these days. Thanks a lot!' },
  { id: 4, name: 'Diana Evans', rating: 5, date: '05 Sep 2026', title: 'Best bookstore!', review: 'Best bookstore online. Their recommendations are always spot on. I have discovered so many new favorite authors thanks to their curation. The user interface is clean, and the checkout process is smooth and secure. Truly a wonderful platform for bibliophiles.' },
  { id: 5, name: 'Edward Foster', rating: 4, date: '02 Sep 2026', title: 'Good prices', review: 'Good prices and a wide range of genres. Definitely my go-to place for books. They often have great sales and discounts, making it affordable to build my library. The delivery service is reliable, and I have never had any issues with my orders. Fantastic job!' },
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-serif text-gray-900">What client says</h2>
          <div className="w-40 h-40 bg-green-800 rounded-full flex flex-col items-center justify-center text-white shadow-lg p-4">
            <div className="text-3xl font-bold flex items-baseline gap-0.5">
              <span>4.8</span>
              <span className="text-lg text-yellow-200">/5</span>
            </div>
            <div className="flex text-yellow-300 my-1">
              {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <a href="#" className="text-xs underline text-center">12,598 Verified Reviews</a>
          </div>
        </div>
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[320px] flex flex-col">
                
                <div className="flex flex-col mb-6">
                  <h3 className="font-semibold text-gray-900 mb-1">{t.name}</h3>
                  <div className="flex justify-between items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < t.rating ? 'text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{t.date}</span>
                  </div>
                </div>

                
                <div className="flex flex-col flex-grow">
                  <h4 className="font-bold text-gray-800 mb-3">{t.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{t.review}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-prev !text-black !w-10 !h-10 -left-2"></div>
          <div className="swiper-button-next !text-black !w-10 !h-10 -right-2"></div>
        </Swiper>
      </div>
    </section>
  );
};
