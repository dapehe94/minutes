<template>
    	<form @submit.prevent="handleSubmit">
    		<div class="form-group">
    			<label for="subject"></label>
    			<input type="text" v-model="minute.subject" v-validate="'required'" class="form-control" name="subject" id="subject" placeholder="Meeting subject" :class="{ 'is-invalid': submitted && errors.has('subject') }">
    			<div v-if="submitted && errors.has('subject')" class="invalid-feedback">{{ errors.first('subject') }}</div>
    		</div>

    		<div class="form-group">
    			<label for="location"></label>
    			<input type="text" v-model="minute.location" v-validate="'required'" class="form-control" name="location" id="location" placeholder="Address or room number/name" :class="{ 'is-invalid': submitted && errors.has('location') }">
    			<div v-if="submitted && errors.has('location')" class="invalid-feedback">{{ errors.first('location') }}</div>
    		</div>

            <div class="form-group">
                <label class="typo__label"></label>
                <multiselect 
                            v-model="minute.attendees" 
                            tag-placeholder="Add in the new attendee" 
                            placeholder="Add meeting attendees" 
                            name="attendees"
                            id="attendees" 
                            label="name" 
                            v-validate="'required'" 
                            :class="{ 'is-invalid': submitted && errors.has('attendees') }"
                            track-by="id" 
                            :options="options" 
                            :multiple="true" 
                            :taggable="true" 
                            @tag="addTag">
                </multiselect>
                <div v-if="submitted && errors.has('attendees')" class="invalid-feedback">{{ errors.first('attendees') }}</div>
            </div>

            <div class="form-group">
                <label for="date">Date</label>
                <input type="date" v-model="minute.date" v-validate="'required'" class="form-control" name="date" id="date" :class="{ 'is-invalid': submitted && errors.has('date') }">
                <div v-if="submitted && errors.has('date')" class="invalid-feedback">{{ errors.first('date') }}</div>
            </div>  

    		<div class="form-group">
    			<label for="text"></label>
    			<textarea v-model="minute.text" v-validate="'required'" class="form-control" name="text" id="text" rows="3" :class="{ 'is-invalid': submitted && errors.has('text') }"></textarea>
    			<div v-if="submitted && errors.has('text')" class="invalid-feedback">{{ errors.first('text') }}</div>
    		</div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary" :disabled="status.submiting">create</button>
                <img v-show="status.submiting" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <router-link to="/" class="btn btn-link">Cancel</router-link>
            </div>

	</form>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'

export default {
    data () {
        return {
            minute: {
                subject: '',
                location: '',
                attendees: [],
                text: '',
                date: '',
                company: '',
                author: ''
            },
            submitted: false
        }
    },   
    components: { Multiselect },
    computed: {
        user_id: function() {
            return this.auth.user._id
        },        
        ...mapState({
            auth: state => state.auth,
            status: state => state.minute,
            options: state => state.user.attendees
        })
    },
    methods: {
        ...mapActions('minute', ['create']),
        ...mapActions('user', ['getAttendees']),
        handleSubmit(e) {
            this.minute.author = this.user_id
            this.minute.company = this.auth.user.setting.selectedcompany._id
            this.minute.attendees.push(this.user_id)
            this.submitted = true
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.create(this.minute);
                }
            });
        },
        addTag (newTag) {
          const tag = {
            name: newTag,
            code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
          }
          this.options.push(tag)
          this.value.push(tag)
        }             
    },
    created () {
        this.getAttendees(this.auth.user.setting.selectedcompany._id)
    }      
};
</script>