import { createContext, useState } from 'react';

export const CadastroContext = createContext();

function CadastroProvider({ children }) {
	const [payload, setPayload] = useState({});

	return (
		<CadastroContext.Provider value={{ payload, setPayload }}>
			{children}
		</CadastroContext.Provider>
	)
}

export default CadastroProvider;
