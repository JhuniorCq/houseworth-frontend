export type ToastProps = {
  position?:
    | "top-right"
    | "top-left"
    | "bottom-left"
    | "bottom-right"
    | "center"
    | "center-left"
    | "center-right";
  timer?: number;
  icon: "error" | "info" | "question" | "success" | "warning";
  title: string;
};
