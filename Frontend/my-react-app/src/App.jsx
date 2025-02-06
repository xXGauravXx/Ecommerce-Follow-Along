import './App.css'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import {LoginPage,SignupPage,Home,CreateProduct,MyProduct} from './Routes/Route.js';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/product" element={<CreateProduct/>}/>
        <Route path="/myproduct" element={<MyProduct/>}/>
    </Routes>
    </BrowserRouter>  
  )
}

export default App;