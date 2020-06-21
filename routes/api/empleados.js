router = require('express').Router();
const {check,validationResult} = require('express-validator');

Empleado = require('../../models/empleado');


router.get('/', async (req, res) => {
    try {
        const rows = await Empleado.getWorkers();
        res.json(rows);
    } catch (err) {
        res.json({ error: err });
    }
});


router.post('/create', [
    check('dni', 'El dni no posee un formato correcto').exists().matches(/(^([0-9]{8,8}\-[A-Z])|^)$/, "i"),
    check('nombre', 'El nombre es obligatorio').exists().isLength({ min: 3 })
], async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.json(error.array());
    }

    const result = await Empleado.createWorker(req.body);

    if (result['affectedRows'] === 1) {
        const empleado = await Empleado.getById(result['insertId']);
        res.json({ success: 'Empleado creado' });
    } else {
        res.json({ error: 'Ha habido algún error' });
    }
});

router.delete('/:idEmpleado', async (req, res) => {
    const result = await Empleado.deleteById(req.params.idEmpleado);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Borrado con éxito' });
    } else {
        res.json({ error: 'Ha habido un error' });
    }
});

router.put('/:idEmpleado', async (req, res) => {
    const result = await Empleado.updateById(req.params.idEmpleado, req.body);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Se ha actualizado el empleado' });
    } else {
        res.json({ error: 'No se ha actualizado' });
    }
});





module.exports = router;
