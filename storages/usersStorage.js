const placeholderUsers = {
  0: {
    id: 0,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    age: 28,
    bio: "A software engineer who loves hiking and painting.",
  },
  1: {
    id: 1,
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.smith@example.com",
    age: 35,
    bio: "A marketing specialist with a passion for photography.",
  },
  2: {
    id: 2,
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.brown@example.com",
    age: 22,
    bio: "A student studying computer science, enjoys gaming and coding.",
  },
  3: {
    id: 3,
    firstName: "Diana",
    lastName: "Wilson",
    email: "diana.wilson@example.com",
    age: 40,
    bio: "An entrepreneur running a tech startup, loves networking and travel.",
  },
  4: {
    id: 4,
    firstName: "Eve",
    lastName: "Davis",
    email: "eve.davis@example.com",
    age: 30,
    bio: "A freelance graphic designer who enjoys creating digital art.",
  },
};

// Class to simulate database interaction
class UsersStorage {
  constructor() {
    this.storage = placeholderUsers;
    this.id = Object.keys(this.storage).length;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  deleteUser(id) {
    delete this.storage[id];
  }

  findByNameOrEmail(search) {
    const searchLower = search.toLowerCase();
    return Object.values(this.storage).filter((user) => {
      return (
        user.firstName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    });
  }
}
// Rather than exporting the class, we can export an instance of the class by instantiating it.
// This ensures only one instance of this class can exist, also known as the "singleton" pattern.
module.exports = new UsersStorage();
