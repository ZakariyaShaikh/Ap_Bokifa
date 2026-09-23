import { FaRegHeart, FaRegEye, FaSyncAlt } from 'react-icons/fa';

export const ProductCardHorizontal = ({ product }) => {
  return (
    <div className="bg-white rounded-[16px] p-9 shadow-sm border border-gray-100 flex gap-9 max-w-[915px] h-full">
      {/* LEFT - Product Image */}
      <div className="relative w-1/2">
        {product.badge && (
          <div className="absolute top-4 left-4 bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center font-bold z-10 text-sm">
            {product.badge}
          </div>
        )}
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full rounded-[16px] object-cover" 
        />
        {/* Right side buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"><FaRegHeart size={20} /></button>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"><FaRegEye size={20} /></button>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"><FaSyncAlt size={20} /></button>
        </div>
      </div>

      {/* RIGHT - Info */}
      <div className="w-1/2 flex flex-col">
        <div className="flex items-center gap-2 mb-2 text-gray-400">
           <div className="flex gap-0.5">
             {[...Array(5)].map((_, i) => <span key={i}>☆</span>)}
           </div>
           <span>(0)</span>
        </div>
        <h4 className="text-2xl font-medium text-gray-900 mb-2 leading-tight">
          {product.title}
        </h4>
        <a href="#" className="text-gray-600 underline text-base mb-4">{product.vendor}</a>
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          {product.description || "Description placeholder..."}
        </p>
        <p className="text-green-600 text-2xl font-semibold mb-6">{product.price}</p>
        <button className="bg-green-600 text-white py-3 px-6 rounded-full font-semibold text-lg flex items-center justify-center gap-2 w-full mt-auto">
          <span>+</span> Add To Cart
        </button>
      </div>
    </div>
  );
};
