const getDepartments = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from departamento', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const createDepartment = ({ nombre_departamento, ciudad }) => {
    new Promise((resolve, reject) => {
        db.query('insert into departamento (nombre_departamento, ciudad) values (?,?)', [nombre_departamento, ciudad], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const getById = (pDepartamentoId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from departamento where id = ?', [pDepartamentoId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) reject('El id no existe');
            resolve(rows[0]);
        });
    });
};


const updateById = (pDepartamentoId, { nombre, ciudad }) => {
    return new Promise((resolve, reject) => {
        db.query('update departamento set nombre_departamento = ?, ciudad = ? where id =?', [nombre_departamento, ciudad, pDepartamentoId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const deleteById = (pDepartamentoId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from departamento where id = ?', [pDepartamentoId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}






module.exports = {
    getDepartments, createDepartment, getById, updateById, deleteById
}