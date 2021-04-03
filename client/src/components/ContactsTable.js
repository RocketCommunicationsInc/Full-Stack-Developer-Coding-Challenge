import React from "react";
import { contactsTestData } from "../contactsTestData";
import { RuxAccordion } from "@astrouxds/rux-accordion/rux-accordion.js";

function ContactsTable() {
  return (
    <div>
      <rux-accordion disabled>
        <span slot="label">Name</span>
        <span slot="label">GS</span>
        <span slot="label">Equipment String</span>
        <span slot="label">Status</span>
        <span slot="label">AOS – LOS</span>
      </rux-accordion>
      {contactsTestData.map((contact) => {
        return (
          <div key={contact.contactId}>
            <rux-accordion>
              <span slot="label">{contact.contactName}</span>
              <span slot="label">{contact.contactGround}</span>
              <span slot="label">{contact.contactEquipment}</span>
              <span slot="label">{`${contact.contactState} (Step: ${contact.contactStep})`}</span>
              <span slot="label">{`${new Date(
                contact.contactBeginTimestamp
              )}-${new Date(contact.contactEndTimestamp)}`}</span>
              <span slot="content">{contact.contactDetail}</span>
            </rux-accordion>
          </div>
        );
      })}
    </div>
  );
}

export default ContactsTable;
