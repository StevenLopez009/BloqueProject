import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import "./App.css"
import MarketComponent from './components/Market/Market';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/market" element={<MarketComponent/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
