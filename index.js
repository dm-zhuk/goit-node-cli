import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
} from "./contacts.js";

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
      const allContacts = await listContacts();
      console.log(allContacts);
      break;

    case "get":
      const contactId = await getContactById(id);
      console.log(contactId);
      break;

    case "add":
      const newContact = await addContact(data);
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log(removedContact);
      break;

    case "update":
      const updateContact = await updateContactById(id, data);
      console.log(updateContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);

// invokeAction({ action: "get", id: "qdggE76Jtbfd9eWJHrssH" });

// invokeAction({ action: "get", id: "qdggE76Jtbfd9eWJHrssz" });

// invokeAction({ action: "remove", id: "qdggE76Jtbfd9eWJHrssH" });
