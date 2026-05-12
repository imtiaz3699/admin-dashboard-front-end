import { useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import { useDropzone } from "react-dropzone";

const MAX_FILES = 5;

type FileWithPreview = File & {
  preview: string;
};

type Props = {
  files: FileWithPreview[];
  setFiles: (files: FileWithPreview[]) => void;
};

const DropzoneComponent: React.FC<Props> = ({ files, setFiles }) => {

  const onDrop = (acceptedFiles: File[]) => {

    const newFiles: FileWithPreview[] = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const combined = [...files, ...newFiles].slice(0, MAX_FILES);

    setFiles(combined);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
    disabled: files.length >= MAX_FILES,
  });

  // cleanup blob URLs
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const removeImage = (index: number) => {

    const updated = [...files];

    const removed = updated[index];

    if (removed?.preview) {
      URL.revokeObjectURL(removed.preview);
    }

    updated.splice(index, 1);

    setFiles(updated);
  };

  return (
    <ComponentCard title="Dropzone">
      <div className="flex gap-6">

        {/* LEFT SIDE - PREVIEW */}
        <div className="w-1/2 grid grid-cols-2 gap-3">

          {files.map((file, index) => (
            <div key={index} className="relative">

              <img
                src={file.preview}
                alt="upload"
                className="w-full h-28 object-cover rounded-lg border"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                X
              </button>

            </div>
          ))}

        </div>

        {/* RIGHT SIDE - DROPZONE */}
        <div className="w-1/2">

          <div
            {...getRootProps()}
            className={`border border-dashed rounded-xl p-7 lg:p-10 cursor-pointer transition
              ${isDragActive
                ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
              }
              ${files.length >= MAX_FILES
                ? "opacity-50 cursor-not-allowed"
                : ""
              }
            `}
          >

            <input {...getInputProps()} />

            <div className="text-center">

              <h4 className="mb-3 font-semibold text-gray-800 dark:text-white">
                {files.length >= MAX_FILES
                  ? "Max 5 images reached"
                  : isDragActive
                    ? "Drop Files Here"
                    : "Drag & Drop Files Here"}
              </h4>

              <p className="text-sm text-gray-500 mb-4">
                Upload up to {MAX_FILES} images
              </p>

              <span className="underline text-brand-500 font-medium">
                Browse File
              </span>

            </div>

          </div>

        </div>

      </div>
    </ComponentCard>
  );
};

export default DropzoneComponent;