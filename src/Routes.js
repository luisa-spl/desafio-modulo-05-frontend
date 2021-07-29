import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import AuthProvider from './Contexts/AuthContext';

import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import Produtos from './Pages/Produtos';

function Routes() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/cadastro" exact component={Cadastro} />
          <Route path="/produtos" exact component={Produtos} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default Routes;

