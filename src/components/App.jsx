import React from "react";
import { useState, useEffect  } from "react";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import { nanoid } from 'nanoid'

export default function App() {
  
  const [contacts, setContact] = useState(
    () => JSON.parse(window.localStorage.getItem('data')) ?? []
  )

  const[filter, setFilter] = useState('')

  const handleInputChange = evt => {
    setFilter(evt.currentTarget.value);
  }


  const formSubmitHandler = data =>{
    
    data.id = nanoid()
    console.log(data)

    const checkContact = contacts.find(contact => contact.name === data.name)
    
    checkContact 
      ? alert(`${data.name} is already in the contacts`)
      : setContact( [...contacts, data])


  }

  const onRemoveContact = (contactId) => {
    setContact(prevContact =>
      prevContact.filter(contact => contactId !== contact.id)
    )
  }

  const onFilterContact = () => {
    const contactToLowerCase = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(contactToLowerCase)
    )
  }

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(contacts))
    console.log(contacts)
  }, [contacts]);



  const filterContact = onFilterContact()

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: "column",
          fontSize: 20,
          color: '#010101'
        }}
      >

          <div>
            <h1 style={{textAlign: "center"}}>
              Phonebook
            </h1>

              <ContactForm  
                onSubmit = {formSubmitHandler}
              />

            {
                filterContact.length > 0 &&
                
                (
                <div>
                  <h2>Contacts</h2>

                <Filter 
                  formSubmitHandler= {this.handleInputChange}
                  filter={this.state.filter}
                />

                <ContactList
                  onRemoveContact = {this.onRemoveContact}
                  filteredContacts = {filterContact}
                />
                </div>
                )
              }
            

          </div>
      </div>
    );
}

// hope last 