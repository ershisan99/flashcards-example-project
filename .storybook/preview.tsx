import type { Preview } from '@storybook/react'
import '@fontsource/roboto/400.css'
import '../src/styles/index.scss'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'
import { themes } from '@storybook/theming'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    reactRouter: reactRouterParameters({
      routing: {
        handle: 'Nav',
        path: '*',
      },
    }),
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000',
        },
      ],
    },
  },
}
export const decorators = [withRouter, withToasts]
export default preview

function withToasts(Story: any) {
  return (
    <>
      <Story />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}
