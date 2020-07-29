<template>
	<div>
		<h3>{{auth.user.name}} profile</h3>		

			<div class="columns">

				<div class="column">

					<form @submit.prevent="handleSubmit">
				        <b-field label="Name">
				            <b-input v-model="user.name" placeholder="Name" icon-pack="fas" icon="user"></b-input>
				        </b-field>

				        <b-field label="Email">
				            <b-input type="email" v-model="user.email" placeholder="Email" icon-pack="fas" icon="envelope"></b-input>
				        </b-field>	     

						<div class="field is-grouped">
						  <div class="control">
						    <button type="submit" :class="[status.submiting ? 'button is-link is-loading' : 'button is-link']">Submit</button>
						  </div>
						  <div class="control">
						    <router-link to="/" class="button is-text">Cancel</router-link>
						  </div>
						</div>	  	
					</form>			

			    </div>

			    <div class="column">
						<div class="file" v-if="user.profile.avatar == 'src/assets/images/uploads/default.jpg'">

							<avatar :username="auth.user.name" :size="128"></avatar>

							<label class="file-label">								
								<input class="file-input" type="file" :v-model="user.profile.avatar" @change="onFileChange">
								<span class="file-cta">
									<b-icon pack="fas" icon="upload" size="is-small"></b-icon> 
									<span class="file-label">Click to upload avatar</span>
								</span>
							</label>
						</div>
						<div class="file" v-else>
							<figure class="image is-128x128">
							  <img class="is-rounded" :src="auth.user.profile.avatar">
							</figure>

							<label class="file-label">				
								<button class="button is-danger is-outlined" @click="removeImage">Remove image</button>
							</label>
						</div>
			    </div>

		    </div>
		
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {      	
            submitted: false
        }
    },
    computed: {
        ...mapState({
            auth: state => state.auth,
            status: state => state.user.status,
            user: state => state.auth.user
        })       
    },
    methods: {
        ...mapActions('user', ['update', 'uploadavatar']),
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.update( { id: this.user._id, user: this.user });
                }
            });
        },
	    onFileChange(e) {
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length)
				return;
			this.createImage(files[0]);
	    },
	    createImage(file) {
			var image = new Image();
			var reader = new FileReader();
			var vm = this;

			reader.onload = (e) => {
				vm.image = e.target.result;
				this.user.profile.avatar = e.target.result;
			};
			this.user.profile.avatar = 'src/assets/images/uploads/' + file.name
			reader.readAsDataURL(file);
			console.log(vm.image);			
	    },
	    removeImage: function (e) {
			this.user.profile.avatar = 'src/assets/images/uploads/default.jpg';
	    }                
    }      
};
</script>