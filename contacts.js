import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateContacts = (allContacts) =>
  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

export async function listContacts() {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(allContacts);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);

  return result || null;
}

export async function addContact(data) {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), ...data };

  allContacts.push(newContact);

  await updateContacts(allContacts);

  return newContact;
}

export async function removeContact(id) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [result] = allContacts.splice(index, 1);

  await updateContacts(allContacts);

  return result || null;
}

export async function updateContactById(id, data) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  allContacts[index] = { ...allContacts[index], ...data };

  await updateContacts(allContacts);

  return allContacts[index];
}
