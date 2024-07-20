import * as cm from "./contacts.js"; // contacts module as 'cm'
import { program } from "commander";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const list = await cm.listContacts();
      console.table(list, ["id", "name", "email", "phone"]);
      break;

    case "get":
      const get = await cm.getContactById(id);
      console.log("Get contact by ID: ", get);
      break;

    case "add":
      const add = await cm.addContact(data);
      console.log("New contact created: ", add);
      break;

    case "remove":
      const remove = await cm.removeContact(id);
      console.log("Removed contact: ", remove);
      break;

    case "update":
      const update = await cm.updateContactById(id, data);
      console.log("Updated contact: ", update);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
