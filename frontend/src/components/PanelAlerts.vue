<template>
    <div class="overflow-auto">
        <template v-if="!loading">
            <template v-if="!error">
                <rux-table
                    class=""
                    :columns="columns"
                    :data="alerts"
                />
            </template>
            <div
                v-else
                class="p-12 flex justify-center items-center"
            >
                {{ error }}
                <rux-button
                    class="ml-4"
                    @click.native="fetchAlerts"
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
import BaseSpinner from "@/components/BaseSpinner";
import RuxButton from "@/components/RuxButton";

export default {
    name: "PanelAlerts",
    components: {RuxButton, BaseSpinner, RuxTable},
    data() {
        return {
            error: null,
            loading: false,
            columns: [
                {
                    name: 'errorMessage',
                    label: 'Message',
                    sort: false
                },
                {
                    name: 'errorCategory',
                    label: 'Category',
                    sort: true
                },
                {
                    name: 'errorTime',
                    label: 'Time',
                    format: 'date',
                    sort: false
                },
            ],
            alerts: []
        }
    },
    created() {
        this.fetchAlerts()
    },
    methods: {
        async fetchAlerts() {
            this.error = null
            this.loading = true;
            client.get('/alerts')
            .then(r => {
                this.alerts = r.data.data
            })
            .catch(() => {
                this.error = 'Unable to fetch Alerts'
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
