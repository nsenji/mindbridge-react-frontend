import { createBrowserRouter } from 'react-router-dom'
import Root from './Components/Root'
import History from './Pages/History/History'

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
      element:<History/>
    },
    {
      path:'/earnings',
      element:null,
    }
  ]
  }
  
])

export default Router