<template>
    <div
        id="app"
        class="bg-gray-500 dark-theme overflow-hidden h-screen"
    >
        <rux-global-status-bar
            appname="Hello"
            class="w-full   "
        />
        <div class="h-screen flex overflow-hidden bg-white">
            <div class="flex flex-shrink-0">
                <div class="flex flex-col w-96 pt-5 pb-4 bg-gray-600">
                    <pane-alerts class="bg-blue-400" />
                </div>
            </div>
            <!-- Main column -->
            <div class="flex flex-col w-0 flex-1 overflow-hidden">
                <pane-contacts class="bg-blue-200" />
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
