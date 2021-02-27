<template>
    <div class="">
        <div class="bg-gray-600 ">
            <ul class="flex items-center justify-between w-1/3 m-auto">
                <li class="mr-4">
                    <base-badge
                        label="Contacts"
                        value="23"
                    />
                </li>

                <li class="mr-4">
                    <base-badge
                        label="Failed"
                        value="9"
                    />
                </li>

                <li>
                    <base-badge
                        label="Executing"
                        value="3"
                    />
                </li>
            </ul>
        </div>
        <div class="">
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
