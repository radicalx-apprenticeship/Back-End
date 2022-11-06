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

const streamToCloud = (file) => {

    const blob = bucket.file(file.filename)
    const rs = fs.createReadStream(file.path) // read stream 
    const ws = blob.createWriteStream() // write stream

    rs.pipe(ws).on("finish", () => {
        console.log("Uploaded!!!")
    })
}

// return the google bucket url/path to uploaded file
const getRemoteUrl = (file) => {
    return `https://storage.googleapis.com/${bucket.name}/${file.filename}`
}

module.exports = {
    streamToCloud,
    uploadWhole,
    getRemoteUrl
}
