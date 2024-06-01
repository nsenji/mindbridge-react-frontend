import { createBrowserRouter } from 'react-router-dom'
import Root from './Components/Root'
import History from './Pages/History/History'
import Appointments from './Pages/Appointments/Appointments'
import AppointmentSchedule from './Components/AppointmentSchedule/AppointmentSchedule'
import UpcomingApp from './Components/UpcomingAppointments/UpcomingApp'
import DashBoard from './Pages/DashBoard/DashBoard'
import Earnings from './Pages/Earnings/Earnings'
import Signup from './Pages/Authentication/Signup'
import Login from './Pages/Authentication/Login'
import MeetingRoom from './Pages/Meeting/Meeting'
import { Navigate } from 'react-router-dom'
import Profile from './Components/profile/profile'

const Router = (isAuthenticated) => [
  {
    path: '/',
    element: isAuthenticated ? <Root /> : <Navigate to={'/login'} />,
    children: [
      {
        index: true,
        element: <DashBoard />
      },
      {
        index: true,
        path: '/dashboard',
        element: <DashBoard />,
      },
      {
        path: '/schedule',
        element: <AppointmentSchedule />,
        
      },
      // {
      //   path: '/appointments',
      //   element: <Appointments />,
      //   children: [
      //     {
      //       index: true,
      //       path: '/appointments/chosen',
      //       element: <ChosenAppointments />
      //     },
      //     {
      //       path: '/appointments/selected',
      //       element: <UpcomingApp />
      //     }
      //   ]
      // },
      {
        path: '/history',
        element: <History />
      },
      {
        path: '/earnings',
        element: <Earnings />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/meeting-room',
        element: <MeetingRoom />
      }
    ]
  },

  {
    path: '/signup',
    element: <Signup />
  },

  {
    path: '/login',
    element: <Login />
  }
]

export default Router