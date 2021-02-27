<template>
    <div
        id="app"
        class="bg-tertiary-800 dark-theme h-screen"
    >
        <rux-global-status-bar
            appname="Hello"
            class="w-full   "

        >
            <rux-clock></rux-clock>
        </rux-global-status-bar>

        <main class="bg-tertiary-800">
            <div class="flex p-4">
                <div class="w-1/3 mr-4 panel">
                    <!--panel-->
                    <base-panel class="h-full" title="Sat 1">
                        <pane-alerts class="" />
                    </base-panel>
                </div>

                <div class="w-2/3 panel">
                    <base-panel title="Sat 2" class="h-full">
                        <pane-contacts />
                    </base-panel>
                </div>
            </div>
        </main>
    </div>
</template>

<script>

import PaneAlerts from "@/PaneAlerts";
import PaneContacts from "@/PaneContacts";
import BasePanel from "@/components/BasePanel";
export default {
  name: 'App',
    components: {BasePanel, PaneContacts, PaneAlerts},
}
</script>

<style scoped>
.panel {
    height: calc(100vh - 150px);
    overflow: hidden;
}

</style>

