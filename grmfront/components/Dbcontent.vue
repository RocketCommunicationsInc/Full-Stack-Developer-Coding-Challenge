<template>
    <div>
        <b-container fluid>
    <b-row>
        <b-col class="dbcol" cols="5">
            <tr>
                <h1>Alerts ({{alerts.length}}) </h1>
            </tr>
            <table class="rux-table">
                <tr class="rux-table__column-head">
                    <th>Message</th>
                    <th> Category <div style="display: inline-block;" @click="sortAlertsAlpha"><b-icon-sort-alpha-down></b-icon-sort-alpha-down></div></th>
                    <th>Time</th>
                </tr>
                <tr v-for="alert in alerts" :key="alert"><td>{{ alert['errorMessage'] }}</td><td>{{ alert['errorCategory'] }}</td><td>{{ convertalerttime(alert['errorTime']) }}</td></tr>
            </table>
            <div class="loadingprogress" v-if="loadingalert"><rux-progress></rux-progress></div>
        </b-col>
        <b-col class="dbcol" cols="7">
            <tr>
                <h1>Contacts ({{contacts.length}}) | <span style="font-size: 75%">Total Contact States ({{states.length }})</span></h1><br>
            </tr>
            <table class="rux-table">
                <tr class="rux-table__column-head">
                    <th>Name <div style="display: inline-block;" @click="sortContactsAlpha"><b-icon-sort-alpha-down></b-icon-sort-alpha-down></div></th>
                    <th>Status</th>
                    <th>Begin Timestamp</th>
                    <th>End Timestamp</th>
                </tr>
                <tr v-for="contact in contacts" :key="contact"><td>{{ contact['contactName'] }}</td><td>{{ contact['contactStatus'] }}</td><td>{{ converttime(contact['contactBeginTimestamp']) }}</td><td>{{ converttime(contact['contactEndTimestamp']) }}</td></tr>
            </table>
        <div class="loadingprogress" v-if="loadingcontact"><rux-progress></rux-progress></div>
        </b-col>
        </b-row>
    </b-container>
    </div>
</template>


<script>
import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js'
import { RuxIcon } from '@astrouxds/rux-icon/rux-icon.js';
import { RuxProgress } from '@astrouxds/rux-progress/rux-progress.js';
import moment from 'moment'

export default {
  name: 'Dbcontent',
  data() {
      return{
          alerts: [],
          contacts: [],
          user: [],
          states: [],
          loadingalert: true,
          loadingcontact: true,
      }
  },
  head() {
      return {
          bodyAttrs: {
              class: "dark-theme"
          }
      }
  },
  methods: {
      processAlerts(data){
          this.loadingalert = false
          this.alerts = data['alerts']
      },
      processContacts(data){
          this.loadingcontact = false
          this.contacts = data['contacts']
            for(let i=0; i < data['contacts'].length; i++){
              if(this.states.includes(data['contacts'][i].contactState)){   
              }
              else{
                  this.states.push(data['contacts'][i].contactState) 
              }
          }
      },
      sortContactsAlpha(){
          this.contacts.sort((a, b) => {
                let fa = a.contactName.toLowerCase()
                let fb = b.contactName.toLowerCase()
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            })
      },
      sortAlertsAlpha(){
          this.alerts.sort((a, b) => {
                let fa = a.errorCategory.toLowerCase()
                let fb = b.errorCategory.toLowerCase()
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            })
      },     
      errorNotify(){

      },
      converttime(timeobj){
          return moment(timeobj).utc().format('HH:mm:ss')
      },
      convertalerttime(timeobj){
          return moment.unix(timeobj).utc().format('HH:mm:ss')
      }
  },
  mounted(){
      if(!window.localStorage.getItem("authtoken")){
          window.location.href="./"
      }
      try{
                const fetchbody = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'Application/json',
                        'authtoken': window.localStorage.getItem("authtoken")},
                    body:  JSON.stringify({status: "get"})
                    }
                fetch('/getalerts', fetchbody).then((response) => response.json()).then(
                    data => (
                        this.processAlerts(data)
                    )
                ).catch(error => 
                    this.errorNotify()
                );
                }
                catch(e) {
                    this.errorNotify()
                }
        try{
            const fetchbody = {
                method: "POST",
                headers: {
                    'Content-Type': 'Application/json',
                    'authtoken': window.localStorage.getItem("authtoken")},
                body:  JSON.stringify({status: "get"})
                }
            fetch('/getcontacts', fetchbody).then((response) => response.json()).then(
                data => (
                    this.processContacts(data)
                )
            ).catch(error => 
                this.errorNotify()
            );
            }
            catch(e) {
                this.errorNotify()
            }
  }
}
</script>

<style scoped>
.dbcol {
    overflow: scroll;
    height: calc(100vh - 140px);
    width: 100%;
}

th {
    position: sticky;
    top: 0;
    z-index: 2;
}

</style>

<style>
.container-fluid{

    height: calc(100vh - 140px);
    margin-top: 20px;
    position: fixed;
    width: 100%;
}

.loadingprogress {
    margin-top: 100px;
    width: 100%;
    display: inline-block;
}

</style>