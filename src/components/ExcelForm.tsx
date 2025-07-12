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

  const onSubmit: SubmitHandler<MultipleHomePricePrediction> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ExcelField setValue={setValue} errors={errors} />
    </form>
  );
};

export default ExcelForm;
