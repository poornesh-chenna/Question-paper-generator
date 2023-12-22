let generatedQuestions
let questionsTotal

function assignQuestion(q, unit, unitc, type) {
  let total
  let questionMarks = parseInt(q.marks, 10)
  if (type === 'internal1') {
    if (questionMarks === 6 || questionMarks > 9) return
    if (unit === 'unit1') {
      if (questionMarks === 8) return
      total = 9
    } else {
      if (questionMarks === 5 || questionMarks === 9) return
      total = 8
    }
  } else if (type === 'internal2') {
    if (questionMarks === 6 || questionMarks > 9) return
    if (unit === 'unit3') {
      if (questionMarks === 8) return
      total = 9
    } else {
      if (questionMarks === 5 || questionMarks === 9) return
      total = 8
    }
  } else if (type === 'external') {
    if (questionMarks === 5 || questionMarks === 9) {
      return
    }
    total = 12
  }
  if (questionsTotal[unit] === 0) {
    generatedQuestions[unit].push({ question: q.question, marks: q.marks })
    questionsTotal[unit] = q.marks
  } else if (questionsTotal[unitc] === 0) {
    generatedQuestions[unitc].push({ question: q.question, marks: q.marks })
    questionsTotal[unitc] = q.marks
  } else if (questionMarks + parseInt(questionsTotal[unit], 10) === total) {
    generatedQuestions[unit].push({ question: q.question, marks: q.marks })
    questionsTotal[unit] = questionMarks + parseInt(questionsTotal[unit], 10)
  } else if (questionMarks + parseInt(questionsTotal[unitc], 10) === total) {
    generatedQuestions[unitc].push({ question: q.question, marks: q.marks })
    questionsTotal[unitc] = questionMarks + parseInt(questionsTotal[unitc], 10)
  }
  // console.log(type, total, unit, questionsTotal)
}
function shuffleArray(array) {
  // console.log(array)
  return new Promise((resolve, reject) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    resolve(array)
  })
  //  console.log(array)
}
export async function generate(questions, type) {
  await shuffleArray(questions)

  if (type === 'internal1') {
    ;(generatedQuestions = {
      unit1: [],
      unit1c: [],
      unit2: [],
      unit2c: [],
      unit3: [],
      unit3c: [],
    }),
      (questionsTotal = {
        unit1: 0,
        unit1c: 0,
        unit2: 0,
        unit2c: 0,
        unit3: 0,
        unit3c: 0,
      })
    async function iterateQuestions() {
      return new Promise((resolve, reject) => {
        for (var i = 0; i < questions.length; i++) {
          switch (questions[i].unit) {
            case 1:
              assignQuestion(questions[i], 'unit1', 'unit1c', type)
              break
            case 2:
              assignQuestion(questions[i], 'unit2', 'unit2c', type)
              break
            case 3.1:
              assignQuestion(questions[i], 'unit3', 'unit3c', type)
              break
          }
        }
        resolve(generatedQuestions)
      })
    }
    await iterateQuestions()
  } else if (type === 'internal2') {
    ;(generatedQuestions = {
      unit3: [],
      unit3c: [],
      unit4: [],
      unit4c: [],
      unit5: [],
      unit5c: [],
    }),
      (questionsTotal = {
        unit3: 0,
        unit3c: 0,
        unit4: 0,
        unit4c: 0,
        unit5: 0,
        unit5c: 0,
      })
    async function iterateQuestions() {
      return new Promise((resolve, reject) => {
        for (var i = 0; i < questions.length; i++) {
          switch (questions[i].unit) {
            case 3.2:
              assignQuestion(questions[i], 'unit3', 'unit3c', type)
              break
            case 4:
              assignQuestion(questions[i], 'unit4', 'unit4c', type)
              break
            case 5:
              assignQuestion(questions[i], 'unit5', 'unit5c', type)
              break
          }
        }
        resolve(generatedQuestions)
      })
    }
    await iterateQuestions()
  } else if (type === 'external') {
    generatedQuestions = {
      unit1: [],
      unit1c: [],
      unit2: [],
      unit2c: [],
      unit3: [],
      unit3c: [],
      unit4: [],
      unit4c: [],
      unit5: [],
      unit5c: [],
    }
    questionsTotal = {
      unit1: 0,
      unit1c: 0,
      unit2: 0,
      unit2c: 0,
      unit3: 0,
      unit3c: 0,
      unit4: 0,
      unit4c: 0,
      unit5: 0,
      unit5c: 0,
    }

    async function iterateQuestions() {
      return new Promise((resolve, reject) => {
        for (var i = 0; i < questions.length; i++) {
          switch (questions[i].unit) {
            case 1:
              assignQuestion(questions[i], 'unit1', 'unit1c', type)
              break
            case 2:
              assignQuestion(questions[i], 'unit2', 'unit2c', type)
              break
            case 3.1:
              assignQuestion(questions[i], 'unit3', 'unit3c', type)
              break
            case 3.2:
              assignQuestion(questions[i], 'unit3', 'unit3c', type)
              break
            case 4:
              assignQuestion(questions[i], 'unit4', 'unit4c', type)
              break
            case 5:
              assignQuestion(questions[i], 'unit5', 'unit5c', type)
              break
          }
        }
        resolve(generatedQuestions)
      })
    }
    await iterateQuestions()
  }
  return generatedQuestions
}
