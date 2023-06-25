require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
console.log(process.env.MONGO_URI)

// 2/12: Create a Model
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

// 3/12: Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  // what is a constructor in this context: `Person`
  // pass it some values to create
  // and instance, `person`.
  // Pass to the constructor an object having the fields with types conforming to the
  // ones in the `personSchema`. 
  let jeremyBerimy = new Person({ name: "Jeremy Berimy", age: 1, favoriteFoods: ["time", "bananas"]});

  // Then, call the method `document.save()` on the returned document instance.
  // the `save()` method returns a promise. If `save()` succeeds, the promise resolves
  // to the document that was saved.
  jeremyBerimy.save(function(err, data) {
    // ...do your stuff here...
    // Pass it to a callback using the Node convention. This is a common pattern; all the following 
    // CRUD methods take a callback function like this as the last argument.
    // what's `the Node convention` in this context?
    if (err) {
      return console.error(err);
    }
    console.log(`this is data: ${data}`);
    done(null, data);

  })
};

// 4/12) Create many People with `Model.create()`
const arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) {
      return console.error(err);
    }
    console.log(`This is people: ${people}`)
    done(null , people);
  })
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
