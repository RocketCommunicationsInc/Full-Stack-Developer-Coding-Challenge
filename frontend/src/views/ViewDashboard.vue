<template>
    <div
        id="app"
        class="bg-tertiary-800 dark-theme h-screen"
    >
        <rux-global-status-bar
            appname="GRM Dashboard"
            version="1.0.0 Alpha"
        >
            <rux-clock />
            <rux-button @click.native="logOut">
                Logout
            </rux-button>
        </rux-global-status-bar>

        <main class="bg-tertiary-800">
            <div class="flex flex-col md:flex-row p-4">
                <div class="w-full md:w-1/3 mr-4 panel">
                    <base-panel
                        class="h-full"
                        title="Alerts"
                    >
                        <panel-alerts />
                    </base-panel>
                </div>

                <div class="w-full md:w-2/3 panel">
                    <base-panel
                        title="Contacts"
                        class="h-full"
                    >
                        <panel-contacts />
                    </base-panel>
                </div>
            </div>
        </main>
    </div>
</template>

<script>

import PanelAlerts from "@/components/PanelAlerts";
import PanelContacts from "@/components/PanelContacts";
import BasePanel from "@/components/BasePanel";
import RuxButton from "@/components/RuxButton";
export default {
    name: 'ViewDashboard',
    components: {RuxButton, BasePanel, PanelContacts, PanelAlerts},
    methods: {
        async logOut() {
            await this.$store.dispatch('auth/logOut');
            this.$router.replace({name: 'Login'})
        }
    },
}
</script>

<style scoped>
.panel {
    height: calc(100vh - 150px);
    overflow: hidden;
}

</style>

