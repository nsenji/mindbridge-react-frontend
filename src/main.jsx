import React from 'react'
import ReactDOM from 'react-dom/client'
// import { AuthProvider } from './Services/authprovider'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './css/tailwind.css'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>

  </BrowserRouter>
)
