const mongoose = require('mongoose');
const User = require('../models/User.model');
const Meeting = require('../models/Meeting.model');
const bcrypt = require('bcryptjs');

const hashedPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const users = [
    { _id: mongoose.Types.ObjectId(), email: "admin@admin.com", name: "Admin", password: hashedPassword('123456aA'), age: 28, gender: 'Male', image: 'https://source.unsplash.com/MP0IUfwrn0A' },
  ];

const meetings = [
    { name: "Pañuelo", description: 'This is a description 1', date: new Date(2022, 10, 01), duration: 2, location: 'Bellaterra', image: 'https://phantom-marca.unidadeditorial.es/67cb48c6a45d52e6fe2d19b47b843b65/resize/1300/assets/multimedia/imagenes/2020/04/13/15867939884352.jpg' },
    { name: "Araña", description: 'This is a description 2', date: new Date(2022, 10, 01), duration: 1, location: 'Barcelona', image: 'https://projectes.fundesplai.org/cochabambasantjoandespi/wp-content/uploads/sites/16/2015/03/ARA%C3%91A.jpg' },
    { name: "Matar", description: 'This is a description 3', date: new Date(2022, 10, 01), duration: 3, location: 'Amposta', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/USMC-080816-M-9999S-025.jpg/220px-USMC-080816-M-9999S-025.jpg' },
    { name: "Marco Polo", description: 'This is a description 4', date: new Date(2022, 10, 01), duration: 2, location: 'Matadepera', image: 'https://www.wikihow.com/images_en/thumb/1/1f/Play-Marco-Polo-Step-1-Version-5.jpg/v4-460px-Play-Marco-Polo-Step-1-Version-5.jpg.webp' },
    { name: "Escondite", description: 'This is a description 5', date: new Date(2022, 10, 01), duration: 1, location: 'Ribes', image: 'https://www.conmishijos.com/uploads/juegos/juegossiempre5.jpg' },
    { name: "Course Navette", description: 'This is a description 6', date: new Date(2022, 10, 01), duration: 0.5, location: 'Mataró', image: 'https://www.plusultra.es/blog/assets/multimedia/2019/01/test-course-navette.jpg' },
    // Past meetings
    { name: "Pañuelo PAST", description: 'This is a description 1', date: new Date(2021, 10, 01), duration: 2, location: 'Bellaterra', image: 'https://phantom-marca.unidadeditorial.es/67cb48c6a45d52e6fe2d19b47b843b65/resize/1300/assets/multimedia/imagenes/2020/04/13/15867939884352.jpg' },
    { name: "Arañan PAST", description: 'This is a description 2', date: new Date(2021, 10, 01), duration: 1, location: 'Barcelona', image: 'https://projectes.fundesplai.org/cochabambasantjoandespi/wp-content/uploads/sites/16/2015/03/ARA%C3%91A.jpg' },
    { name: "Matar PAST", description: 'This is a description 3', date: new Date(2021, 10, 01), duration: 3, location: 'Amposta', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/USMC-080816-M-9999S-025.jpg/220px-USMC-080816-M-9999S-025.jpg' },
    { name: "Marco Polo PAST", description: 'This is a description 4', date: new Date(2021, 10, 01), duration: 2, location: 'Matadepera', image: 'https://www.wikihow.com/images_en/thumb/1/1f/Play-Marco-Polo-Step-1-Version-5.jpg/v4-460px-Play-Marco-Polo-Step-1-Version-5.jpg.webp' },
    { users:[users[0]], name: "Escondite PAST", description: 'This is a description 5', date: new Date(2021, 10, 01), duration: 1, location: 'Ribes', image: 'https://www.conmishijos.com/uploads/juegos/juegossiempre5.jpg' },
    { users:[users[0]], name: "Course Navette PAST", description: 'This is a description 6', date: new Date(2021, 10, 01), duration: 0.5, location: 'Mataró', image: 'https://www.plusultra.es/blog/assets/multimedia/2019/01/test-course-navette.jpg' },

  ];
  
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/server";

console.log('Seeding database...');

mongoose
  .connect(MONGO_URI, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
  })
  .then(() => {
    return User.deleteMany()
  })
  .then(() => { 
      return User.insertMany(users, (error, items) => {
        if (error) {
          console.log('An error happened:', error);
          return;
        }
        console.log('The amount of meetings are: ', items.length);
      });
  })
  .then(() => {
    return Meeting.deleteMany()
  })
  .then(() => { 
      return Meeting.insertMany(meetings, (error, items) => {
        if (error) {
          console.log('An error happened:', error);
          return;
        }
        console.log('The amount of meetings are: ', items.length);
      });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
      //mongoose.connection.close(); // MongoNotConnectedError: MongoClient must be connected to perform this operation (WTF??)
      console.log("Closed the DB connection");
  }); 