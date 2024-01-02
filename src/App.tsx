import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { Router } from '@/router'
import { store } from '@/services/store'

import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router />
    </Provider>
  )
}
