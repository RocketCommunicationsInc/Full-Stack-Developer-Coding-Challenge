<template>
    <div
        id="app"
        class="bg-tertiary-800 dark-theme h-screen"
    >
        <rux-global-status-bar
            appname="Hello"
            class="w-full   "
        />
        <main class="bg-tertiary-800">
            <div class="grid grid-cols-8 gap-4 p-4 h-full overflow-hidden">
                <div class="col-span-3 panel">
                    <!--panel-->
                    <base-panel title="Sat 1">
                        <pane-alerts class="" />
                    </base-panel>
                </div>

                <div class="col-span-5 panel">
                    <base-panel title="Sat 2">
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
    overflow: auto;
}
</style>
