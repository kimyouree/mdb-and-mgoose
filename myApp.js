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
  {name: "John", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Johnnathan", age: 76, favoriteFoods: ["roast chicken"]},
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
// createManyPeople(arrayOfPeople)

// 5/12) Use model.find() to search your database
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, person) {
    if (err) {
      return console.error(err);
    }
    done(null, person);
    
  })
};

// 6/12) Use model.findOne() to return a single matching document from your db
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, person) {
    if (err) {
      return console.error(err);
    }
    done(null, person);
  })
};

// 7/12) Use model.findById() to search your database by _id
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, person) {
    if (err) {
      return console.error(err);
    }
    done(null, person);
  })
};

// 8/12) Perform classic updates by running Find, Edit, then Save
// to summarize, using the `Model.update()` method directly from Mongoose's
// low-level MongoDB driver provides some benefits, such as bulk editing
// multiple documents. However, it has limitations such as not returning the
// updated document and bypassing model validations, which can make it 
// difficult to work with and maintain data integrity.
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger"
  // find person by _id findById(id, callback function):
  Person.findById(personId, function(err, person) {
    if (err) {
      console.error(err);
    }
    // Array.push() method to add "hamburger" to the list
    // of a person's favorite foods
    person.favoriteFoods.push(foodToAdd);

    // and inside the callback, save() the updated Person
    person.save((err, updatedPerson) => {
      if (err) {
        console.log(err);
      }
      done(null, updatedPerson);
    })
  })

};

// 9/12) Perform new updates on a Document using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {
      name: personName  // search query
    },
    {
      age: ageToSet  // field:values to update
    },
    {
      new: true  // return updated doc
    },
    function(err, updatedDoc) {
      if(err) {
        console.error(err);
      }
      done(null, updatedDoc);
    }
  )
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

  - do all mongoose methods take a callback function as a final parameter?
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
