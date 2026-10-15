import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import CreatePro from "./CreatePro";
import ViewPro from './ViewPro'
import ProjectMembership from './ProjectMembership'

function App() {
  return (
    <>
      <Signup />
      <Login />
      <CreatePro />
      <ViewPro />
      <ProjectMembership />
    </>
  )
}

export default App