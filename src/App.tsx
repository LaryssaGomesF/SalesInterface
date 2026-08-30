
import {  Routes, Route } from "react-router";
import { GlobalStyle } from "./GlobalStyles";
import { Home } from "./pages/Home";

function App() {


  return (
  <>  
  <GlobalStyle />
     <Routes>
        <Route path="/" element={<Home />} />
      </Routes></>
  )
}

export default App
