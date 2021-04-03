import React from "react";
import { contactsTestData } from "../contactsTestData";
import { RuxAccordion } from "@astrouxds/rux-accordion/rux-accordion.js";
import { RuxStatus } from "@astrouxds/rux-status/rux-status.js";
import { RuxTabs } from "@astrouxds/rux-tabs/rux-tabs.js";

function ContactsTable() {
  return (
    <div>
      <rux-tabs id="tab-set-id-1">
        <rux-tab id="tab-id-1">Contacts</rux-tab>
        <rux-tab id="tab-id-2">Equipment</rux-tab>
      </rux-tabs>
      <rux-tab-panels aria-labelledby="tab-set-id-1">
        <rux-tab-panel aria-labelledby="tab-id-1">
          <h1>Current Contacts</h1>
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
                  <span slot="label">
                    <rux-status status={contact.contactStatus}></rux-status>
                  </span>
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
        </rux-tab-panel>
        <rux-tab-panel aria-labelledby="tab-id-2">
          Equipment panel coming soon...
        </rux-tab-panel>
      </rux-tab-panels>
    </div>
  );
}

export default ContactsTable;
