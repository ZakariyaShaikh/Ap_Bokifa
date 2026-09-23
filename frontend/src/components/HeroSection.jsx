import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { IoChevronForward } from "react-icons/io5";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const heroSlides = [
  {
    id: 1,
    bgImage: "https://ap-bokifa.myshopify.com/cdn/shop/files/ap_bo_slide_1.jpg?v=1729482289&width=3000",
    eyebrow: "A brand new series.",
    heading: "THE WORLD OF YOUNG ADULT BOOKS",
    description: "Save up to 15% on new releases.",
    cta: "Discover Now",
    layout: "right",
    badge: "15% OFF",
    badgeColor: "bg-[#FF7A00]",
    eyebrowColor: "text-slate-500"
  },
  {
    id: 2,
    bgImage: "https://ap-bokifa.myshopify.com/cdn/shop/files/ap_bo_slide_2.jpg?v=1729482289&width=3000",
    eyebrow: "Fiction addiction.",
    heading: "YOUR ULTIMATE PAGE-TO-SCREEN READING LIST",
    description: "Save over $24 with the Booker prize shortlist collection",
    cta: "Discover Now",
    layout: "center",
    badge: null,
    eyebrowColor: "text-[#FF4D4D]"
  },
  {
    id: 3,
    bgImage: "https://ap-bokifa.myshopify.com/cdn/shop/files/bo_h1_slide.jpg?v=1728533089&width=3000",
    eyebrow: "In-store and online.",
    heading: "MORE HORROR NOVELS FROM STAR AUTHORS",
    description: "Stay up-to-date with the most exciting new books.",
    cta: "Discover Now",
    layout: "left",
    badge: "15% OFF",
    badgeColor: "bg-[#E60000]",
    eyebrowColor: "text-[#E60000]"
  }
];

const ScallopedBadge = ({ text, colorClass }) => (
  <div className="relative flex items-center justify-center w-24 h-24 lg:w-32 lg:h-32 transition-transform hover:scale-110 duration-300">
    <div className={`absolute inset-0 ${colorClass} rounded-full shadow-xl`}></div>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg className="w-[110%] h-[110%] animate-spin-slow text-white" viewBox="0 0 100 100">
        <path 
          d="M50 2 L55 18 L70 12 L65 28 L80 32 L72 46 L85 55 L72 64 L80 78 L65 82 L70 98 L55 92 L50 108 L45 92 L30 98 L35 82 L20 78 L28 64 L15 55 L28 46 L20 32 L35 28 L30 12 L45 18 Z" 
          fill="currentColor"
        />
      </svg>
    </div>
    <span className="relative z-20 text-[10px] lg:text-sm font-bold text-black tracking-tight text-center px-2">{text}</span>
  </div>
);

export const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F3F1]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        slidesPerView={1}
        loop={true}
        speed={800}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
        }}
        className="hero-swiper h-[500px] lg:h-[700px]"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="relative w-full h-full flex items-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative h-full flex items-center">
                
                <div className={`w-full flex ${
                  slide.layout === 'center' ? 'justify-center text-center' : 
                  slide.layout === 'right' ? 'justify-end' : 'justify-start'
                }`}>
                  
                  <div className={`max-w-xl lg:max-w-2xl flex flex-col ${
                    slide.layout === 'center' ? 'items-center' : 'items-start'
                  }`}>
                    {slide.eyebrow && (
                      <span className={`text-sm lg:text-base font-semibold uppercase tracking-wider mb-4 ${slide.eyebrowColor}`}>
                        {slide.eyebrow}
                      </span>
                    )}
                    <h1 className="text-3xl lg:text-7xl font-serif font-bold text-gray-900 leading-[1.1] mb-6 uppercase">
                      {slide.heading}
                    </h1>
                    <p className="text-gray-600 text-sm lg:text-lg mb-8 max-w-md">
                      {slide.description}
                    </p>
                    <button className="bg-white text-gray-900 px-8 lg:px-10 py-3 lg:py-4 rounded-full font-bold flex items-center gap-2 shadow-xl hover:bg-gray-50 transition-all duration-300 group text-sm lg:text-base">
                      {slide.cta} 
                      <IoChevronForward className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {slide.badge && slide.layout === 'left' && (
                  <div className="absolute left-[50%] lg:left-[45%] top-[35%] lg:top-[30%]">
                    <ScallopedBadge text={slide.badge} colorClass={slide.badgeColor} />
                  </div>
                )}
                {slide.badge && slide.layout === 'right' && (
                  <div className="absolute left-[20%] lg:left-[35%] top-[40%] lg:top-[35%]">
                    <ScallopedBadge text={slide.badge} colorClass={slide.badgeColor} />
                  </div>
                )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-bullet {
          width: 8px;
          height: 8px;
          background: #fff;
          opacity: 0.5;
          border-radius: 50%;
          display: inline-block;
          margin: 0 6px !important;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .custom-bullet-active {
          width: 24px !important;
          height: 8px !important;
          background: #0e3d2f !important;
          border-radius: 9999px !important;
          opacity: 1 !important;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .swiper-pagination {
          bottom: 32px !important;
        }
      `}} />

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
};
