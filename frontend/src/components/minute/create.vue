<template>

<!-- <form @submit.prevent="handleSubmit">    -->

    <div class="columns">
            <div class="column is-9" id="createminute">                
                    <b-field :type="{ 'is-danger': submitted && errors.has('subject') }" :message="errors.first('subject')">
                        <b-input type="text" 
                                v-model="minute.subject" 
                                name="subject" 
                                placeholder="Meeting subject" 
                                size="is-medium"
                                v-validate="'required'">
                        </b-input>
                    </b-field>

                    <div class="field is-horizontal">
                        <b-field :type="{ 'is-danger': submitted && errors.has('date') }" :message="errors.first('date')">
                            <b-datepicker
                                v-model="minute.date"
                                name="date"
                                :month-names="monthNames"
                                :day-names="dayNames"
                                placeholder="Click to select date"
                                v-validate="'required'"
                                icon-pack="fas"
                                icon="calendar-plus">
                            </b-datepicker>
                        </b-field>  
                        &nbsp;
                        <b-field>
                            <b-timepicker
                                v-model="minute.starttime"
                                icon-pack="fas"
                                icon="clock"
                                :increment-minutes="30"
                                editable>
                            </b-timepicker>
                        </b-field>      
                        <b-field style="padding: 5px;">a</b-field>
                        <b-field>
                            <b-timepicker
                                v-model="minute.endtime"
                                icon-pack="fas"
                                icon="clock"
                                :increment-minutes="30"
                                :min-time="minEndTime"
                                editable>
                            </b-timepicker>
                        </b-field> 
                    </div>

                    <b-field :type="{ 'is-danger': submitted && errors.has('location') }" :message="errors.first('location')">
                        <b-input type="text" 
                                v-model="minute.location" 
                                name="location" 
                                icon-pack="fas"
                                icon="map-marker-alt"
                                placeholder="Address or room number/name">
                        </b-input>
                    </b-field>

                    <b-field :type="{ 'is-danger': submitted && errors.has('attendees') }" :message="errors.first('attendees')">
                        <b-taginput
                            v-model="minute.attendees"
                            :data="FilteredAttendees"
                            autocomplete
                            field="name"
                            name="attendees"
                            icon-pack="fas"
                            icon="user-plus"
                            type="is-white"
                            v-validate="'required'"
                            placeholder="Add attendee"
                            @typing="getFilteredTags">
                            <template slot-scope="props">    
                                <div class="media">                    
                                    <avatar :username="props.option.name" :size="32"></avatar>
                                    <div class="media-content">
                                        <h4>{{props.option.name}}</h4>
                                    </div>
                                </div>
                            </template>
                            <template slot="empty">
                                There are no users
                            </template>
                        </b-taginput>
                    </b-field>

                    <b-field :type="{ 'is-danger': submitted && errors.has('text') }" :message="errors.first('text')">
                        <ckeditor name="text" 
                            :editor="editor" 
                            v-model="minute.text" 
                            :config="configeditor" 
                            v-validate="'required'"></ckeditor>
                    </b-field>                   

                    <div class="field is-grouped">
                        <div class="control is-expanded">
                            <b-switch v-model="shared" size="is-small" true-value="Share with attendees" false-value="Private">{{ shared }}</b-switch>                  
                        </div>
                        <div class="control">
                            <b-button
                                @click.prevent="handleSubmit" 
                                icon-pack="fas" 
                                :loading="status.submiting" 
                                icon-left="save" 
                                type="is-primary" 
                                native-type="submit">Save</b-button>
                        </div>
                    </div>
            </div>

            <div class="column is-3">

                <b-field>
                    <b-input type="text" 
                            name="task"
                            v-model="taskinput" 
                            @keyup.native.enter="addTask" 
                            placeholder="Add a task" 
                            icon-pack="fas" 
                            icon="tasks">
                    </b-input>
                </b-field>


                <ul class="tasklist scrollable h365">

                    <li v-for="todo in todoList" class="taskitem">      

                        <div class="columns">

                            <div class="column is-1">
                                <b-checkbox v-model="todo.complete" v-bind:checked="todo.complete" size="is-small"></b-checkbox>
                            </div>

                            <div class="column is-10" style="overflow-wrap: break-word;">
                                <del v-if="todo.complete">{{ todo.name }}</del>
                                <span v-else>{{ todo.name }}</span>

                            
                                <b-dropdown v-model="todo.username" aria-role="list" class="is-right">

                                    <span slot="trigger">
                                        <template v-if="todo.username">
                                            <b-tooltip :label="todo.username"
                                                type="is-dark"
                                                position="is-top">
                                                    <avatar :username="todo.username" :size="20" class="pointer"></avatar>
                                            </b-tooltip>
                                        </template>
                                        <template v-else>
                                            <i class="fas fa-user-plus pointer"></i>
                                        </template>
                                    </span>

                                    <b-dropdown-item 
                                        v-for="taskuser in companyusers" 
                                        :data-taskuser="taskuser._id" 
                                        :key="taskuser._id"
                                        v-on:click="updateTask(todo, 'user', taskuser._id)" 
                                        :value="taskuser.name">
                                        <div class="media">                    
                                            <avatar :username="taskuser.name" :size="32"></avatar>
                                            <div class="media-content">
                                                {{taskuser.name}}
                                            </div>
                                        </div>                                
                                    </b-dropdown-item>                          
                                </b-dropdown>
                            
                                <span class="taskduedate pointer">
                                    {{ todo.duedate | daymonth }}
                                </span>
                            </div>

                            <div class="column is-1">
                                <span @click="deleteTask(todo)" class="pointer is-pulled-right">
                                    <b-tooltip label="Remove this task" type="is-dark" position="is-top">                        
                                        <i class="far fa-trash-alt has-text-danger"></i>
                                    </b-tooltip>
                                </span>
                            </div>

                        </div>
                    </li>

                </ul>

            </div>
         
    </div>
