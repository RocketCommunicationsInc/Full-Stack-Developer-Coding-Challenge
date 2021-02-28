<template>
    <div class="flex flex-col overflow-hidden">
        <template v-if="!loading">
            <template v-if="!error">
                <div class="bg-gray-600 pb-8">
                    <ul class="flex items-center justify-between w-1/3 m-auto">
                        <li class="mr-4">
                            <base-badge
                                label="Contacts"
                                :value="totalContacts"
                            />
                        </li>

                        <li
                            v-for="(groupedContacts, state) in contactsGroupedByState"
                            :key="state"
                            class="mr-4"
                        >
                            <base-badge
                                :label="state"
                                :value="groupedContacts.length"
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
            </template>
            <div
                v-else
                class="p-12 flex justify-center items-center"
            >
                {{ error }}
                <rux-button
                    class="ml-4"
                    @click.native="fetchContacts"
                >
                    Retry
                </rux-button>
            </div>
        </template>
        <div
            v-else
            class="p-12"
        >
            <base-spinner class="m-auto w-16 h-16" />
        </div>
    </div>
</template>

<script>
import client from "../../utils/client";
import RuxTable from "@/components/RuxTable";
import BaseBadge from "@/components/BaseBadge";
import { groupBy } from 'lodash'
import BaseSpinner from "@/components/BaseSpinner";
import RuxButton from "@/components/RuxButton";

export default {
name: "PanelContacts",
    components: {RuxButton, BaseSpinner, BaseBadge, RuxTable},
    data() {
        return {
            loading: true,
            error: null,
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
    computed: {
        totalContacts() {
            return this.contacts.length
        },
        contactsGroupedByState() {
            return groupBy(this.contacts, contact => contact.contactState);
        },


    },
    created() {
        this.fetchContacts()
    },
    methods: {
        async fetchContacts() {
            this.error = null
            this.loading = true;
            client.get('/contacts')
                .then(r => {
                    this.contacts = r.data.data
                })
                .catch(() => {
                    this.error = 'Unable to fetch Contact data'
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
