const express = require('express');
const fs = require('fs');
const router = express.Router();

const auth = require('../middlewares/auth');
const Reminders = require('../model/Reminders');

router.get('/', auth,  async (req, res) => {
    try {
        const reminders = await Reminders.find({});
        return res.send(reminders);
    } catch (err) {
        return res.status(500).send({ error: 'Erro na consulta de lembretes.'});
    }
});

router.post('/new', auth, async (req, res) => {
    
    const { location, reminder } = req.body;

    if( !location || !reminder ) { return res.status(400).send({ message: 'Dados insuficientes !' }); }

    try {
        const reminders = await Reminders.create(req.body);

        return res.status(201).send({ reminders, message:'Lembrete criado com sucesso!' });
        
    } catch (error) {
        return res.status(500).send({ message:'Erro ao cadastrar lembrete.' });
    }

});

router.put('/update/:id', auth,  async (req, res) => {

    var id = req.params.id;

    Reminders.findOne({_id: id}, (err, foundObject) => {
        if (err) return res.status(500).send({ message: "Erro ao encontrar dados."});

        if (!foundObject) return res.status(404).send({ message: 'Objeto não encontrado.'});

        foundObject.location = req.body.location;
        foundObject.reminder = req.body.reminder;
        foundObject.atv_name = req.body.reminder.atv_name;
        foundObject.start = req.body.reminder.periods.start;
        foundObject.end = req.body.reminder.periods.end;

        foundObject.save((err, updateObject) => {
            if (err) return res.status(500).send({ message: "Erro ao atualizar dados."});

            res.send(updateObject);
        });
    });

});

router.delete('/delete/:id', auth, (req, res) => {
    var id = req.params.id;

    Reminders.findOneAndRemove({_id: id}, (err, foundObject) => {
        if (err) return res.status(500).send({ message: "Erro ao encontrar dados." });

        return res.status(200).send({ message: "Lembrete deletado!" });
    });
});





module.exports = router;