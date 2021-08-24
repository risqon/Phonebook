var express = require('express');
var router = express.Router();
const firebase = require("firebase");

/* GET home page. */
router.get('/', function (req, res) {
  const phoneReference = firebase.database().ref("/Phones/");
  //Attach an asynchronous callback to read the data
  phoneReference.on("value", function (snapshot) {
    console.log('berhasil', snapshot.val());
    res.json(snapshot.val());
    phoneReference.off("value");
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    res.send("The read failed: " + errorObject.code);
  });
});

//Create new instance
// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_ID,
//     secretAccessKey: process.env.AWS_SECRET
//   })
//   // //console.log('s3', s3)
//   var upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'image-phonebook',
//       acl: "public-read",
//       metadata: function (req, file, cb) {
//         console.log('fieldname');
//         console.log(file);
//         cb(null, {fieldName: file.fieldname});
//       },
//       key: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname)
//       }
//     })
//   })


router.post('/', function (req, res) {  
  const referencePath = `/Phones/${id}/`;
  const phoneReference = firebase.database().ref(referencePath);
  phoneReference.set({ name, phone , image }, function (error) {
    if (error) {
      res.send("Data could not be saved." + error);
    } else {
      res.send(`${name}'s phone number saved successfully.`);
    }
  });
});

//Update existing instance
router.put('/:id', function (req, res) {
  const id = req.params.id;
  const name = req.body.name;
  const phone = req.body.phone;

  const referencePath = `/Phones/${id}/`;
  const phoneReference = firebase.database().ref(referencePath);
  phoneReference.update({ name, phone }, function (error) {
    if (error) {
      res.send("Data could not be updated." + error);
    } else {
      res.send("Data updated successfully.");
    }
  });
});

//Delete an instance
router.delete('/:id', function (req, res) {
  const id = req.params.id
  const referencePath = `/Phones/${id}/`;
  const phoneReference = firebase.database().ref(referencePath);
  phoneReference.remove((error) => {
    if (error) {
      res.send("Data could not be deleted." + error);
    } else {
      res.send("Data deleted successfully.");
    }
  })
});

module.exports = router;
