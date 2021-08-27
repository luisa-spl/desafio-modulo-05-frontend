import React, { useContext } from 'react'
import { useStyles } from './styles';
import "./styles.css"
import CadastroPrimeiroPasso from '../../Components/CadastroPrimeiroPasso'
import CadastroSegundoPasso from '../../Components/CadastroSegundoPasso'
import CadastroTerceiroPasso from '../../Components/CadastroTerceiroPasso'
import { Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { CadastroContext } from '../../Contexts/CadastroContext'



function Cadastro() {
	const classes = useStyles();
	const { payload, setPayload } = useContext(CadastroContext)
	const { unregister } = useForm();
	const [error, setError] = useState(false)
	const [etapaAtual, setEtapaAtual] = useState(0)
	const history = useHistory()


	const formularios = [
		<CadastroPrimeiroPasso nextPage={nextPage} setPayload={setPayload} payload={payload} />,
		<CadastroSegundoPasso nextPage={nextPage} previousPage={previousPage} setPayload={setPayload} payload={payload} />,
		<CadastroTerceiroPasso salvarCadastro={salvarCadastro} previousPage={previousPage} setPayload={setPayload} payload={payload} />,
	]

	function nextPage() {
		setEtapaAtual(etapaAtual + 1)
	}

	function previousPage() {
		setEtapaAtual(etapaAtual - 1)
		unregister("email")
	}


	async function salvarCadastro(data) {
		setError(false);

		if (data.senha !== data.senhaRepetida) {
			return
		}

		const getCents = (value) => parseInt(value.toString().replace(/\D/g, ""));


		fetch('https://icubus.herokuapp.com/usuarios', {
			method: "POST",
			body: JSON.stringify({
				"nome": data.nome,
				"email": data.email,
				"senha": data.senha,
				"restaurante": {
					"nome": data.nomeRestaurante,
					"descricao": data.descricao,
					"idCategoria": data.idCategoria,
					"taxaEntrega": getCents(data.taxaEntrega),
					"tempoEntregaEmMinutos": parseInt(data.tempoEntregaEmMinutos),
					"valorMinimoPedido": getCents(data.valorMinimoPedido),
				}
			}),
			headers: {
				'Content-type': 'application/json'
			}
		}).then(async (res) => {
			const data = await res.json()

			if (res.status > 299) {
				setError(data)
			} else {
				history.push('/', {
					registerSuccess: true
				})
			}
		});
	}

	return (
		<div className={classes.containerCadastro}>
			<div className={classes.formsCadastro}>

				{Boolean(error) && (
					<Alert severity="error">
						{error}
					</Alert>
				)}

				<div className={classes.cardStepper}>
					<Typography className={classes.cadastroTitle}>Cadastro</Typography>
					<div>
						<Stepper activeStep={etapaAtual} >
							{formularios.map(() => <Step ><StepLabel /></Step>)}
						</Stepper>
					</div>
				</div>
				{formularios[etapaAtual]}
				<span className='linkCadastro'>Já tem uma conta? <a href="/" >Login </a> </span>
			</div>

		</div>
	)
}

export default Cadastro
