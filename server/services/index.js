const firebase = require("firebase");

const getPhones = ( offset, limit) => {
  const phoneReference = firebase.database().ref("/Phones/");
  return (new Promise((resolve, reject)=>{
    phoneReference.on("value", function(snapshot) {
      const folders = snapshot.val();
      if (folders === null) {
        resolve([]);
      }else{
        const data = Object.keys(folders).map(o => Object.assign({ id: o }, folders[o]));
        const totalData = data.length
        const listData = data.splice(offset, limit)
        resolve({totalData, listData});
      }
      phoneReference.off("value");
    }, (errorObject) => {
      console.log("The read failed: " + errorObject.code);
      reject("The read failed: " + errorObject.code);
    });
  }));
}

//search existing instance
const searchPhones = (Name, Phone, offset, limit) => {
  
  const regName = new RegExp(Name, 'ig')
  const regPhone = new RegExp(Phone, 'g')
  const phoneReference = firebase.database().ref("/Phones/");

  return (new Promise((resolve, reject) => {

    phoneReference.on("value", function (snapshot) {
      const folders = snapshot.val();

      if(folders === null) {
        resolve([]);
      } else {
        const row = Object.keys(folders).map(o => Object.assign({id: o}, folders[o])).filter(item => {
          if(Name && Phone) {
            return item.Name.match(regName) && item.Phone.match(regPhone)
          } else if (Name){
            return item.Name.match(regName)
          } else if (Phone){
            return item.Phone.match(regPhone)
          } else {
            return false
          }
        })

        const dataLength = row.length
        const listData = row.splice(offset, limit)

        resolve({dataLength, listData})
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
  const referencePath = `/Phones/${phone.id}/`;
  const phoneReference = firebase.database().ref(referencePath);
  return (new Promise((resolve, reject) => {
    phoneReference.set({Name: phone.Name, Phone: phone.Phone}, (error) => {
      if (error) {
        reject("Data could not be deleted." + error);
      } else {
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
    userReference.update({Name: phone.Name, Phone: phone.Phone}, (error) => {
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

module.exports = {getPhones, addPhones, updatePhone, deletePhone , searchPhones}