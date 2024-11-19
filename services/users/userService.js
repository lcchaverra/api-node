const {connection } = require('../../connection')
const bcrypt = require('bcrypt')

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
        const hashedPassword = bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (name, email, password, category, rol,) VALUES (?, ?, ?, ?, ?)';
        connection.query(sql, [name, email, hashedPassword, category, rol], (err, result) => {
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

const loguinUser = (username) => {
    return new Promise((resolve, reject) => {
        const sql = 'select * from users where name = ?'
        connection.query(sql, [username], (err, result)=>{
            if (err){
                reject(err)
            }
            else {
                resolve(result[0])
            }
        })
    });
};

module.exports = { getAllUser, getUser, createUser, updateUser, deleteUser, loguinUser };