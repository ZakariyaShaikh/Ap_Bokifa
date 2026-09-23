import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const categories = [
  { name: 'Fantasy', image: 'https://ap-bokifa.myshopify.com/cdn/shop/files/ap_bo_typecollection_8.png?v=1729585074&width=80' },
  { name: 'Horror', image: 'https://ap-bokifa.myshopify.com/cdn/shop/files/ap_bo_typecollection_7.png?v=1729585074&width=80' },
  { name: 'Family', image: 'https://ap-bokifa.myshopify.com/cdn/shop/files/ap_bo_typecollection_6.png?v=1729585073&width=80' },
  { name: 'Fiction', image: 'https://ap-bokifa.myshopify.com/cdn/shop/files/ap_bo_typecollection_5.png?v=1729585073&width=80' },
  { name: 'Romance', image: 'https://ap-bokifa.myshopify.com/cdn/shop/files/ap_bo_typecollection_4.png?v=1729585074&width=80' },
  { name: 'Kids', image: 'https://ap-bokifa.myshopify.com/cdn/shop/files/ap_bo_typecollection_3.png?v=1729585074&width=80' },
  { name: 'History', image: 'https://ap-bokifa.myshopify.com/cdn/shop/files/ap_bo_typecollection_2.png?v=1729585074&width=80' },
  { name: 'Biography', image: 'https://ap-bokifa.myshopify.com/cdn/shop/files/ap_bo_typecollection_1.png?v=1729585073&width=80' },
];

export const TopCategories = () => {
  return (
    <section className="py-20  bg-stone-20">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-20">
          <h2 className="text-3xl font-serif text-gray-900">Top categories</h2>
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 px-6 py-2 rounded-full flex items-center gap-2">
            Browse All <span>&gt;</span>
          </button>
        </div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={8}
          breakpoints={{
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 8 },
          }}
          navigation
          className="top-categories-swiper"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.name}>
              <div className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer">
                <img src={category.image} alt={category.name} className="w-20 h-20 mb-4 object-contain" />
                <span className="text-sm font-medium text-gray-700">{category.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};


