import { FaTruck, FaGift, FaFire, FaBook } from 'react-icons/fa';

const features = [
  { icon: FaTruck, title: 'FAST DELIVERY', subtitle: 'Free standard delivery' },
  { icon: FaGift, title: 'BEST PRICES & OFFERS', subtitle: 'Multiple gift options available' },
  { icon: FaFire, title: 'GREAT DAILY DEAL', subtitle: 'Orders $50 or more' },
  { icon: FaBook, title: 'CLICK & COLLECT', subtitle: 'Check your local stores now' },
];

export const FeaturesSection = () => {
  return (
    <section className="bg-gray-200 py-10 ">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <feature.icon className="text-4xl text-gray-800 mb-4" />
              <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
