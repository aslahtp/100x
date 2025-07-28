import {BrowserRouter,Routes,Route} from 'react-router'
import Home from './components/home'
import Signup from './components/signup'
import Signin from './components/signin'
import DashboardAdmin from './components/dashboardAdmin'
import DashboardUser from './components/dashboardUser'
import CreateQuiz from './components/createquiz'
import ViewEditQuiz from './components/vieweditquiz'
import PublishQuiz from './components/publishquiz'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        {localStorage.getItem('isAdmin') === 'true' && <Route path='/dashboard' element={<DashboardAdmin/>}/>}
        {localStorage.getItem('isAdmin') === 'false' && <Route path='/dashboard' element={<DashboardUser/>}/>}
        <Route path='/createquiz' element={<CreateQuiz/>}/>
        <Route path='/quiz/:id' element={<ViewEditQuiz/>}/>
        <Route path='/publishquiz/:id' element={<PublishQuiz/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
