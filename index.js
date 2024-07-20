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
      const allContacts = await cm.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const contactId = await cm.getContactById(id);
      console.log("Contact ID: ", contactId);
      break;

    case "add":
      const newContact = await cm.addContact(data);
      console.log("New contact: ", newContact);
      break;

    case "remove":
      const removedContact = await cm.removeContact(id);
      console.log("Removed contact: ", removedContact);
      break;

    case "update":
      const updateContact = await cm.updateContactById(id, data);
      console.log("Updated contact", updateContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction(options);
