import { toast } from 'react-toastify';

const showToast = (message, toastId) => {
    toast.success(message, {
        toastId: toastId,
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
        });
}

export { showToast };