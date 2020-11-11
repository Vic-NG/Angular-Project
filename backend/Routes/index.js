const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');


router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.send({message:'Informação importante! Usuários não autorizados não deveriam recebe-la'});
});

router.post('/', (req, res) => {
    return res.send({message:'Tudo ok com o endpoint POST index'});
});


module.exports = router;