import { useRef, useState } from "react";
import type { FieldErrors, UseFormSetValue } from "react-hook-form";
import { IoCloudUpload } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";
import type { MultipleHomePricePrediction } from "../schemas/predictionSchema";
import { ALLOWED_MIME_TYPES } from "../utils/constants";

interface ExcelFieldProps {
  setValue: UseFormSetValue<MultipleHomePricePrediction>;
  errors: FieldErrors<MultipleHomePricePrediction>;
}

const ExcelField = ({ setValue, errors }: ExcelFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;

      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        setSelectedFileName(null);
        setValue("excelFile", file, { shouldValidate: true });
        return;
      }

      setSelectedFileName(fileName);
      setValue("excelFile", file, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };
  return (
    <div
      className="p-4 shadow-md rounded-md cursor-pointer sm:p-8 transition-transform duration-300 ease-in-out hover:scale-[1.01]"
      onClick={handleClick}
    >
      <div className="text-center px-6 py-6 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center gap-2">
        <IoCloudUpload className="text-gray-500 text-3xl" />
        <p className="text-steel-gray font-semibold text-[15px]">
          Arrastra tu archivo Excel aquí
        </p>
        <p className="text-gray-500 text-sm">
          o haz click para seleccionar un archivo
        </p>

        <div className="my-1 text-sm px-5 py-3 bg-gray-500 text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-steel-gray-strong min-[420px]:my-2 min-[420px]:px-3">
          <div className="text-center flex justify-center items-center gap-2">
            <MdFileUpload className="text-lg shrink-0" />
            <p className="hidden min-[420px]:block">
              {selectedFileName ? "Cambia archivo" : "Seleccionar un archivo"}
            </p>
          </div>
        </div>

        {selectedFileName && !errors.excelFile && (
          <p className="text-green-700 text-sm font-medium">
            Archivo seleccionado: {selectedFileName}
          </p>
        )}

        {errors.excelFile && (
          <p className="text-red-500 text-sm font-medium">
            {errors.excelFile.message}
          </p>
        )}

        <p className="text-gray-400 text-[13px]">
          Formatos admitidos: .xlsx, .xls
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xls,.xlsx"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ExcelField;
