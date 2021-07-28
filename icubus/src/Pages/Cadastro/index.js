import React from 'react'
import useStyles from './styles';
import CadastroPrimeiroPasso from '../../Components/CadastroPrimeiroPasso'
import CadastroSegundoPasso from '../../Components/CadastroSegundoPasso'
import CadastroTerceiroPasso from '../../Components/CadastroTerceiroPasso'
import { Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import { useState } from 'react'

function Cadastro() {
	const classes = useStyles();

	const [etapaAtual, setEtapaAtual] = useState(0)

	const formularios = [
		<CadastroPrimeiroPasso onSubmit={nextPage} />,
		<CadastroSegundoPasso onSubmit={nextPage} />,
		<CadastroTerceiroPasso onSubmit={nextPage} />,
	]

	function nextPage() {
		setEtapaAtual(etapaAtual + 1)
	}

	return (
		<div className={classes.containerCadastro}>
			<div className={classes.formsCadastro}>
				<div className={classes.cardStepper}>
					<Typography className={classes.cadastroTitle}>Cadastro</Typography>
					<Stepper className={classes.stepper} activeStep={etapaAtual}>
						<Step> <StepLabel>   </StepLabel> </Step>
						<Step> <StepLabel>  </StepLabel> </Step>
						<Step> <StepLabel>  </StepLabel> </Step>
					</Stepper>
				</div>
				{formularios[etapaAtual]}
			</div>
		</div>
	)
}

export default Cadastro
