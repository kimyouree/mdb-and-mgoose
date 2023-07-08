require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
console.log(process.env.MONGO_URI);

// 2/12: Create a Model
const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	age: Number,
	favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

// 3/12: Create and Save a Record of a Model
const createAndSavePerson = (done) => {
	// what is a constructor in this context: `Person`
	// pass it some values to create
	// and instance, `person`.
	// Pass to the constructor an object having the fields with types conforming to the
	// ones in the `personSchema`.
	let jeremyBerimy = new Person({
		name: "Jeremy Berimy",
		age: 1,
		favoriteFoods: ["time", "bananas"],
	});

	// Then, call the method `document.save()` on the returned document instance.
	// the `save()` method returns a promise. If `save()` succeeds, the promise resolves
	// to the document that was saved.
	jeremyBerimy.save(function (err, data) {
		// ...do your stuff here...
		// Pass it to a callback using the Node convention. This is a common pattern; all the following
		// CRUD methods take a callback function like this as the last argument.
		// what's `the Node convention` in this context?
		if (err) {
			return console.error(err);
		}
		console.log(`this is data: ${data}`);
		done(null, data);
	});
};

// 4/12) Create many People with `Model.create()`
const arrayOfPeople = [
	{ name: "John", age: 74, favoriteFoods: ["Del Taco", "wine"] },
	{ name: "Johnnathan", age: 76, favoriteFoods: ["roast chicken"] },
	{ name: "Robert", age: 78, favoriteFoods: ["wine"] },
];
const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, function (err, people) {
		if (err) {
			return console.error(err);
		}
		console.log(`This is people: ${people}`);
		done(null, people);
	});
};
// createManyPeople(arrayOfPeople);

// 5/12) Use model.find() to search your database
const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, function (err, person) {
		if (err) {
			return console.error(err);
		}
		done(null, person);
	});
};

// 6/12) Use model.findOne() to return a single matching document from your db
const findOneByFood = (food, done) => {
	Person.findOne({ favoriteFoods: food }, function (err, person) {
		if (err) {
			return console.error(err);
		}
		done(null, person);
	});
};

// 7/12) Use model.findById() to search your database by _id
const findPersonById = (personId, done) => {
	Person.findById(personId, function (err, person) {
		if (err) {
			return console.error(err);
		}
		done(null, person);
	});
};

// 8/12) Perform classic updates by running Find, Edit, then Save
// to summarize, using the `Model.update()` method directly from Mongoose's
// low-level MongoDB driver provides some benefits, such as bulk editing
// multiple documents. However, it has limitations such as not returning the
// updated document and bypassing model validations, which can make it
// difficult to work with and maintain data integrity.
const findEditThenSave = (personId, done) => {
	const foodToAdd = "hamburger";
	// find person by _id findById(id, callback function):
	Person.findById(personId, function (err, person) {
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
		});
	});
};

// 9/12) Perform new updates on a Document using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
	const ageToSet = 20;
	Person.findOneAndUpdate(
		{
			name: personName, // search query
		},
		{
			age: ageToSet, // field:values to update
		},
		{
			new: true, // return updated doc
		},
		function (err, updatedDoc) {
			if (err) {
				console.error(err);
			}
			done(null, updatedDoc);
		}
	);
};

// 10/12) Delete one document using model.findByIdAndRemove
const removeById = (personId, done) => {
	Person.findByIdAndRemove({ _id: personId }, (err, removedDoc) => {
		if (err) {
			console.error(err);
		}
		console.log("removedDoc: ", removedDoc);
		done(null, removedDoc);
	});
};

// 11/12 Delete many documents with model.remove()
// Modify the `removeManyPeople` function to delete all the
// people whose name is within the variable `nameToRemove`,
// using `Model.remove()`. Pass it (the `nameToRemove`) to a
// query document with the `name` field set, and a callback.
// ** `query document` in this context is the Model record
// you're searching for: Person.findByIdAndRemove(...) is the
// query document, and we are passing `nameToRemove` to it.
// Technically, the query document is not the model record
// itself, rather it refers to a document or object that specifies
// the criteria for querying the database.
const removeManyPeople = (done) => {
	const nameToRemove = "Mary";
	Person.remove({ name: nameToRemove }, (err, personRemoved) => {
		if (err) {
			console.error(err);
		}
		done(null, personRemoved);
	});
};

// 12/12) Chain search query helpers to narrow search results
// Modify the `queryChain()` function to find people who like
// the food specified by the variable named `foodToSearch`.
// Sort them by `name`, limit the results to two documents, and
// hide their age. Chain `.find(), sort(), limit(), select()`,
// and then `.exec()`. Pass the `done(err, data)` callback to `exec()`.

// Note: If you don't pass the callbacks as the last argument to
// Model.find() (or to the other search methods), the query is not executed.
// You can store the query in a variable for later use. this kind of
// object enables you to build up a query using chaining syntax. The
// actual db search is executed when you finally chain the method
// `exec()`. You always need to pass your callback to this last
// method. There are many query helpers, here we'll use the most
// commonly used.
// ** Basically, when using Mongoose, documents can be retrieved using
// `helpers`. Ever model method that accepts query conditions can
// be executed by the means of a `callback` or the `exec` method.

/**
 * callback:
 * User.findOne({ name: 'blada' }, function(err, user) {
 * 		// ...
 * });
 *
 * exec:
 * User
 * 		.findOne({ name: 'blada' })
 * 		.exec(function (err, user) {
 * 			// ...
 * 		})
 */

// Therefore, when you don't pass a callback you can build a query
// and eventually execute it.
const queryChain = (done) => {
	const foodToSearch = "burrito";
	Person.find({ favoriteFoods: foodToSearch })
		.sort({ name: 1 })
		.limit(2)
		.select("-age")
		.exec(function (err, person) {
			if (err) {
				console.error(err);
			}
			done(null, person);
		});
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
