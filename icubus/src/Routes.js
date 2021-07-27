import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import AuthProvider from './Contexts/AuthContext';

import Login from "./Pages/Login";

function Routes() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default Routes;

