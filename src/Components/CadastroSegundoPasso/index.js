import './styles.css'
import useStyles from './styles';
import { useState } from 'react'
import {
  TextField,
  MenuItem,
  Button,
  Typography,
} from '@material-ui/core';
import { useForm } from "react-hook-form";





function CadastroSegundoPasso({ onSubmit, previousPage }) {
  const classes = useStyles();
  const { register } = useForm();

  const currencies = [
    {
      value: 'diversos',
      label: 'Diversos'
    },
    {
      value: 'lanches',
      label: 'Lanches',
    },
    {
      value: 'carnes',
      label: 'Carnes',
    },
    {
      value: 'Massas',
      label: 'massas',
    },
  ];



  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit()
  }

  return (
    <div className={classes.root}>
      <div className={classes.cardCadastro}>
        <form className={classes.formsCadastro} onSubmit={handleSubmit}>
          <Typography className='credentialsStyle' >Nome do restaurante</Typography>
          <TextField
            id="nome-restaurante"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            {...register('nomeRestaurante', { required: true })}
          />

          <Typography className='credentialsStyle' >Categoria do restaurante</Typography>
          <TextField
            id="categoria-restaurante"
            select
            variant="outlined"
            {...register('categoriaRestaurante', { required: true })}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Typography className='credentialsStyle'>Descrição</Typography>
          <TextField
            id="outlined-margin-normal"
            className={classes.textField}
            helperText="Máx. 100 caracteres"
            margin="normal"
            variant="outlined"
            {...register('categoriaRestaurante', { maxLength: 100 })}
          />

          <div className={classes.containerButtonCadastro}>
            <Button color="secondary" onClick={previousPage}>
              Anterior
            </Button>
            <Button className={classes.buttonCadastro} variant="contained" type="submit">
              Próximo
            </Button>
          </div>
        </form>

      </div>
    </div >
  )
}

export default CadastroSegundoPasso
