import './styles.css'
import useStyles from './styles';
import {
  TextField,
  MenuItem,
  Button,
  Typography,
} from '@material-ui/core';
import { useForm } from "react-hook-form";





function CadastroSegundoPasso({ nextPage, previousPage, setPayload }) {
  const classes = useStyles();
  const { register, getValues, handleSubmit } = useForm();

  const categorias = [
    {
      id: 1,
      label: 'Diversos'
    },
    {
      id: 2,
      label: 'Lanches',
    },
    {
      id: 3,
      label: 'Carnes',
    },
    {
      id: 4,
      label: 'Massas',
    },
    {
      id: 5,
      label: 'Pizzas',
    },
    {
      id: 6,
      label: 'Japonesa',
    },
    {
      id: 7,
      label: 'Chinesa',
    },
    {
      id: 8,
      label: 'Mexicano',
    },
    {
      id: 9,
      label: 'Brasileira',
    },
    {
      id: 10,
      label: 'Italiana',
    },
    {
      id: 11,
      label: 'Árabe',
    },
  ];


  const onSubmit = () => {
    setPayload((currentPayload) => ({ ...currentPayload, ...getValues() }));
    nextPage();
  }

  return (
    <div className={classes.root}>
      <div className={classes.cardCadastro}>
        <form className={classes.formsCadastro} onSubmit={handleSubmit(onSubmit)}>
          <Typography className='credentialsStyle'>Nome do restaurante</Typography>
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
            {...register('idCategoria', { required: true })}
          >
            {categorias.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.id}>
                {categoria.label}
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
            {...register('descricao', { maxLength: 100 })}
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
