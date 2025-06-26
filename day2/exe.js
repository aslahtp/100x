function sayHello(name, callback) {
    console.log("Hello " + name);
    callback(); // call the function passed as a callback
  }
  
  sayHello("Aslah", function () {
    console.log("This is the callback.");
  });
  