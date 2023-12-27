import express from 'express'
import { Admin } from '../models/adminSchema.js'
import { signJwtToken } from '../utils/jwt.js'
import { Dept } from '../models/deptSchema.js'
import { Faculty } from '../models/FacultySchema.js'

const router = express.Router()

router.post('/admin/register', async (req, res) => {
  try {
    const { email, password } = req.body
    const newAdmin = new Admin({
      email,
      password,
    }).save()
    return res.status(200).send({ message: 'Admin registered successfully' })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'internal server error' })
  }
})
router.post('/admin/login', async (req, res) => {
  try {
    const foundAdmin = await Admin.findOne({ email: req.body.email })
    if (!foundAdmin) {
      res.status(400).send({ message: 'Email is not registered' })
      return
    }
    if (foundAdmin.password === req.body.password) {
      return res.status(200).send({ message: 'Successfully logged in' })
    } else {
      return res.status(401).send({ message: 'Invalid password' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'internal server error' })
  }
})

router.post('/faculty/login', async (req, res) => {
  try {
    const foundFaculty = await Faculty.findOne({ email: req.body.email })
    if (!foundFaculty) {
      res.status(400).send({ message: 'Email is not registered' })
      return
    }
    if (foundFaculty.password === req.body.password) {
      const userId = foundFaculty._id
      const jwtToken = signJwtToken(userId)
      return res.status(200).send({
        message: 'successfully logged in',
        jwtToken,
      })
    } else {
      return res.status(401).send({ message: 'Invalid password' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'internal server error' })
  }
})

router.post('/faculty/register', async (req, res) => {
  try {
    const foundFaculty = await Faculty.findOne({ email: req.body.email })
    if (foundFaculty) {
      res
        .status(400)
        .send({ message: 'This faculty email is already registered' })
      return
    }

    const foundFacultybyID = await Faculty.findOne({
      facultyId: req.body.facultyId,
    })
    if (foundFacultybyID) {
      res.status(400).send({ message: 'This faculty ID is already registered' })
      return
    }
    const { facultyId, name, email, password, dept } = req.body
    console.log(req.body, name.length)
    if (
      facultyId.length === 0 ||
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      dept.length === 0
    ) {
      return res.status(400).send({ message: 'All fields are required' })
    }
    const newFaculty = await new Faculty({
      facultyId,
      name,
      email,
      password,
      dept,
    }).save()

    // console.log(newFaculty)
    await Dept.updateOne({ dept: dept }, { $push: { faculty: newFaculty._id } })
    res.status(200).send({ message: 'new faculty successfully registered' })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'internal server error' })
  }
})

router.post('/changePassword', async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body
    if (!email || !oldPassword || !newPassword) {
      res.status(400).send({ message: 'All fields are required' })
      return
    }
    const foundFaculty = await Faculty.findOne({ email: email })

    if (!foundFaculty) {
      res.status(400).send({ message: 'This email is not registered' })
      return
    }
    if (foundFaculty.password !== oldPassword) {
      res.status(400).send({ message: 'Old Password does not match' })
      return
    }
    await Faculty.updateOne(
      { email: email },
      { $set: { password: newPassword } }
    )
    res.status(200).send({ message: 'Password Changed Successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'internal server error' })
  }
})
export const authRouters = router
