import { createBrowserRouter } from 'react-router-dom'
import Root from './Components/Root'
import History from './Pages/History/History'
import Appointments from './Pages/Appointments/Appointments'
import ChosenAppointments from './Components/ChosenAppointments/ChosenAppointments'
import UpcomingApp from './Components/UpcomingAppointments/UpcomingApp'
import DashBoard from './Pages/DashBoard/DashBoard'

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
      element:null,
    }
  ]
  }
  
])

export default Router