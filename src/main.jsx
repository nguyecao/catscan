import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import store from './redux.js/store.js'
import InsertPhoto from './components/insertPhoto.jsx'
import Test from './components/test/test.jsx'
import About from './components/about.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <App/>,
    children: [
      // { index: true, element: <Test/> },
      { path: 'insert-photo', element: <InsertPhoto/> },
      { path: 'about', element: <About/> },
      { index: true, element: <About/> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <script src="https://unpkg.com/ml5@1.2.1/dist/ml5.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet"/>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  
  </React.StrictMode>,
)
