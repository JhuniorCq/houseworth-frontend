import { IoCloudUpload } from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";
import { useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  multipleHomePricePrediction,
  type MultipleHomePricePrediction,
} from "../schemas/predictionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ExcelField from "./ExcelField";

const ExcelForm = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MultipleHomePricePrediction>({
    resolver: zodResolver(multipleHomePricePrediction),
  });

  const onSubmit: SubmitHandler<MultipleHomePricePrediction> = (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <div
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

          <p className="my-1 text-sm px-5 py-3 bg-gray-500 text-white rounded-md transition-colors duration-300 ease-in-out hover:bg-steel-gray-strong min-[420px]:my-2 min-[420px]:px-3">
            <div className="text-center flex justify-center items-center gap-2">
              <MdFileUpload className="text-lg shrink-0" />
              <p className="hidden min-[420px]:block">
                {selectedFileName ? "Cambia archivo" : "Seleccionar un archivo"}
              </p>
            </div>
          </p>

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
      </div> */}
      <ExcelField setValue={setValue} errors={errors} />
    </form>
  );
};

export default ExcelForm;
