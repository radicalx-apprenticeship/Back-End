const {Storage} = require("@google-cloud/storage")
const fs = require("fs")

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: require("../config/firebase-admin-keys.json"),
})
const bucket = storage.bucket(process.env.BUCKET_NAME)

const uploadWhole = (file) => {
    bucket.upload(file.path, {resumable: true})
}

const streamToCloud = (userId, file) => {

    const blob = bucket.file(`${userId}/${file.filename}`)
    const rs = fs.createReadStream(file.path) // read stream 
    const ws = blob.createWriteStream() // write stream

    rs.pipe(ws).on("finish", () => {
        console.log("Uploaded!!!")
    })
}

// return the google bucket url/path to uploaded file
const getRemoteUrl = (userId, file) => {
    return `https://storage.googleapis.com/${bucket.name}/${userId}/${file.filename}`
}

// delete media from cloud storage by its id
// user can't only delete his inside his folder
// filename : 70f78a83-b9de-4bf2-88d3-79864dcb1905.mp4
const deleteFromCloud = async (userId, filename) => {
    await bucket.file(`${userId}/${filename}`).delete()
}

module.exports = {
    streamToCloud,
    uploadWhole,
    getRemoteUrl,
    deleteFromCloud 
}
