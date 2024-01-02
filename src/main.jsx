import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import ProjectManagementContextProvider from './store/project-management-context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectManagementContextProvider>
      <App />
    </ProjectManagementContextProvider>
  </React.StrictMode>,
)
