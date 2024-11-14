const {connection, mondb } = require('../connection')
const User = require("../models/users/userModel");

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
        const { username, email, password } = userData;
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        sqlConnection.query(sql, [username, email, password], (err, result) => {
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
        sqlConnection.query(sql, [userData, id], (err, result) => {
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
        sqlConnection.query(sql, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = { getAllUser, getUser, createUser, updateUser, deleteUser };