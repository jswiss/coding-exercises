<template>
  <div class="form-horizontal">
    <div class="form-group">
      <div class="col-sm-6">
        <label for="Date">Date</label>
        <input type="date"
          class="form-control"
          v-model="timeEntry.date"
          placeholder="Date"/>
      </div>
      <div class="col-sm-6">
        <label for="Hours">Hours</label>
        <input type="number"
          class="form-control"
          v-model="timeEntry.totalTime"
          placeholder="Hours"/>
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-12">
        <label for="Comment">Comment</label>
        <input type="text"
          class="form-control"
          v-model="timeEntry.comment"
          placeholder="Comment"/>
      </div>
    </div>
    <button class="btn btn-primary" @click="save()">Save</button>
    <button v-link="'/time-entries'" class="btn btn-danger">Cancel</button>
    <hr>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // We defulat the user object on the timeEntry to have some user details
        timeEntry: {
          user: {
            firstName: 'Josh',
            lastName: 'Swiss',
            email: 'swissjoshua@gmail.com',
            image: 'http://i.dailymail.co.uk/i/pix/2009/04/26/article-0-0047C492000004B0-476_233x423.jpg'
          }
        }
      }
    },
    methods: {
      save () {
        let timeEntry = this.timeEntry
        // we dispatch the timeEntry so it can be pushed onto the timeEntries array in the parent component
        this.$dispatch('timeUpdate', timeEntry)
        this.timeEntry = {}
      }
    }
  }
</script>