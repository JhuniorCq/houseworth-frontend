import Swal from "sweetalert2";
import type { ToastProps } from "../types/sweetAlert";

export const showToast = ({
  position = "top-right",
  timer = 3000,
  icon,
  title,
}: ToastProps) => {
  const Toast = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    icon,
    title,
  });
};
