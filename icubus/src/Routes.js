import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import AuthProvider from './Contexts/AuthContext';

import Produtos from './Pages/Produtos';

function Routes() {
  return (
    <AuthProvider>
      <Router>
          <Switch>
              <Route path="/produtos" exact component={Produtos} />
          </Switch>
      </Router>
    </AuthProvider>
  )
}

export default Routes;

