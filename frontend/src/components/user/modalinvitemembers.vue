<template>
	<div>
		<form @submit.prevent="handleSubmit">
			<b-field>
				Invite team members to {{selectedcompany.name}}
				<b-input type="textarea"></b-input>
			</b-field>    
		<button type="submit" :class="[submitted ? 'button is-link is-fullwidth is-loading' : 'button is-link is-fullwidth']">send invitations</button>
		</form>
	</div>
</template>