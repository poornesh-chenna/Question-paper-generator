import { useEffect, useState } from 'react'
import navWrapper from '../../components/navbarf'
import { Axios } from '../../utils/Axios'
import downloadDocxFromBase64 from '../../utils/downloadWord'

function QuestionPapers() {
  const [generatedPapers, setgeneratedPapers] = useState([])
  const [url, seturl] = useState()
  const [search, setsearch] = useState('')

  const filteredDocs = generatedPapers.filter((paper) => {
    return paper.fileName.toLowerCase().includes(search.toLowerCase())
  })

  async function getGeneratedPapers() {
    const res = (await Axios.get('/generatedPapers')).data.generatedWords
    console.log(res)
    setgeneratedPapers(res)
    console.log('gen', generatedPapers)
  }

  useEffect(() => {
    getGeneratedPapers()
  }, [])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="🔍 search for papers"
          onChange={(e) => setsearch(e.target.value)}
          value={search}
          style={{
            padding: '14px',
            fontSize: '18px',
            border: '2px solid black',
            borderRadius: '50px',
            width: '40%',
            marginBottom: '40px',
            textAlign: 'center',
          }}
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto',
          gap: '30px 50px',
        }}
      >
        {filteredDocs &&
          filteredDocs.map((paper, idx) => {
            return (
              <div
                style={{
                  // border: '1px solid #6886C5',

                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                  overflow: 'hidden',
                  backgroundColor: '#F7F5F2',
                  boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  downloadDocxFromBase64(paper.word, paper.fileName)
                }
                key={idx}
              >
                <img
                  style={{ width: '40px' }}
                  src="/static/images/docx_icon.svg.png"
                  alt="word"
                />
                <span style={{ marginLeft: '8px' }}>{paper.fileName}</span>
              </div>
            )
          })}
      </div>
    </>
  )
}

export const fqp = navWrapper(<QuestionPapers />)
