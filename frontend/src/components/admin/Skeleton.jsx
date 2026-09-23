export const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-gray-200 border-t-[#0f5a45] rounded-full animate-spin`}
      />
    </div>
  );
};

export const CardSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
    <div className="h-8 bg-gray-200 rounded w-1/2" />
  </div>
);

export const TableRowSkeleton = ({ columns = 4 }) => (
  <tr className="animate-pulse">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 bg-gray-200 rounded w-full" />
      </td>
    ))}
  </tr>
);

export const DashboardCardSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="h-4 bg-gray-200 rounded w-24" />
      <div className="w-8 h-8 bg-gray-200 rounded" />
    </div>
    <div className="h-8 bg-gray-200 rounded w-16" />
    <div className="h-3 bg-gray-200 rounded w-20 mt-2" />
  </div>
);