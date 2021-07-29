import React from 'react'
import { useStyles } from './styles';
import "./styles.css"
import CadastroPrimeiroPasso from '../../Components/CadastroPrimeiroPasso'
import CadastroSegundoPasso from '../../Components/CadastroSegundoPasso'
import CadastroTerceiroPasso from '../../Components/CadastroTerceiroPasso'
import { Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import { useState } from 'react'
import { useHistory } from 'react-router-dom';

function Cadastro() {
	const classes = useStyles();
	const [payload, setPayload] = useState({})
	const [error, setError] = useState(false)
	const [etapaAtual, setEtapaAtual] = useState(0)
	const history = useHistory()

	const formularios = [
		<CadastroPrimeiroPasso onSubmit={nextPage} setPayload={setPayload} />,
		<CadastroSegundoPasso onSubmit={nextPage} previousPage={previousPage} setPayload={setPayload} />,
		<CadastroTerceiroPasso onSubmit={nextPage} previousPage={previousPage} payload={payload} />,
	]

	function nextPage() {
		setEtapaAtual(etapaAtual + 1)
	}

	function previousPage() {
		setEtapaAtual(etapaAtual - 1)
	}


	async function onSubmit(data) {
		setError(false);

		fetch('https://icubus.herokuapp.com/cadastro', {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				'Content-type': 'application/json'
			}
		}).then(async (res) => {
			const data = await res.json()

			if (res.status > 299) {
				setError(data)
			} else {
				history.push('/')
			}
		});
	}

	return (
		<div className={classes.containerCadastro}>
			<div className={classes.formsCadastro}>
				<div className={classes.cardStepper}>
					<Typography className={classes.cadastroTitle}>Cadastro</Typography>
					<div>
						<Stepper activeStep={etapaAtual} >
							{formularios.map(() => <Step ><StepLabel /></Step>)}
						</Stepper>
					</div>
				</div>
				{formularios[etapaAtual]}
			</div>
		</div>
	)
}

export default Cadastro
