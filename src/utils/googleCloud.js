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
    const rs = fs.createReadStream(file.path)
    const ws = blob.createWriteStream()

    rs.pipe(ws).on("finish", () => {
        console.log("Uploaded!!!")
    })
}

module.exports = {
    streamToCloud,
    uploadWhole
}
