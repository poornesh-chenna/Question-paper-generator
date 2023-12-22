function downloadDocxFromBase64(base64String, fileName) {
  const linkSource = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64String}`
  const downloadLink = document.createElement('a')
  document.body.appendChild(downloadLink)

  downloadLink.href = linkSource
  downloadLink.download = fileName
  downloadLink.click()
  document.body.removeChild(downloadLink)
}

export default downloadDocxFromBase64
