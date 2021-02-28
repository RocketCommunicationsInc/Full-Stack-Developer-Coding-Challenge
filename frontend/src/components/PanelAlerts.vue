<template>
    <div class="overflow-auto">
        <rux-table
            class=""
            :columns="columns"
            :data="alerts"
        />
    </div>
</template>

<script>
import client from "../../utils/client";
import RuxTable from "@/components/RuxTable";

export default {
    name: "PanelAlerts",
    components: {RuxTable},
    data() {
        return {
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
            this.loading = true;
            client.get('/alerts')
            .then(r => {
                this.alerts = r.data.data
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
