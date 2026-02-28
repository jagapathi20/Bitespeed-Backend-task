import { Contact } from "../entities/contact";
export const formatResponse = (primary: Contact, all: Contact[]) => {
    // Combine primary + secondary for data extraction
    const contacts = all.length > 0 ? all : [primary];
    
    const emails = Array.from(new Set(
        [primary.email, ...contacts.map(c => c.email)].filter(Boolean)
    )) as string[];

    const phoneNumbers = Array.from(new Set(
        [primary.PhoneNumber, ...contacts.map(c => c.PhoneNumber)].filter(Boolean)
    )) as string[];

    const secondaryContactIds = contacts
        .filter(c => c.linkPrecedence === "secondary")
        .map(c => c.id);

    return {
        contact: {
            primaryContatctId: primary.id,
            emails,
            phoneNumbers,
            secondaryContactIds
        }
    };
};