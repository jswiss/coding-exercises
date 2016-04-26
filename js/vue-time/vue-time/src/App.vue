<template>
  <div id="wrapper">
    <nav class="navbar navbar-default">
      <div class="container">
        <a href="#" class="navbar-brand">
          <i class="glyphicon glyphicon-time"></i>
          Vue Time Tracker
        </a>
        <ul class="nav navbar-nav">
          <li><a v-link="'/home'">Home</a></li>
          <li><a v-link="'/time-entries'">Time Entries</a></li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="col-sm-3">
        <sidebar :time="totalTime"></sidebar>
      </div>
      <div class="col-sm-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar.vue'

  export default {
    components: { "sidebar": Sidebar },
    data () {
      return {
        // Start with the same value as our 1st entry. 
        // Hardcoded for now, to be changed later
        totalTime: 1.5
      }
    },
    events: {
      //Increment total time value based on the new time entry that is dispatched up
      timeUpdate (timeEntry) {
        this.totalTime += parseFloat(timeEntry.totalTime)
      },
      //Decrement total time when a time entry is deleted
      deleteTime (timeEntry) {
        this.totalTime -= parseFloat(timeEntry.totalTime)
      }
    }
  }
</script>

