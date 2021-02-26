<template>
    <div>
        Contacts
        <rux-table
            :columns="columns"
            :data="contacts"
        />
    </div>
</template>

<script>
import client from "../utils/client";
import RuxTable from "@/components/RuxTable";

export default {
name: "PaneContacts",
    components: {RuxTable},
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
