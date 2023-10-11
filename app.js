const express = require("express");
const app = express();
const port = 3000;
const expressLayouts = require("express-ejs-layouts");
const { body, validationResult, check } = require("express-validator");
const { loadContacts, findContact, addContact } = require("./utility/contacts");

app.set("view engine", "ejs");

// Third party middleware
app.use(expressLayouts);

//built-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// router
app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Zidane",
      umur: 23,
      email: "zidan.abbas28@gmail.com",
    },
    {
      nama: "Hadid",
      umur: 24,
      email: "Hadid@gmail.com",
    },
    {
      nama: "Dian",
      umur: 23,
      email: "Dian28@gmail.com",
    },
  ];

  res.render("index", {
    layout: "layouts/main-layouts",
    nama: "zidane abbas",
    title: "Halaman Home",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layouts",
    title: "Halaman About",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContacts();
  // console.log(contacts);
  res.render("contact", {
    layout: "layouts/main-layouts",
    title: "Halaman Contact",
    contacts,
  });
});

app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    layout: "layouts/main-layouts",
    title: "Form Tambah Data Contact",
  });
});

//proses data kontak
app.post(
  "/contact",
  [
    check("email", "Email tidak valid").isEmail(),
    check("nohp", "No Handphone tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // addContact(req.body);
    // res.redirect("/contact");
  }
);

app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("detail", {
    layout: "layouts/main-layouts",
    title: "Detail Contact",
    contact,
  });
});

app.listen(port, () => {
  console.log("Server istening port 3000...");
});

app.use((req, res) => {
  res.status(404);
  res.send("Halaman tidak ditemukan");
});
