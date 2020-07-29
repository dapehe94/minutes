<template>
	<div>
        <p><router-link :to="{name: 'ShowCompany', params: {id: minute.company._id}}" class="red">{{ minute.company.name }}</router-link></p>
		<h1>{{ minute.subject }}</h1>
        
		<span class="is-size-6 has-text-grey-light">
            <i class="fas fa-map-marker-alt"></i> {{ minute.location }}&nbsp;&nbsp;
            <i class="far fa-calendar-alt"></i> {{ minute.date | date }}&nbsp;&nbsp;
            <i class="far fa-clock"></i> {{ minute.starttime | time }} to {{ minute.endtime | time }}
        </span>

		<div v-if="minute.attendees">
			<a v-for="attendee in minute.attendees" :key="attendee._id">
                <b-tooltip :label="attendee.name" position="is-top" type="is-dark">
				    <avatar :username="attendee.name" :size="32" :customStyle="{'display': 'inline-flex'}"></avatar>
                </b-tooltip>
			</a>
		</div>

        <div class="minute-content is-size-5">
            <span v-html="minute.text"></span>
        </div>

		<span class="is-size-7 has-text-grey-light">created by {{ minute.author.name }} at {{ minute.created | datetime }}</span>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
const moment = require('moment')

export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapState({
            minute: state => state.minute.minute
        })
    },
    methods: {
        ...mapActions('minute', ['getById']),
        moment: function () {
            return moment();
        }        
    },
    created () {
        this.getById(this.$route.params.id)
    },
    filters: {
      date: function (date) {
        return moment(date).format('MMMM Do YYYY');
      },
      time: function (date) {
        return moment(date).format('hh:ss');
      },
      datetime: function (date) {
        return moment(date).format('MM/DD/YYYY hh:ss');
      }         
    }       
};
</script>