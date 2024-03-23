import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/other-style/index.scss'
import App from './App'

// REDUX
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./reducers"
import { getPosts } from './actions/post.actions'
import { getUser } from './actions/user.actions'

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
