import { createBrowserRouter } from 'react-router-dom'
import Root from './Components/Root'

const Router = createBrowserRouter([
  {
    path:'/',
    element: <Root/>,
    children: [
    {
    index: true,
    element:null
    },
    {
      path:'/dashboard',
      element:null,
    },
    {
      path:'/appointments',
      element:null,
    },
    {
      path:'/my-schedule',
      element:null,
    },
    {
      path:'/history',
      element:null,
    },
    {
      path:'/earnings',
      element:null,
    }
  ]
  }
  
])

export default Router