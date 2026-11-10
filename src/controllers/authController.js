//arquivo authController.js

//chamada do método 'jwt' para uso do token de autenticação
const jwt = require('jsonwebtoken')

//chamada do método 'bcrypt' para verificação do token de autenticação
const bcrypt = require('bcrypt')

const usersModel = require("../models/usersModel")

module.exports = {
  // POST /login
  login: (req, res) => {
    const { email, password } = req.body

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
    }

    const user = usersModel.getUserByEmail(email)
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    }

    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciais incorretas!' })
    }

    const payload = { id: user.id, email: user.email }
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d' })
    res.json({ token })
  },

  // POST /cria
  create: (req, res) => {
    const { name, email, password } = req.body

    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
    }

    const existingUser = usersModel.getUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já cadastrado!' })
    }

    const newUser = usersModel.createUser(name, email, password)
    // res.status(201).json(newUser)
    res.status(201).json({ ...newUser, password: undefined })
  },

  //PUT /altera
  update: (req, res) => {
    const { id } = req.params
    const { name, email, password } = req.body
  
    const user = usersModel.getUserById(id)
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    }
  
    // Verifica se o novo e-mail já pertence a outro usuário
    if (email && email !== user.email) {
      const existingUser = usersModel.getUserByEmail(email)
      if (existingUser) {
        return res.status(400).json({ message: 'E-mail já está em uso por outro usuário!' })
      }
    }
  
    const updatedUser = usersModel.updateUser(id, name, email, password)
  
    return res.json({
      message: 'Usuário atualizado com sucesso!',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email
      }
    })
  },

  // DELETE
  deleteUser: (req, res) => {
    const { id } = req.params
  
    const user = usersModel.getUserById(id)
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado!' })
    }
  
    usersModel.deleteUser(id)
    return res.json({ message: 'Usuário excluído com sucesso!', user: { id: user.id, name: user.name } })
  }

}