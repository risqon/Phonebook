var express = require('express');
var router = express.Router();
const firebase = require("firebase");


/* GET home page. */
router.get('/', function (req, res) {
  const phoneReference = firebase.database().ref("/Phones/");
  console.log('here')
  //Attach an asynchronous callback to read the data
  phoneReference.on("value", function (snapshot) {
    console.log('berhasil',snapshot.val());
    res.json(snapshot.val());
    phoneReference.off("value");
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    res.send("The read failed: " + errorObject.code);
  });
});

//Create new instance
// let storageRef = firebase.storage().ref(`avatar`).getDownloadURL();
// console.log('aaa',storageRef)
// storageRef.child('avatar').getDownloadURL().then(url => {
//   var xhr = new XMLHttpRequest();
//   xhr.responseType = 'blob';
//   xhr.onload = function(event) {
//     var blob = xhr.response;
//   };
//   xhr.open('GET', url);
//   xhr.send();
// }).catch (function(error){
//   console.log(error)
// })

router.post('/' , function (req, res) {
  const { name , phone, avatar} = req.body
  const id = Date.now()

  const referencePath = `/Phones/${id}/`;
  const phoneReference = firebase.database().ref(referencePath);
  phoneReference.set({ name, phone, avatar }, function (error) {
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
  phoneReference.update({ name, phone}, function (error) {
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
