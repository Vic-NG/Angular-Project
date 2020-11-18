const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const Users = require('../model/Users');


//FUNÇÕES AUXILIARES

var strengthPassword = (password) => {
    var strength = 0;

    if((password.length  >= 4) && (password.length <= 7)) {
        strength += 10;
    } else if ((password.lenght > 7)) {
        strength += 25;
    }

    if((password.length >= 5) && (password.match(/[a-z]+/))) {
        strength += 10;
    }

    if((password.length >= 6) && (password.match(/[A-Z]+/))) {
        strength += 20;
    }

    if((password.length >= 7) && (password.match(/[#$%&*;@]/))) {
        strength += 25;
    }
    
    return true;
}

/* const strenghtShow = (strenght) => {
    
} */

const createUserToken = (userId) => {
    return jwt.sign( {id: userId}, config.jwt_pass, {expiresIn: config.expires_in} );
}

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    } catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de usuários!'});
    }
});

router.post('/create', async (req, res) => {
    const { email, password, name } = req.body;

    if(!email || !password || !name) return res.status(400).send({ error: 'Dados insuficientes !'});

    try {
        if(await Users.findOne({email})) return res.status(400).send({ error: "Usuário já registrado !" });

        if(await password.value != strengthPassword(password)) return res.status(406).send({ error: "A senha deve conter 8 caracteres, uma letra minuscula, uma letra maiscula e ao menos um caracter especial." });

        const user = await Users.create(req.body);

        user.password = undefined;
        return res.status(201).send({user, token: createUserToken(user.id)});

    } catch (err) {
        return res.status(500).send({error:'Erro ao buscar usuário!'});
    }
});

router.post('/auth' , async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).send({ error: 'Dados insuficientes !'});

   try {
       const user = await Users.findOne({email}).select('+password');
       if (!user) return res.status(400).send({error: "Usuário não registrado!" });

       const pass_ok = await bcrypt.compare(password, user.password);

       if(!pass_ok) return res.status(401).send({error: "Erro ao autenticar usuário!"});

       user.password = undefined;
       return res.status(200).send({user, token: createUserToken(user.id)});
       
       
    } catch (err) {
        return res.status(500).send({error:'Erro ao buscar usuário!'});
    }
}); 


module.exports = router;