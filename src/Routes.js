import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './Contexts/AuthContext'
import AuthProvider from './Contexts/AuthContext';
import CadastroProvider from './Contexts/CadastroContext';
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import Produtos from './Pages/Produtos';
import Pedidos from './Pages/Pedidos';
import { ProductsProvider } from './Contexts/ProductsContext';

function RotasProtegidas(props) {
	const { token } = useContext(AuthContext);

	return (
		<Route render={() => (token ? props.children : <Redirect to='/' />)} />
	)
}

function Routes() {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					<Route path="/" exact component={Login} />
					<Route path="/cadastro" exact >
						<CadastroProvider>
							<Cadastro />
						</CadastroProvider>
					</Route>
					<RotasProtegidas >
						<ProductsProvider>
							<Route path='/pedidos' exact component={Pedidos} />
							<Route path="/produtos" exact component={Produtos} />
						</ProductsProvider>
					</RotasProtegidas>
				</Switch>
			</Router>
		</AuthProvider>
	)
}

export default Routes;

