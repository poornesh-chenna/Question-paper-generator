import express from 'express'
import { Dept } from '../models/deptSchema.js'
import { Subject } from '../models/SubjectsSchema.js'
import { Faculty } from '../models/facultySchema.js'

const router = express.Router()

router.post('/dept/register', async (req, res) => {
  try {
    const { deptname, dept } = req.body
    if (!deptname && !dept) {
      return res.status(400).send({ message: 'All fields are required' })
    }
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
    if (!name && !code && !year && !semester && !dept && !faculty) {
      return res.status(400).send({ message: 'All fields are required' })
    }
    const existingSubject = await Subject.findOne({ code: code })
    if (existingSubject) {
      return res.status(402).send({ message: 'Subject code already exists' })
    }
    let deptId = await Dept.findOne({ dept: dept })
    deptId = deptId._id
    // console.log(faculty)
    let facultyIds = await Faculty.find({ name: { $in: faculty } }).select(
      '_id'
    )
    // facultyIds = facultyIds._id
    if (!facultyIds) {
      res.status(403).send({ message: 'Faculties section is empty' })
    }
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
    const depts = await Dept.find({})
      .populate('faculty', 'name')
      .populate('subjects')
      .populate({
        path: 'subjects',
        populate: {
          path: 'facultyId',
          model: 'Faculty',
          select: { name: 1 },
        },
      })
    res.status(200).send(depts)
  } catch (err) {
    res.status(500).send({ message: 'internal server error', err })
  }
})

export const deptRouters = router
