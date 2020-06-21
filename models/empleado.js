const getWorkers = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from empleados', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const createWorker = ({ nombre, dni, sexo, fecha_nacimiento, fecha_inc, salario, cargo, jefe_id, fk_departamento }) => {
    return Promise((resolve, reject) => {
        db.query('insert into empleados (nombre, dni, sexo, fecha_nacimiento, fecha_inc, salario, cargo, jefe_id, fk_departamento) values (?,?,?,?,?,?,?,?,?)', [nombre, dni, sexo, fecha_nacimiento, fecha_inc, salario, cargo, jefe_id, fk_departamento], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const getById = (pEmpleadoId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from empleados where id = ?', [pEmpleadoId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) reject('El id no existe');
            resolve(rows[0]);
        });
    });
}

const updateById = (pEmpleadoId, { nombre, dni, sexo, fecha_nacimiento, salario, cargo, fk_jefe, fk_departamento }) => {
    return new Promise((resolve, reject) => {
        db.query('update empleados set nombre = ?, dni = ?, sexo = ?,fecha_nacimiento = ?, salario = ?, cargo= ?,  fk_jefe= ?, fk_departamento = ? where id =?', [nombre, dni, sexo, fecha_nacimiento, salario, cargo, fk_jefe, fk_departamento, pEmpleadoId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}





module.exports = {
    getWorkers, createWorker, getById, updateById
}