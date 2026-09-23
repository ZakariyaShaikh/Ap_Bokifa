import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

export default function ImageUpload({
  value,
  onChange,
  preview,
  label = "Image",
  accept = "image/jpeg,image/png,image/webp",
  maxSize = 5,
  error,
  disabled = false,
  circular = false,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState("");
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file) => {
    if (!file) return "No file selected";

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return "Only JPG, PNG, and WebP images are allowed";
    }

    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSize}MB`;
    }

    return null;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const file = e.dataTransfer.files[0];
    const validationError = validateFile(file);
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    setLocalError("");
    onChange(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const validationError = validateFile(file);
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    setLocalError("");
    onChange(file);
  };

  const handleRemove = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange(null);
  };

  const displayError = error || localError;
  const imagePreview = value ? URL.createObjectURL(value) : preview;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">{label}</label>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg transition-all duration-200 ${
          isDragging
            ? "border-[#0f5a45] bg-[#0f5a45]/5"
            : displayError
            ? "border-red-300 bg-red-50"
            : "border-gray-300 hover:border-gray-400"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {imagePreview ? (
          <div className="p-4">
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className={`object-cover border border-gray-200 ${
                  circular ? "w-24 h-24 rounded-full" : "w-32 h-32 rounded-lg"
                }`}
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className={`mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 ${
              circular ? "rounded-full" : "rounded-lg"
            }`}>
              {circular ? (
                <ImageIcon className="w-6 h-6 text-gray-400" />
              ) : (
                <Upload className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-[#0f5a45]">Click to upload</span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">
              JPG, PNG or WebP (max {maxSize}MB)
            </p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
      </div>

      {displayError && (
        <p className="text-sm text-red-600">{displayError}</p>
      )}
    </div>
  );
}
