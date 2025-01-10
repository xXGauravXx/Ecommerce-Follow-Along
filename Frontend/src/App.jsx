//eslint-disable-next-line
import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css'
import { LoginPage } from './routes/route.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App





// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className='App'>
//       <header className='App-header'>
//         <img src={viteLogo} className='App-logo' alt="logo" />
//         <p className='text-[#000]'>
//           Edit something and save to reload.
//         </p>
//       </header>
//     </div>
//   )
// }

// export default App
