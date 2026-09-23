import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f3f1] px-4">
      <div className="w-full max-w-md text-center">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-xl bg-[#0f5a45] flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-[#0f5a45] tracking-tight">
            404
          </h1>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <p className="text-xl font-semibold text-gray-800 mb-6">
            No route is exists
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2.5 bg-[#0f5a45] text-white rounded-lg font-medium hover:bg-[#083f34] transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
