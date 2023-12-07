import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/common/index.js';
import Home from './pages/Home';

function App() {


  return (
    <Router>
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  </Router>
  )
}

export default App
