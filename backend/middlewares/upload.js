//이미지를 받고 오브젝트 스토리지에 올리기 위한 모듈 import
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

//s3에 bucket을 일단 두개 만들었는데 이렇게 나눠서 관리하는게 맞는지 모르겠네요
//1. yorijori-profile
//2. yorijori-recipes

const profileStorage = multerS3({
  s3: s3,
  bucket: "yorijori-profile", //The bucket used to store the file
  contentType: multerS3.AUTO_CONTENT_TYPE, //업로드되는 파일의 memetype
  acl: "public-read", //업로드 되는 파일들은 읽기 설정만 public
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname }); //metadata onject to be sent to S3
  },
  key: function (req, file, cb) {
    cb(null, `uploads/${Date.now().toString()}_${file.originalname}`);
  }, //The name of file
});

const recipeStorage = multerS3({
  s3: s3,
  bucket: "yorijori-recipes", //The bucket used to store the file
  contentType: multerS3.AUTO_CONTENT_TYPE, //업로드되는 파일의 memetype
  acl: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname }); //metadata onject to be sent to S3
  },
  key: function (req, file, cb) {
    cb(null, `uploads/${Date.now().toString()}_${file.originalname}`);
  }, // The name of the file
});

exports.profileUpload = multer({ storage: profileStorage });
exports.recipeUpload = multer({ storage: recipeStorage });
exports.s3 = s3;

//file에 담겨있는 정보들
// {
//   fieldname: 'img',
//   originalname: '스크린샷 2020-08-11 오후 4.05.51.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   size: 18472,
//   bucket: 'project-portfolio-upload',
//   key: 'uploads/1597667031103_스크린샷 2020-08-11 오후 4.05.51.png',
//   acl: 'public-read',
//   contentType: 'image/png',
//   contentDisposition: null,
//   storageClass: 'STANDARD',
//   serverSideEncryption: null,
//   metadata: { fieldName: 'img' },
//   location: 'AWS-S3 URL',
//   etag: '"22cdfa150f11b3d125853746e5a7a65c"',
//   versionId: undefined
// }
