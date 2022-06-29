import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";

function App() {
  return (
    <AuthWrapper>
    <Router>
    
    <Routes>
    <Route exact path='/' element={<PrivateRoute/>}>
    <Route exact path='/' element={<Dashboard/>}/>
    </Route>
    <Route path="/login" element={<Login />}>
    </Route>
    <Route path="*" element={<Error/>}>
    </Route>
    </Routes>
    
      
      
      </Router>
      </AuthWrapper>
  );
}

export default App;
