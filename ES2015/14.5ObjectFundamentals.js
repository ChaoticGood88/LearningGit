//Same Keys and Values
const createInstructor = (firstName, lastName) => ({
    firstName,
    lastName
  });

  //Computed Property Names
  const favoriteNumber = 42;

const instructor = {
  firstName: "Colt",
  [favoriteNumber]: "That is my favorite!"
};

//Object Methods
const instructor = {
    firstName: "Colt",
    sayHi() {
      return "Hi!";
    },
    sayBye() {
      return `${this.firstName} says bye!`;
    }
  };

  //Creat Animal Function
  const createAnimal = (species, verb, noise) => {
    return {
      species,
      [verb]() {
        return noise;
      }
    };
  };