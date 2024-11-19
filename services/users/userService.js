const {connection } = require('../../connection')

const getAllUser = () => {
    return new Promise ((resolve, reject) => {
        const sql = 'select * from users'
        connection.query(sql, (err, result)=>{
            if (err){
                reject(err)
            }
            else {
                resolve(result)
            }
        })
        
    })
}

const getUser = (id) => {
    return new Promise ((resolve, reject) => {
        const sql = 'select * from users where id = ?'
        connection.query(sql, [id], (err, result)=>{
            if (err){
                reject(err)
            }
            else {
                resolve(result[0])
            }
        })
    })
}

const createUser = (userData) => {
    return new Promise((resolve, reject) => {
        const { name, email, password, category, rol } = userData;
        const sql = 'INSERT INTO users (name, email, password, category, rol,) VALUES (?, ?, ?, ?, ?)';
        connection.query(sql, [name, email, password, category, rol], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const updateUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE users SET ? WHERE id = ?';
        connection.query(sql, [userData, id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        connection.query(sql, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = { getAllUser, getUser, createUser, updateUser, deleteUser };