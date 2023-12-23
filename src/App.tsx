import { Provider } from 'react-redux'

import { Layout } from '@/components/ui/layout/layout.tsx'
import { Router } from '@/router.tsx'
import { store } from '@/services/store'

export function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Router />
      </Layout>
    </Provider>
  )
}
