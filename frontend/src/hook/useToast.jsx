import { toast, Bounce } from "react-toastify";

const useToast = (msg, status = "success") => {
  if (status === "success") {
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  } else if (status === "error") {
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  } else if (status === "info") {
    toast.info(msg, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
      transition: Bounce,
    });
  }
};

export default useToast;
