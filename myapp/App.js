const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
/* 
app.get("/contact", (req, res) => {
  res.send("<h1>Contact page</h1>");
});
 */

const add = (a, b) => {
  return a + b;
};
const logName = (fn) => {
  return (...args) => {
    console.log(`Call function "${fn.name}"`);
    return fn(...args);
  };
};

// const wrappedAdd = logName(add);
// const result = wrappedAdd(2, 3);
// console.log(result);

const integerArgs = (fn) => {
  return (...args) => {
    if (args.some((arg) => !Number.isInteger(arg))) {
      throw new Error(`args have to be integers`);
    }
    return fn(...args);
  };
};

const wrappedAdd = integerArgs(add);
const result = wrappedAdd("2", 3);
console.log(result);
