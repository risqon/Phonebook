const firebase = require("firebase");


const getPhones = (offset, limit) => {
  const phoneReference = firebase.database().ref("/Phones/");
  return (new Promise((resolve, reject) => {
    phoneReference.on("value", function (snapshot) {
      const folders = snapshot.val();
      if (folders === null) {
        resolve([]);
      } else {
        const data = Object.keys(folders).map(o => Object.assign({ id: o }, folders[o]));
        const totalData = data.length
        const listData = data.splice(offset, limit)
        resolve({ totalData, listData });
      }
      phoneReference.off("value");
    }, (errorObject) => {
      console.log("The read failed: " + errorObject.code);
      reject("The read failed: " + errorObject.code);
    });
  }));
}

//search existing instance
const searchPhones = (name, phone, image, offset, limit) => {
  const regName = new RegExp(name, 'ig')
  const regPhone = new RegExp(phone, 'g')
  const phoneReference = firebase.database().ref("/Phones/");
  return (new Promise((resolve, reject) => {
    phoneReference.on("value", function (snapshot) {
      const folders = snapshot.val();
      if (folders === null) {
        resolve([]);
      } else {
        const row = Object.keys(folders).map(o => Object.assign({ id: o }, folders[o])).filter(item => {
          if (name && phone && image) {
            return item.name.match(regName) && item.phone.match(regPhone)
          } else if (name) {
            return item.name.match(regName)
          } else if (phone) {
            return item.phone.match(regPhone)
          } else {
            return false
          }
        })
        const dataLength = row.length
        const listData = row.splice(offset, limit)
       // console.log(dataLength, listData)
        resolve({ dataLength, listData })
      }
      phoneReference.off("value");
    }, (errorObject) => {
      console.log("The read failed: " + errorObject.code);
      reject("The read failed: " + errorObject.code);
    })
  }))
}



//Create new instance
const addPhones = (phone) => {

  // const s3 = new AWS.S3({
  //   accessKeyId: process.env.AWS_ID,
  //   secretAccessKey: process.env.AWS_SECRET
  // })
  // // //console.log('s3', s3)
  // var upload = multer({
  //   storage: multerS3({
  //     s3: s3,
  //     bucket: 'image-phonebook',
  //     acl: "public-read",
  //     metadata: function (req, file, cb) {
  //       console.log('fieldname');
  //       console.log(file);
  //       cb(null, {fieldName: file.fieldname});
  //     },
  //     key: function (req, file, cb) {
  //       cb(null, Date.now() + "-" + file.originalname)
  //     }
  //   })
  // })
  
  const referencePath = `/Phones/${phone.id}`;
  const phoneReference = firebase.database().ref(referencePath);
  return (new Promise((resolve, reject) => {
    phoneReference.set({ 
      name: phone.name,
      phone: phone.phone, 
      image: phone.image }, (error) => {
      console.log(phoneReference)
      if (error) {
        reject("Data could not be deleted." + error);
      } else {
        console.log('zzzzzzzz', phone)
        resolve(phone);
      }
    });
  }));
}

//Update existing instance
const updatePhone = (phone) => {
  var referencePath = `/Phones/${phone.id}/`;
  var userReference = firebase.database().ref(referencePath);
  return (new Promise((resolve, reject) => {
    userReference.update({ name: phone.name, phone: phone.phone }, (error) => {
      if (error) {
        reject("Data could not be deleted." + error);
      } else {
        resolve(phone);
      }
    });
  }));
}

//Delete an instance
const deletePhone = (phone) => {
  var referencePath = `/Phones/${phone.id}/`;
  var userReference = firebase.database().ref(referencePath);
  return (new Promise((resolve, reject) => {
    userReference.remove((error) => {
      if (error) {
        reject("Data could not be deleted." + error);
      } else {
        resolve(phone);
      }
    })
  }));
}



module.exports = { getPhones, addPhones, updatePhone, deletePhone, searchPhones }