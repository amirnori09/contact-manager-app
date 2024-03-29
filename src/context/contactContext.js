import {createContext} from "react";

export const ContactContext = createContext({
    loading:false,
    setLoading:() => {},
    setContacts: () => {},
    setFilteredContacts:() => {},
    contacts: [],
    filltredContacts: [],
    contactQuery: {},
    groups: [],
    deleteContact: () => {},
    updateContact: () => {},
    createContact: () => {},
    contactSearch: () => {},
 });