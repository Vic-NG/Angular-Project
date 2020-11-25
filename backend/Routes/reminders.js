const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const Reminders = require('../model/Reminders');

/* const createUserToken = (userId) => {
    return jwt.sign( {id: userId}, config.jwt_pass, {expiresIn: config.expires_in} );
}
 */
router.get('/', auth,  async (req, res) => {
    try {
        const reminders = await Reminders.find({});
        return res.send(reminders);
    } catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de lembretes.'});
    }
});

router.post('/new', auth, async (req, res) => {
    
    const { location, hours } = req.body;

    if( !location, !hours ) { return res.status(400).send({ message: 'Dados insuficientes !' }); }

    try {

        const reminders = await Reminders.create(req.body);

        return res.status(201).send({reminders, message:'Lembrete criado com sucesso!'});
        
    } catch (error) {
        return res.status(500).send({message:'Erro ao cadastrar lembrete.'});
    }

});

module.exports = router;