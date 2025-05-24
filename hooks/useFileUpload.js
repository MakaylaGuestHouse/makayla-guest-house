import { useState } from "react";

// Custom hook for file upload handling
export const useFileUpload = (maxFileSize = 10) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Handle file selection
  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);

    // Validate file size (in MB)
    const validFiles = fileArray.filter((file) => {
      const fileSizeInMB = file.size / (1024 * 1024);
      const isValidSize = fileSizeInMB <= maxFileSize;

      if (!isValidSize) {
        setUploadError(
          `File "${file.name}" exceeds the ${maxFileSize}MB limit`
        );
        setTimeout(() => setUploadError(null), 3000);
      }

      return isValidSize;
    });

    // Create preview URLs for images
    const newFiles = validFiles.map((file) => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  // Handle file drop
  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  // Remove a file
  const removeFile = (fileIndex) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      // Revoke object URL to avoid memory leaks
      URL.revokeObjectURL(newFiles[fileIndex].preview);
      newFiles.splice(fileIndex, 1);
      return newFiles;
    });
  };

  // Clear all files
  const clearFiles = () => {
    // Revoke all object URLs
    files.forEach((file) => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
    setFiles([]);
  };

  // Clean up function to revoke object URLs when component unmounts
  const cleanup = () => {
    files.forEach((file) => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
  };

  return {
    files,
    uploading,
    setUploading,
    uploadError,
    handleFileSelect,
    handleFileDrop,
    removeFile,
    clearFiles,
    cleanup,
  };
};
