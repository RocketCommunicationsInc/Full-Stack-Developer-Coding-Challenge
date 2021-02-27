<template>
    <div class="flex flex-col overflow-hidden">
        <div class="bg-gray-600 pb-8">
            <ul class="flex items-center justify-between w-1/3 m-auto">
                <li class="mr-4">
                    <base-badge
                        label="Contacts"
                        :value="totalContacts"
                    />
                </li>

                <li class="mr-4" v-for="(contacts, state) in contactsGroupedByState" :key="state">
                    <base-badge
                        :label="state"
                        :value="contacts.length"
                    />
                </li>
            </ul>
        </div>
        <div class="overflow-auto">
            <rux-table
                class=""
                :columns="columns"
                :data="contacts"
            />
        </div>
    </div>
</template>

<script>
import client from "../utils/client";
import RuxTable from "@/components/RuxTable";
import BaseBadge from "@/components/BaseBadge";
import { groupBy } from 'lodash'

export default {
name: "PaneContacts",
    components: {BaseBadge, RuxTable},
    data() {
        return {
            loading: false,
            contacts: [],
            columns: [
                {
                    name: 'contactName',
                    label: 'Name',
                    sort: true
                },
                {
                    name: 'contactStatus',
                    label:' Status'
                },
                {
                    name: 'contactBeginTimestamp',
                    label: 'Begin',
                    format: 'date'
                },
                {
                    name: 'contactEndTimestamp',
                    label:' End',
                    format: 'date'
                }
            ],
        }
    },
    created() {
        this.fetchContacts()
    },
    computed: {
        totalContacts() {
            return this.contacts.length
        },
        contactsGroupedByState() {
            return groupBy(this.contacts, contact => contact.contactState);
        },


    },
    methods: {
        async fetchContacts() {
            this.loading = true;
            client.get('/contacts')
                .then(r => {
                    this.contacts = r.data.data
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    this.loading = false
                })
        }
    },
}
</script>

<style scoped>

</style>
