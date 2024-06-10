
import {useEffect} from 'react'
import {BrowserRouter as Router,Routes, Route, Link} from 'react-router-dom'
import AppLayout from './AppLayout';
function App() {
  useEffect(() => {
    document.title = "Book Store";
  }, []);
  
  
  return (
    <Router>
      <AppLayout />    
    </Router>
  );
}

export default App;
