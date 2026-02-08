import CssBaseline from '@mui/material/CssBaseline'
import GlobalStGlobyles from '@mui/material/GlobalStyles'
import { Experimental_CssVarsProvider as CssVarProvider } from '@mui/material/styles'
import { ConfirmProvider } from 'material-ui-confirm'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import theme from '~/theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { store } from '~/redux/store'
import { BrowserRouter } from 'react-router-dom'

// Cấu hình Redux-Persist
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

// Kỹ thuật Inject Store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component như file authorizeAxios hiện tại
import { injectStore } from '~/utils/authorizeAxios'
injectStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssVarProvider theme={theme}>
          <ConfirmProvider defaultOptions={{ allowClose: false }}>
            <GlobalStGlobyles styles={{ a: { textDecoration: 'none' } }}/>
            <CssBaseline />
            <App />
            <ToastContainer position="bottom-left" theme="colored"/>
          </ConfirmProvider>
        </CssVarProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
