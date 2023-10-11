const fs = require("fs");

// Membuat folder jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Membuat file contacts json jika belum ada
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

//Menulis data file contacts.json dengan data yang baru

const saveContacts = (contacts) => {
  const dataPath = "data/contacts.json";
  fs.writeFileSync(dataPath, JSON.stringify(contacts));
};

//Menambahkan contact
const addContact = (contact) => {
  const contacts = loadContacts();
  contacts.push(contact);
  saveContacts(contacts);
};

const loadContacts = () => {
  //membaca file contact
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

//Mencari contact berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContacts();
  const contact = contacts.find((contact) => contact.nama === nama);
  return contact;
};

module.exports = { loadContacts, findContact, addContact };
