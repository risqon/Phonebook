const addContact = require('./add').add;
const removeContact = require('./remove').removeContact;
const updateContact = require('./update').updateContact;

module.exports = {
  addContact,
  removeContact,
  updateContact
}