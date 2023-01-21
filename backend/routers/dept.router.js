import express from 'express'
import { Dept } from '../models/deptSchema.js'
import { Subject } from '../models/SubjectsSchema.js'
import { Faculty } from '../models/facultySchema.js'

const router = express.Router()

router.post('/dept/register', async (req, res) => {
  try {
    const { deptname, dept } = req.body
    const existingDept = await Dept.findOne({ dept: dept })
    if (existingDept) {
      return res.status(402).send({ message: 'Department already exists' })
    }
    const newdept = await new Dept({
      deptname,
      dept,
    }).save()
    return res
      .status(200)
      .send({ message: 'Department registered succesfully' })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'internal server error' })
  }
})

router.post('/subject/register', async (req, res) => {
  try {
    const { name, code, year, semester, dept, faculty } = req.body
    const existingSubject = await Subject.findOne({ code: code })
    if (existingSubject) {
      return res.status(402).send({ message: 'Subject already exists' })
    }
    let deptId = await Dept.findOne({ dept: dept })
    deptId = deptId._id
    // console.log(faculty)
    let facultyIds = await Faculty.find({ facultyId: { $in: faculty } }).select(
      '_id'
    )
    // facultyIds = facultyIds._id
    let modifiedFacultyIds = []
    async function getFacultyIds(facultyIds) {
      facultyIds.forEach(async (facultyId) => {
        modifiedFacultyIds.push(facultyId._id)
      })
    }
    await getFacultyIds(facultyIds)
    const newSubject = await new Subject({
      name,
      code,
      year,
      semester,
      deptId,
      //$push: { facultyId: { $each: modifiedFacultyIds } },
      facultyId: modifiedFacultyIds,
    }).save()
    //  console.log(newSubject)
    await Dept.updateOne(
      { _id: deptId },
      { $push: { subjects: newSubject._id } }
    )
    // async function registerSubjectsForFaculty(facultyIds){
    //   facultyIds.forEach(facultyId=>{
    //     await Faculty.upda
    //   })
    // }
    await Faculty.updateMany(
      { _id: { $in: modifiedFacultyIds } },
      { $push: { subjects: newSubject._id } }
    )
    res
      .status(200)
      .send({ message: 'Subject successfully registered under ' + dept })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'internal server error' })
  }
})

router.get('/departments', async (req, res) => {
  try {
    const depts = await Dept.find({}).populate('faculty subjects')
    res.status(200).send(depts)
  } catch (err) {
    res.status(500).send({ message: 'internal server error' })
  }
})

router.get('/faculty', async (req, res) => {
  try {
    const faculty = await Faculty.find({}).populate('deptId subjects')
    res.status(200).send(faculty)
  } catch (err) {
    res.status(500).send({ message: 'internal server error' })
  }
})
export const deptRouters = router
