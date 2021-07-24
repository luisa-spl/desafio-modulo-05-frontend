import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import AuthProvider from './Contexts/AuthContext';

function Routes() {
  return (
    <AuthProvider>
      <Router>
          <Switch>
              <Route path="" exact component="" />
          </Switch>
      </Router>
    </AuthProvider>
  )
}

export default Routes;

