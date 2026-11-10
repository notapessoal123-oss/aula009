//arquivo usersModel.js

//chamada do método 'uuid' para criação de 'ID' para o usuário
const uuid = require('uuid').v4

//chamada do método 'bcrypt' para criar chave(token) criptografado (autenticação do usuário)
const bcrypt = require('bcrypt')

//dados para serem carregados na inicialiação
const users = [
  { id: '1', name: 'Luiz', email: 'luiz@email.com', password: bcrypt.hashSync('123456', 10) },
  { id: '2', name: 'Rassi', email: 'rassi@email.com', password: bcrypt.hashSync('0000', 10) }
]

//funções do CRUD para serem exportadas

module.exports = {

  createUser: (name, email, password) => {
    const newUser = {
      id: uuid(),
      name,
      email,
      password: bcrypt.hashSync(password, 10)
    }
    users.push(newUser)
    return newUser
  },

  getAllUsers: () => users,

  getUserById: (id) => users.find(user => user.id === id),

  getUserByEmail: (email) => users.find(user => user.email === email),

  updateUser: (id, name, email, password) => {
    const user = users.find(u => u.id === id)
    if (!user) return null

    if (name) user.name = name
    if (email) user.email = email
    if (password) {
      user.password = bcrypt.hashSync(password, 10)
    }

    return user
  },

  deleteUser: (id) => {
    const index = users.findIndex(user => user.id === id)
    if (index === -1) return null

    // Remove o usuário do array e retorna o usuário excluído
    const deletedUser = users.splice(index, 1)
    return deletedUser[0]
  }

}
