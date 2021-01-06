const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const Reminders = require('../model/Reminders');

router.get('/', auth, async (req, res) => {
    try {
        const user_id = req.headers.userid;
        const reminders = await Reminders.find({ userId: user_id });
        return res.send(reminders); 
    } catch (err) {
        return res.status(500).send({ message: 'Erro na consulta de lembretes.' });
    }
});

router.post('/new', auth, async (req, res) => {

    const { locations, atv_name } = req.body;
    const user_id = req.headers.userid;
    if (!locations || !atv_name) { return res.status(400).send({ message: 'Dados insuficientes !' }); }

    try {
        const reminders = await Reminders.create({ ...req.body, userId: user_id });

        return res.status(201).send({ reminders, message: 'Lembrete criado com sucesso!' });

    } catch (error) {
        console.log('erro:' + error)
        return res.status(500).send({ message: 'Erro ao cadastrar lembrete.' });
    }

});

router.put('/update', auth, async (req, res) => {

    var id = req.body._id;
    const user_id = req.headers.userid;
    await Reminders.findOne({ _id: id, userId: user_id }, (err, foundObject) => {
        if (err) return res.status(500).send({ message: "Erro ao encontrar dados." });

        if (!foundObject) return res.status(404).send({ message: 'Objeto não encontrado.' });
        console.log(foundObject);
        foundObject.start = req.body.start;
        foundObject.end = req.body.end;
        foundObject.atv_name = req.body.atv_name;
        foundObject.save((err, updateObject) => {
            if (err) return res.status(500).send({ message: "Erro ao atualizar dados." });
            res.send({...updateObject,message:"Atualizado com sucesso"});
        });
    });

});

router.delete('/delete/:id', auth, (req, res) => {
    var id = req.params.id;
    const user_id = req.headers.userid;
    Reminders.findOneAndRemove({ _id: id, userId: user_id }, (err) => {
        if (err) return res.status(500).send({ message: "Erro ao encontrar dados." });

        return res.status(200).send({ message: "Lembrete deletado!" });
    });
});

module.exports = router;