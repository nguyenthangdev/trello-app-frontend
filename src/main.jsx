import CssBaseline from '@mui/material/CssBaseline'
// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import theme from '~/theme'
import { Experimental_CssVarsProvider as CssVarProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarProvider theme={theme}>
    <ConfirmProvider defaultOptions={{
      allowClose: false
    }}>
      <CssBaseline />
      <App />
      <ToastContainer position="bottom-left" theme="colored"/>
    </ConfirmProvider>
  </CssVarProvider>
  // </React.StrictMode>
)
