import { FaChevronRight, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export const NewsletterBar = () => {
  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-9xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        
        
        <div className="text-center lg:text-left flex-1">
          <h2 className="text-3xl font-serif text-[#1A1A1A] mb-2">Stay in the know</h2>
          <p className="text-gray-500 max-w-[300px] mx-auto lg:mx-0">
            Subscribe to our newsletter and stay updated on latest offers, discounts and events near you.
          </p>
        </div>

        
        <div className="flex-1 w-full max-w-md">
          <div className="bg-[#F4F4F5] rounded-full p-1.5 flex items-center border border-gray-200">
            <input 
              type="email" 
              placeholder="Email id" 
              className="bg-transparent flex-grow px-4 py-2 text-sm text-gray-700 focus:outline-none"
            />
            <button className="flex items-center gap-2 bg-[#0F766E] text-white px-6 py-2 rounded-full font-bold text-sm">
              Subscribe <FaChevronRight size={12} />
            </button>
          </div>
        </div>

        
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90">
            <FaFacebookF size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#18181B] text-white flex items-center justify-center hover:opacity-90">
            <FaXTwitter size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center hover:opacity-90">
            <FaInstagram size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
