import {Bounce, ToastOptions} from 'react-toastify';

export const ToastPosition: ToastOptions<unknown> = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  progress: undefined,
  theme: 'colored',
  transition: Bounce,
};