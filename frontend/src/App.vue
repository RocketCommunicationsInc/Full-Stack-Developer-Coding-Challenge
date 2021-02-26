<template>
    <div
        id="app"
        class="bg-gray-500 dark-theme h-screen"
    >
        <rux-global-status-bar
            appname="Hello"
            class="w-full   "
        />
        <div class="bg-gray-500">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="col-span-1">
                    <pane-alerts></pane-alerts>
                </div>
                <div class="col-span-1 lg:col-span-2">
                    <pane-contacts></pane-contacts>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import PaneAlerts from "@/PaneAlerts";
import PaneContacts from "@/PaneContacts";
export default {
  name: 'App',
    components: {PaneContacts, PaneAlerts},
}
</script>

<style>

</style>
