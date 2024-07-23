import { toast } from "react-toastify";
import { ToastPosition } from "../enum";

export const showToast = (type: "success" | "error", message: string) => {
  switch (type) {
    case "success":
      toast.success(message, ToastPosition);
      break;
    case "error":
      toast.error(message, ToastPosition);
      break;
    default:
      throw new Error(`Invalid toast type: ${type}`);
  }
};
