import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Contexts/AuthContext';
import useProductsContext from '../../Hooks/useContextProducts';
import UploadIcon from '../../Assets/mini-upload-icon.svg';
import useStyles from './style';
import { disableProduct, activateProduct, editProduct, getProducts } from '../../Services/functions';
import './style.css';

import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { 
        Dialog,
        DialogActions,
        DialogContent,
        DialogTitle,
        FormControlLabel,
        InputLabel,
        InputAdornment,
        Switch,
        TextField,
        CircularProgress,
        IconButton
    } from '@material-ui/core';
import { AirlineSeatIndividualSuite } from '@material-ui/icons';



export default function ModalEditProduct({ open, setOpen, id, img }) {
    const classes = useStyles();
    const { token } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, unregister } = useForm();
    const [ carregando, setCarregando ] = useState(false);
    const { setProdutos, setAtualizaProduto, atualizaProduto } = useProductsContext();
    const [ atualiza, setAtualiza ] = useState(false);
    const [ baseImage, setBaseImage ] = useState("");
    const [ file, setFile ] = useState('');
    const [ erro, setErro ] = useState('Não foi possível atualizar');
    const [ item, setItem ] = useState([]);
    const [ active, setActive ] = useState({
        produto_ativo: Boolean(item.ativo),
        permite_observacoes: Boolean(item.permite_observacoes),
    });
    

   useEffect(() =>{
        return () => {
            unregister("name")
            unregister("description")
            unregister("value")
        }
   }, [atualizaProduto])

    const handlecloseAlert = () => {
        setErro('');
    }

    const handleClose = () => {
        setErro('')
        return setOpen(false);
    }

    useEffect(() => {
        async function listarProduto(){
           
            try {
                const resposta = await fetch(`https://icubus.herokuapp.com/produtos/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    }
                });
            
                const  dados = await resposta.json();
              
                if(resposta.status >= 400) {
                    return setErro(dados)
                }

                setActive({
                    produto_ativo: Boolean(dados.ativo),
                    permite_observacoes: Boolean(dados.permite_observacoes),
                })
        
                return setItem(dados) 
            } 
            catch(error) {
                return setErro(error.message);
            }
        }   
        listarProduto()
       
    }, [token, atualiza, atualizaProduto])

    const handleChange= (event) => {
            setActive({ ...active, [event.target.name]: event.target.checked});
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


    async function onSubmit(data) {
       
            setCarregando(true)
        

            if(item.ativo === true && active.produto_ativo !== item.ativo ) {   
                const { erro } = await disableProduct({id, token})
              
                if(erro){
                    setErro(erro);
                    setCarregando(false);
                    return 
                }
               
            }

            if(item.ativo === false && active.produto_ativo !== item.ativo) {
                
                const { erro } = await activateProduct({id, token})
            ;
                if(erro){
                    setErro(erro)
                    setCarregando(false);
                    return 
                }
            }
            
            
            let precoFormatado = 0;
            const virg = ',';

            if(data.value) {
                if(data.value.includes('.')){
                    precoFormatado = Number(data.value).toFixed(2)*100;
                } else if(data.value.includes(',')){
                    precoFormatado = Number(data.value.replace(virg, '.' )).toFixed(2)*100;
                } 
                else {
                    precoFormatado = Number(data.value);
                }
            }
             
        
            if(data.name === ""){
                setCarregando(false)
                setErro("O campo nome não pode ficar em branco")
                return
            }
            
          
            const produtoFormatado = {
                nome: data.name || item.nome,              
                descricao: data.description,
                preco: precoFormatado || item.preco,
                permiteObservacoes: active.permite_observacoes,
                nomeImagem : file,
                imagem: baseImage
            }
               
                const { erro, error } = await editProduct({produtoFormatado, id, token})
                
                if(erro) {
                    if(erro.includes('bucketid')){
                        setErro("Não foi possível atualizar a imagem")
                        setCarregando(false);
                        return
                    }
                    console.log(erro)
                    setErro(erro);
                    setCarregando(false);
                    return 
                };

                if(error){
                    setErro(error);
                    setCarregando(false);
                    return
                }
                
            
                const { lista, erros, errorGet } = await getProducts(token);
                
                if(erros){
                    setCarregando(false);
                    return setErro(erros);
                }

                if(errorGet) {
                    setErro(errorGet);
                    setCarregando(false);
                    return
                }
                
            setProdutos(lista) 
            setAtualizaProduto(true);
            setCarregando(false);
            setAtualiza(true);
            handleClose();
    };

    

    return (
        <div className={classes.dialog}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='xl'>
                
                <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Editar Produto</DialogTitle>

                <DialogContent className={classes.dialogContent}>
                        <form  noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                            <div className={classes.formDiv}>
                                <InputLabel htmlFor="name">Nome</InputLabel>
                                <TextField 
                                    size='small' 
                                    type='text'
                                    variant='outlined'
                                    id='name' 
                                    defaultValue={item.nome}
                                    {...register('name', {maxLength: 50})} 
                                />
                                {errors.name?.type === 'maxLength' && <Alert severity="error">{'O nome deve ter até 50 caracteres'}</Alert>}
                                  

                                <InputLabel htmlFor="description">Descrição</InputLabel>
                                <TextField  
                                    size='small' 
                                    variant='outlined'
                                    id='description'  
                                    defaultValue={item.descricao}
                                    helperText="Max: 100 caracteres"
                                    {...register('description', { maxLength: 100 })} 
                                />               
                                    {errors.description?.type === 'maxLength' && <Alert severity="error">{'A descrição deve ter até 100 caracteres'}</Alert>}   

                                <InputLabel htmlFor="value">Valor</InputLabel>    
                                <TextField
                                    size='small' 
                                    type='text'
                                    variant='outlined'
                                    id='value'
                                    placeholder={(item.preco/100).toFixed(2).toString()}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    }}
                                    {...register('value')}
                                />

                                <FormControlLabel
                                    control={
                                    <Switch
                                    checked={active.produto_ativo}
                                        onChange={handleChange}
                                        name="produto_ativo"
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
                                    <img src={baseImage ? `data:image/jpeg;base64,${baseImage}` : img} className='profileImage' alt="" />
                                    <label htmlFor='img' className='labelInputImg  font-montserrat'>Clique aqui para adicionar uma imagem</label>
                                    
                                    
                                </div>
                            
                                <div className='flex-row'>
                                    <button 
                                        className='transparent-btn font-montserrat font-color-orange font-bold'
                                        onClick={handleClose}
                                        >
                                        Cancelar
                                    </button>

                                    <DialogActions>
                                        <button type='submit' className='btn-orange-small font-montserrat font-color-white'>
                                            Salvar alterações
                                        </button> 
                                    </DialogActions>

                                    {carregando && <CircularProgress />}
                                    
                                </div>
                                
                            </div> 
                        </form>
                </DialogContent>  
                {erro &&
                <Alert severity="error" onClick={handlecloseAlert}>{erro} 
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handlecloseAlert}>
                    <CloseIcon fontSize="small" />
                    </IconButton>
                </Alert> 
            }
            </Dialog>
            
        </div>
  );
}