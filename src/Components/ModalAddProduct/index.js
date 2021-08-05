import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import formatCurrency from "format-currency"
import { AuthContext } from '../../Contexts/AuthContext';
import useProductsContext from '../../Hooks/useContextProducts';
import UploadIcon from '../../Assets/upload-icon.svg';
import useStyles from './style';
import './style.css';
import { registerProduct, getProducts } from '../../Services/functions';

import Alert from '@material-ui/lab/Alert';
import ActionButtonSubmit from '../ActionButtonSubmit';
import { 
        Dialog,
        DialogActions,
        DialogContent,
        DialogTitle,
        FormControlLabel,
        InputLabel,
        Switch,
        TextField,
        CircularProgress
    } from '@material-ui/core';


export default function ModalAddProduct({open, setOpen}) {
    const classes = useStyles(); 
    const { token } = useContext(AuthContext);
    const { setProdutos } = useProductsContext();
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const [ carregando, setCarregando ] = useState(false);
    const [ erro, setErro ] = useState('');
    const [ baseImage, setBaseImage ] = useState("");
    const [ file, setFile ] = useState('');
    const [ active, setActive ] = useState({
            ativo: true,
            permite_observacoes: false,
    });

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

    const valor = register('valor', { required: true });

    const handleChange= (event) => {
            setActive({ ...active, [event.target.name]: event.target.checked });
    };

    const handleClose = () => {
            setOpen(false);
    };


    const uploadImage = async (e) => {
        const file = e.target.files[0];
        setFile(file.name);

        const base64 = await convertBase64(file);
        const formatImg = base64.replace("data:", "").replace(/^.+,/, "")
        
        setBaseImage(formatImg);
       
      };
    
      const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    }

    const imagemProduto = {
        nome : file,
        imagem: baseImage
    }

   

    async function onSubmit(data) {
        setCarregando(true);
        setErro('');
       
        
        const getCents = (value) => parseInt(value.toString().replace(/\D/g, ""));
      
        const produtoFormatado = {
                nome: data.name,
                descricao: data.description,
                preco: getCents(data.valor),
                ativo: active.ativo,
                permiteObservacoes: active.permite_observacoes,
                nomeImagem: file,
                imagem: baseImage
        };
        
        console.log(produtoFormatado, baseImage)
        const { erro } = await registerProduct({produtoFormatado, token})
                
                if(erro) {
                    setErro(erro);
                    setCarregando(false);
                    setOpen(false);
                    return;
                }; 

        const { lista, error } = await getProducts(token);
        
        if(error){
            return setErro(error)
        }
       
        setProdutos(lista)
        setCarregando(false);
        setOpen(false);
    };


    return (
        <div className={classes.dialog}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='xl'>
                <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Novo Produto</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                        <form  noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                            <div className={classes.formDiv}>
                                <InputLabel htmlFor="name">Nome</InputLabel>
                                <TextField 
                                    size='small' 
                                    type='text'
                                    variant='outlined'
                                    id='name' 
                                    {...register('name', { required:true, maxLength: 50 })} 
                                />    
                                    {errors.name?.type === 'required' && <Alert severity="error">{'O campo nome é obrigatório'}</Alert>}
                                    {errors.name?.type === 'maxLength' && <Alert severity="error">{'O nome deve ter até 50 caracteres'}</Alert>}

                                <InputLabel htmlFor="description">Descrição</InputLabel>
                                <TextField  
                                    size='small' 
                                    type='text'
                                    variant='outlined'
                                    id='description'  
                                    helperText="Max: 100 caracteres"
                                    {...register('description', { maxLength: 100 })} 
                                />                 
                                    {errors.description?.type === 'maxLength' && <Alert severity="error">{'A descrição deve ter até 100 caracteres'}</Alert>} 

                                <InputLabel htmlFor="value">Valor</InputLabel>    
                                <TextField
                                    variant="outlined"
                                    id="valor"
                                    autoComplete="off"
                                    error={Boolean(errors.valor)}
                                    helperText={errors.valor ? "Campo Obrigatório" : false}
                                    {...valor}
                                    onChange={(e) => {
                                        valor.onChange(setCurrencyMask(e))
                                    }}
                                />
                                    {errors.valor?.type === 'required' && <Alert severity="error">{'O campo preço é obrigatório'}</Alert>}

                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={active.ativo}
                                        onChange={handleChange}
                                        name="ativo"
                                        color="primary"
                                    />
                                    }
                                    label="Ativar produto"
                                />

                                <FormControlLabel
                                    control={
                                    <Switch
                                        checked={active.permite_observacoes}
                                        onChange={handleChange}
                                        name="permite_observacoes"
                                        color="primary"
                                    />
                                    }
                                    label="Permitir observações"
                                />
                            </div>

                            <div className={classes.uploadDiv}>
                                <div className={classes.profilePicture}>
                                    <input 
                                        className='input-img'
                                        id='img' 
                                        type='file' 
                                        accept='.jpg,.jpeg,.png'
                                        onChange={(e) => {uploadImage(e)}}
                                       
                                    />
                                    <img className='imgProduct' src='https://i.ibb.co/yRt6Y55/addFoto.jpg' alt='imagem'/>
                                </div>
                                
                                <div className='flex-row'>
                                    <DialogActions>
                                    <button 
                                        className='transparent-btn font-montserrat font-color-orange font-bold' 
                                        onClick={handleClose} 
                                    >
                                            Cancelar
                                    </button>

                                    </DialogActions>
                                    <ActionButtonSubmit /> 

                                    {carregando && <CircularProgress />}
                                    {erro && <Alert severity="error">{erro}</Alert>}
                                </div>
                            </div>
                        </form>
                </DialogContent>  
            </Dialog>
        </div>
  );
}