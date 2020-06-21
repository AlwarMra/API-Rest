router = require('express').Router();
const {check,validationResult} = require('express-validator');

Departamento = require('./../../models/departamento');

router.get('/', (req, res) => {
    Departamento.getDepartments()
        .then((rows) => {
            res.json(rows)
        })
        .catch((err) => {
            res.json({ error: err.message });
        })
});

router.post('/create', [
    check('nombre', 'Nombre obligatorio').exists().isLength({
        max: 30
    }),
    check('ciudad', 'Ciudad obligaorio').exists().isLength({
        max: 30
    })
], async (req, res) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.json(errores.array());
    }

    const result = await Departamento.createDepartment(req.body);
    if (result['affectedRows'] === 1) {
        const departamento = await Departamento.getById(result['insertId']);
        res.json({ success: 'Se ha insertado el departamento' });
    } else {
        res.json({ error: 'No se ha insertado' });
    }
});



router.put('/:idDepartamento', async (req, res) => {
    const result = await Departamento.updateById(req.params.idDepartamento, req.body);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Departamento actualizado' });
    } else {
        res.json({ error: 'No actualizado' });
    }
});



router.delete('/:idDepartamento', async (req, res) => {
    const result = await Departamento.deleteById(req.params.idDepartamento);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Se ha borrado el departamento' });
    } else {
        res.json({ error: 'No se ha borrado' });
    }
});



module.exports = router;
