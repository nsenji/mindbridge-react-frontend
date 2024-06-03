import { createBrowserRouter } from 'react-router-dom'
import Root from './Components/Root'
import History from './Pages/History/History'
import Appointments from './Pages/Appointments/Appointments'
import AppointmentSchedule from './Components/AppointmentSchedule/AppointmentSchedule'
import UpcomingApp from './Components/UpcomingAppointments/UpcomingApp'
import Earnings from './Pages/Earnings/Earnings'
import Signup from './Pages/Authentication/Signup'
import Login from './Pages/Authentication/Login'
import MeetingRoom from './routes/Meeting'
import { Navigate } from 'react-router-dom'
import Profile from './Components/profile/profile'
import DashBoard from './routes/DashBoard'
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
        path: '/dashboard',
        element: <DashBoard />,
      },
      {
        path: '/schedule',
        element: <AppointmentSchedule />,
        
      },
      
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