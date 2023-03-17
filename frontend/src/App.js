import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/navbar/Navbar";


function App() {
  return (
    <BrowserRouter>
      <Header/>
    </BrowserRouter>
  );
}

export default App;
