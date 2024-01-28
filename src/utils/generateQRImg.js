async function generateQRImg(id) {
  try {
    const res = await fetch(
      `https://api.qrserver.com/v1/create-qr-code/?data=${id}&amp;size=700x700&qzone=2`
    )
    const photoBlob = await res.blob()
    return URL.createObjectURL(photoBlob)
  } catch (error) {
    return null
  }
}

export default generateQRImg
