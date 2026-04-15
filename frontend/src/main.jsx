import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider 
      theme={{ 
        token: { 
          fontFamily: '"Inter", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif',
          colorPrimary: '#2b2b2b',
        } 
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
