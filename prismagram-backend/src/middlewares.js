import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: "ap-southeast-2"
});

export const isAuthenticated = (request) => {
    if (!request.user) {
        throw Error('You need to log in to perform this action');
    }
    return;
}

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: "prismagrapp",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});


export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
    const { file: { location } } = req;
    res.json({ location });
}