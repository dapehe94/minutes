<template>
    <div>
        <h1>Hi {{auth.user.name}}!</h1>
        <p>You're logged in</p>

        <h2>All users in database:</h2>
        <em v-if="users.loading">Loading users...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>        
        <ul v-if="users.items">
            <li v-for="user in users.items" :key="user.id">
                {{user.name}}
                <span v-if="user.deleting"><em> - Deleting...</em></span>
                <span v-else-if="user.deleteError" class="text-danger"> - ERROR: {{user.deleteError}}</span>
                <span v-else> - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>
                <br/><small v-for="company in user.companies" :key="company.id" class="text-reset font-weight-lighter">{{ company.name }} </small>
            </li>
        </ul>

        <h3>Meeting minutes where you are an attendee:</h3>
        <em v-if="minutesbyattendees.loading">Loading minutes...</em>
        <span v-if="minutesbyattendees.error" class="text-danger">ERROR: {{minutesbyattendees.error}}</span>        
        <ul v-if="minutesbyattendees.items">
            <li v-for="minute in minutesbyattendees.items" :key="minute.id">
                <router-link :to="{name: 'ShowMinute', params: {id: minute.id}}">{{minute.subject}}</router-link> - <small class="text-reset font-weight-lighter">{{ minute.company.name }} </small> - {{ minute.author.name }}
                <br/><small v-for="attendee in minute.attendees" :key="attendee.id" class="text-reset font-weight-lighter">{{ attendee.name }} </small>
            </li>
        </ul>

        <h3>Meeting minutes where you are an author:</h3>
        <em v-if="minutesbyauthor.loading">Loading minutes...</em>
        <span v-if="minutesbyauthor.error" class="text-danger">ERROR: {{minutesbyauthor.error}}</span>        
        <ul v-if="minutesbyauthor.items">
            <li v-for="minute in minutesbyauthor.items" :key="minute.id">
                <router-link :to="{name: 'ShowMinute', params: {id: minute.id}}">{{minute.subject}}</router-link> - <small class="text-reset font-weight-lighter">{{minute.company.name}}</small> - {{ minute.author.name }}
                <br/><small v-for="attendee in minute.attendees" :key="attendee.id" class="text-reset font-weight-lighter">{{ attendee.name }} </small>
            </li>
        </ul>

        <h3>All Meeting minutes:</h3>
        <em v-if="minutes.loading">Loading minutes...</em>
        <span v-if="minutes.error" class="text-danger">ERROR: {{minutes.error}}</span>        
        <ul v-if="minutes.items">
            <li v-for="minute in minutes.items" :key="minute.id">
                <router-link :to="{name: 'ShowMinute', params: {id: minute.id}}">{{minute.subject}}</router-link> - <small class="text-reset font-weight-lighter">{{minute.company.name}}</small> - {{ minute.author.name }}
            </li>
        </ul>
    </div>	
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState({
            auth: state => state.auth,
            users: state => state.user.all,
            minutes: state => state.minute.all,
            minutesbyattendees: state => state.minute.byattendee,
            minutesbyauthor: state => state.minute.byauthor
        }),
        user_id: function() {
            return this.auth.user._id
        }        
    },
    created () {
        this.getAllUsers();
        this.getAllMinutes();
        this.getAllByAttendeeId(this.user_id);
        this.getAllByAuthorId(this.user_id);
    },
    methods: {
        ...mapActions('user', {
            getAllUsers: 'getAll',
            deleteUser: 'delete'
        }),
        ...mapActions('minute', {
            getAllMinutes: 'getAll',
            getAllByAttendeeId: 'getAllByAttendeeId',
            getAllByAuthorId: 'getAllByAuthorId'
        })        
    }
};
</script>