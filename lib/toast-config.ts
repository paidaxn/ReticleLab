import toast from 'react-hot-toast'

export const toastConfig = {
  success: {
    style: {
      background: '#10B981',
      color: '#fff',
      fontWeight: 'bold',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#10B981',
    },
    duration: 3000,
  },
  error: {
    style: {
      background: '#EF4444',
      color: '#fff',
      fontWeight: 'bold',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#EF4444',
    },
    duration: 4000,
  },
}

export const showSuccess = (message: string) => {
  toast.success(message, toastConfig.success)
}

export const showError = (message: string) => {
  toast.error(message, toastConfig.error)
}