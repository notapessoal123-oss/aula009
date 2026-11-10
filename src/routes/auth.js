//arquivo auth.js"

const express = require('express')
const authController = require('../controllers/authController')
const { ensureAuth } = require('../middlewares/authMiddleware')
const usersModel = require('../models/usersModel')
const authRouter = express.Router()

authRouter.post('/login', authController.login)

authRouter.post('/user', authController.create)

authRouter.get('/user', ensureAuth, (req, res) => {
    const users = usersModel.getAllUsers()

    const safeUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email
    }))

    return res.json(safeUsers)
})

// Rota PUT para atualizar o usuário pelo ID
authRouter.put('/user/:id', ensureAuth, authController.update)

// Rota DELETE para excluir o usuário pelo ID
authRouter.delete('/user/:id', ensureAuth, authController.deleteUser)

module.exports = authRouter