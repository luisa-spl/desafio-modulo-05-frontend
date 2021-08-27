import useStyles from './styles';
import './styles.css'
import {
	TextField,
	Button,
	Typography,
} from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import formatCurrency from "format-currency"
import { useEffect } from 'react'


function CadastroSegundoPasso({ previousPage, salvarCadastro, setPayload, payload }) {
	const classes = useStyles();
	const { register, getValues, handleSubmit, control, setValue, formState: { errors } } = useForm();

	const onSubmit = async () => {
		await salvarCadastro({ ...payload, ...getValues() })
	}

	const returnPage = () => {
		setPayload((currentPayload) => ({ ...currentPayload, ...getValues() }));
		previousPage();
	}

	const setCurrencyMask = (e) => {
		const value = e.target.value.toString().replace(/\D/g, "");
		const money = parseFloat(value) / 100;

		e.target.value = formatCurrency(money, {
			maxFraction: 2,
			locale: "pt-BR",
			format: "%s %v",
			symbol: "R$",
		});
		return e
	}

	const taxaEntrega = register('taxaEntrega', { required: true })
	const valorMinimoPedido = register('valorMinimoPedido', { required: true })

	const getPayload = () => {
		payload.taxaEntrega && setValue("taxaEntrega", payload.taxaEntrega)
		payload.valorMinimoPedido && setValue("valorMinimoPedido", payload.valorMinimoPedido)
		payload.tempoEntregaEmMinutos && setValue("tempoEntregaEmMinutos", payload.tempoEntregaEmMinutos)
	}



	useEffect(() => {
		getPayload()
	}, [])


	return (
		<div className={classes.root}>
			<div className={classes.cardCadastro}>
				<form className={classes.formsCadastro} onSubmit={handleSubmit(onSubmit)} >

					<Typography className='credentialsStyle'>Taxa de entrega</Typography>
					<Controller
						control={control}
						name="taxaEntrega"
						rules={{ required: true }}
						render={({ field }) => (
							<TextField
								id="input-taxa-entrega"
								type='text'
								variant="outlined"
								autoComplete="off"
								error={Boolean(errors.taxaEntrega)}
								helperText={errors.taxaEntrega ? "Campo Obrigatório" : false}
								{...field}
								onChange={(e) => {
									field.onChange(setCurrencyMask(e))
								}}
							/>
						)
						}
					/>

					<Typography className='credentialsStyle'>Tempo estimado de entrega</Typography>
					<Controller
						control={control}
						name="tempoEntregaEmMinutos"
						rules={{ required: true }}
						render={({ field }) => (
							<TextField
								id="input-tempo-entrega"
								type='text'
								variant="outlined"
								placeholder="Tempo de entrega em minutos"
								autoComplete="off"
								error={Boolean(errors.tempoEntregaEmMinutos)}
								helperText={errors.tempoEntregaEmMinutos ? "Campo Obrigatório" : false}
								{...field}
							/>
						)
						}
					/>

					<Typography className='credentialsStyle'>Valor mínimo do pedido</Typography>
					<Controller
						control={control}
						name="valorMinimoPedido"
						rules={{ required: true }}
						render={({ field }) => (
							<TextField
								variant="outlined"
								id="input-valor-minimo"
								autoComplete="off"
								error={Boolean(errors.valorMinimoPedido)}
								helperText={errors.valorMinimoPedido ? "Campo Obrigatório" : false}
								{...field}
								onChange={(e) => {
									field.onChange(setCurrencyMask(e))
								}}
							/>
						)
						}
					/>


					<div className={classes.containerButtonCadastro}>
						<Button color="secondary" onClick={returnPage}>
							Anterior
						</Button>
						<Button className={classes.buttonCadastro} variant="contained" type="submit" >
							Criar conta
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CadastroSegundoPasso
