import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import AuthProvider from './Contexts/AuthContext';

import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";

function Routes() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/cadastro" exact component={Cadastro} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default Routes;

