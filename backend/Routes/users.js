const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const Users = require('../model/Users');
var passwordValidator = require('password-validator');
var schema = new passwordValidator();


//FUNÇÕES AUXILIARES
    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(14)                                   // Maximum length 100
    .has().uppercase(1)                             // Must have uppercase letters
    .has().lowercase(1)                             // Must have lowercase letters
    .has().digits(2)                                
    .has().symbols(1)                               // Must have 1 symbol    
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

const createUserToken = (userId) => {
    return jwt.sign( {id: userId}, config.jwt_pass, {expiresIn: config.expires_in} );
}

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    } catch (err) {
        return res.status(500).send({ message: 'Erro na consulta de usuários!'});
    }
});

router.post('/create', async (req, res) => {
    const { email, password, name } = req.body;

    if(!email || !password || !name) return res.status(400).send({ message: 'Dados insuficientes !'});

    try {
        if(await Users.findOne({email})) return res.status(400).send({ message: "Usuário já registrado !" });

        if(schema.validate(password) === false) return res.status(406).send({ message: "A senha deve conter de 8 a 14 caracteres, contendo números, letras maiúsculas, letras minúsculas e ao menos um caracter especial." });
        
        const user = await Users.create(req.body);

        user.password = undefined;
        return res.status(201).send({user, token: createUserToken(user.id)});

    } catch (err) {
        return res.status(500).send({message:'Erro ao buscar usuário!'});
    }
});

router.post('/auth' , async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).send({ message: 'Dados insuficientes !'});

   try {
       const user = await Users.findOne({email}).select('+password');
       if (!user) return res.status(400).send({message: "Usuário não registrado!" });

       const pass_ok = await bcrypt.compare(password, user.password);

       if(!pass_ok) return res.status(401).send({message: "Erro ao autenticar usuário!"});

       user.password = undefined;
       return res.status(200).send({user, token: createUserToken(user.id)});
       
       
    } catch (err) {
        return res.status(500).send({message:'Erro ao buscar usuário!'});
    }
}); 


module.exports = router;