import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const globalToast = {
  success: (msg) => {
    return toast.success(msg);
  },
  error: (msg) => {
    return toast.error(msg);
  },
};
