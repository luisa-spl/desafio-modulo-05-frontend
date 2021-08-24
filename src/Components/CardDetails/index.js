
import './style.css'


function CardCart(props) {

	return (
		<div className='containerProductCart' onClick={props.onClick}>
			<img src={props.imagem} alt="imagem-do-produto" />
			<div>
				<h3>{props.nome}</h3>
				<p>{props.quantidade}</p>
				<p className='valueBox'> R$ {props.precoTotal / 100}</p>
			</div>
		</div>
	)
}

export default CardCart
