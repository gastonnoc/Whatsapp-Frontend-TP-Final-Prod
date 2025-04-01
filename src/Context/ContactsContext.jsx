import { createContext, useState } from "react";
import contacts from "../../Data/ContactData";
import { v4 as uuidv4 } from "uuid";

const ContactsContext = createContext();

const ContactsContextProvider = ({ children }) => {
    const [contacts_state, setContactsState] = useState(contacts);

    const getContactById = (contact_id) => {
        return contacts_state.find((contact) => String(contact.id) === String(contact_id));
    };

    const addNewMessageToContact = (text, contact_id) => {
        const new_message = {
            author: "Yo",
            text: text,
            id: uuidv4(),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
        };

        setContactsState((prev_contacts_state) =>
            prev_contacts_state.map((contact) =>
                String(contact.id) === String(contact_id)
                    ? { ...contact, messages: [...contact.messages, new_message] }
                    : contact
            )
        );
    };

    const addNewChat = (username) => {
        if (!username.trim()) return null;
    
        const newChat = {
            id: uuidv4(),
            name: username,
            image: "/default-user.jpg",
            status: "Disponible",
            messages: [],
        };
    
        setContactsState((prev_contacts_state) => [...prev_contacts_state, newChat]);
    
        /* return newChat.id; */
    };
    

    return (
        <ContactsContext.Provider value={{ contacts_state, getContactById, addNewMessageToContact, addNewChat }}>
            {children}
        </ContactsContext.Provider>
    );
};

export { ContactsContext, ContactsContextProvider };
