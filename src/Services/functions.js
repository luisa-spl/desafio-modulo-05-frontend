export async function getProducts(token){
    try {
        const resposta = await fetch('https://icubus.herokuapp.com/produtos', {
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            }
        });
    
        const  dados = await resposta.json();
        console.log(dados, "/produtos, method: GET")
        return { dados, erro: !resposta.ok }
    } 
    catch(error) {
        return error.message;
    }
};

export async function getSingleProduct({id, token}){
    try {
        const resposta = await fetch(`https://icubus.herokuapp.com/produtos/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            }
        });
    
        const  dados = await resposta.json();
        console.log(dados, 'singleProduct');
        return {dados, erro: !resposta.ok};
    } 
    catch(error) {
        return error.message;
    }


}

export async function editProduct({produtoFormatado, id, token}){
    try{
        const resposta = await fetch(` https://icubus.herokuapp.com/produtos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(produtoFormatado),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const dados = await resposta.json();

        return {dados, erro: !resposta.ok};
    }
    catch(error) {
        return error.message;
    }
}

export async function activateProduct({id, token}){
    try {
        const resposta = await fetch(` https://icubus.herokuapp.com/produtos/${id}/ativar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const dados = await resposta.json();

        return {dados, erro: !resposta.ok};

    } catch(error) {
        
        return error.message;
    }
}

export async function disableProduct({id, token}){
    try {
        const resposta = await fetch(` https://icubus.herokuapp.com/produtos/${id}/desativar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const dados = await resposta.json();

        return {dados, erro: !resposta.ok};

    } catch(error) {
        
        return error.message;
    }
}