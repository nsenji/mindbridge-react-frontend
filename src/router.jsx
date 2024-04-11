import { createBrowserRouter } from 'react-router-dom'
import Root from './Components/Root'
import History from './Pages/History/History'
import Appointments from './Pages/Appointments/Appointments'
import ChosenAppointments from './Components/ChosenAppointments/ChosenAppointments'
import UpcomingApp from './Components/UpcomingAppointments/UpcomingApp'
import DashBoard from './Pages/DashBoard/DashBoard'
import Earnings from './Pages/Earnings/Earnings'
import Signup from './Pages/Authentication/Signup'
import Login from './Pages/Authentication/Login'

const Router = createBrowserRouter([
  {
    path:'/',
    element: <Root/>,
    children: [
    {
    index: true,
    element:<DashBoard/>
    },
    {
      path:'/dashboard',
      element:<DashBoard/>,
    },
    {
      path:'/appointments',
      element:<Appointments/>,
      children:[
        {
          index:true,
          path: '/appointments/chosen',
          element: <ChosenAppointments/>
        },
        {
          path: '/appointments/selected',
          element: <UpcomingApp/>
        }
      ]
    },
    {
      path:'/history',
      element:<History/>
    },
    {
      path:'/earnings',
      element:<Earnings/>,
    }
  ]},

  {
    path:'/signup',
    element:<Signup/>
  },

  {
    path: '/login',
    element: <Login/>
  }
])

export default Router