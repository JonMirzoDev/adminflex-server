const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const registrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

const register = async (req, res) => {
  try {
    const { error } = registrationSchema.validate(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const userId = await userModel.createUser({
      ...req.body,
      password: hashedPassword,
      registrationTime: new Date()
    })

    res
      .status(201)
      .send({ userId: userId, message: 'User created successfully' })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const user = await userModel.findUserByEmail(req.body.email)
    if (!user) {
      return res.status(401).send('User does not exist')
    }

    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) {
      return res.status(401).send('Password is incorrect')
    }

    await userModel.updateLastLoginTime(user.id)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })

    res.send({ token: token })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = { register, login }
