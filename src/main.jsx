import CssBaseline from '@mui/material/CssBaseline'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import theme from '~/theme'
import { Experimental_CssVarsProvider as CssVarProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm'
import { Provider } from 'react-redux'
import { store } from '~/redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CssVarProvider theme={theme}>
      <ConfirmProvider defaultOptions={{ allowClose: false }}>
        <CssBaseline />
        <App />
        <ToastContainer position="bottom-left" theme="colored"/>
      </ConfirmProvider>
    </CssVarProvider>
  </Provider>
)