<!-- </form> -->
</template>

<script> 
import { mapState, mapActions } from 'vuex'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const moment = require('moment')

export default {    
    data () {
        const today = new Date()
        const min = new Date()
        min.setHours(today.getHours())
        min.setMinutes(today.getMinutes() / 60 + 30)
        return {
            minute: {
                subject: '',
                location: '',
                attendees: [],
                text: '',
                date: new Date(),
                starttime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes() / 60),
                endtime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes() / 60 + 30),
                company: '',
                author: ''
            },
            taskinput: '',
            minEndTime: min,
            shared: 'Share',
            editor: ClassicEditor,
            configeditor: {               
                toolbar: { 
                    items: [ 'bold', 'italic', '|', 'bulletedList', 'numberedList', '|', 'link', '|', 'undo', 'redo' ]
                },
                placeholder: 'Agenda items'
            },
            monthNames: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            dayNames: ["D", "L", "M", "X", "J", "V", "S"],        
            FilteredAttendees: this.attendees,
            submitted: false,            
            todoList: [],
            shared: 'Share with attendees'
        }
    },   
    computed: {
        user_id: function() {
            return this.auth.user._id
        },        
        ...mapState({
            auth: state => state.auth,
            status: state => state.minute,
            attendees: state => state.user.attendees,
            companyusers: state => state.user.companyusers
        })
    },
    methods: {
        ...mapActions('minute', ['create']),
        ...mapActions('user', ['getAttendees', 'getAllbyCompanyId']),
        handleSubmit(e) {            
            this.submitted = true
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.minute.author = this.user_id
                    this.minute.company = this.auth.user.setting.selectedcompany._id
                    this.minute.date = moment(this.minute.date).format('YYYY-MM-DD')
                    this.create(this.minute);
                }
            });
        },
        getFilteredTags(text) {
            this.FilteredAttendees = this.attendees.filter((option) => {
                return option.name
                    .toString()
                    .toLowerCase()
                    .indexOf(text.toLowerCase()) >= 0
            })
        },
        addTask: function(todo) {
          todo = this.taskinput
          this.todoList.push({ name: todo, 
                    duedate: new Date(), 
                    complete: false, 
                    username: this.auth.user.name, 
                    user: this.auth.user._id, 
                    company: this.auth.user.setting.selectedcompany._id 
                })
          this.taskinput = ''
          //console.log(this.todoList)
        },
        deleteTask: function(todo) {
          var index = this.todoList.indexOf(todo)
          this.todoList.splice(index, 1)
          //console.log(this.todoList)
        },
        updateTask: function(todo, field, value) {
            var index = this.todoList.indexOf(todo)
            this.todoList[index][field] = value
            //console.log(this.todoList)
        }                         
    },
    created () {
        this.getAttendees(this.auth.user.setting.selectedcompany._id),
        this.getAllbyCompanyId(this.auth.user.setting.selectedcompany._id)

    },
    watch: {
        'minute.starttime': function(nuevoValor, valorAnterior){
            const newendtime = new Date(nuevoValor.getFullYear(), nuevoValor.getMonth(), nuevoValor.getDate(), nuevoValor.getHours(), nuevoValor.getMinutes() + 30)
            this.minute.endtime = newendtime
            this.minEndTime = newendtime
        }
    },
    filters: {
      daymonth: function (date) {
        return moment(date).format('DD/MM');
      }       
    }       
};
</script>