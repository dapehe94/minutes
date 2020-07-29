<template>
    <div class="columns" v-if="this.$route.params.id">
        <div class="column is-12">
            <h3>{{ selectedcompany.name }}</h3>
            <div v-if="companyusers">
                <i>company team:</i> 
                <b-tooltip label="Invite team members" position="is-top" type="is-dark" class="pointer is-pulled-right">
                    <i class="fas fa-user-plus fa-lg" @click="isComponentModalActive = true"></i>
                </b-tooltip>

                <b-table 
                    :data="companyusers" 
                    :columns="columns"
                    :narrowed="isNarrowed"
                    :focusable="isFocusable">
                </b-table>
          
            </div>                
        </div>
        <b-modal :active.sync="isComponentModalActive" has-modal-card>
            <modal-form v-bind="formProps"></modal-form>
        </b-modal>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ModalInviteMember from '@/components/user/modalinvitemembers'
const moment = require('moment')

const ModalForm = {
        props: ['email', 'password'],
        components: { ModalInviteMember }
}

export default {
    components: {
        ModalForm
    },    
    props: {
        selectedcompany: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            columns: [
                {
                    field: 'name',
                    label: 'Name'
                }
            ],
            isComponentModalActive: false,
            submitted: false,
            isNarrowed: true,
            isFocusable: true,
            formProps: {
                email: 'evan@you.com',
                password: 'testing'
            }            
        }
    },
    computed: {
        ...mapState({
            companyusers: state => state.user.companyusers
        })
    },
    methods: {
        ...mapActions('user', ['getAllbyCompanyId']),
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    
                }
            });
        },        
    },
    created () {
        const unwatch = this.$watch(
            () => this.$route, 
                (route, prevRoute) => {
                    this.getAllbyCompanyId(this.$route.params.id)                    
                }
        )
    },   
    filters: {
      date: function (date) {
        return moment(date).format('MMMM Do YYYY');
      }       
    }                     
};
</script>