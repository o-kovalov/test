$(document).ready(function() {
	$('.save-user').click(function(event){
		var opts = {
			id: $('#table-'+event.target.id+' .id').text(),
			firstName: isValid('text', $('#table-'+event.target.id+' .firstName').text()),
			lastName: isValid('text', $('#table-'+event.target.id+' .lastName').text()),
			email: isValid('email', $('#table-'+event.target.id+' .email').text()),
			cityId: $('#table-'+event.target.id+' .cityId').val(),
			roleId: $('#table-'+event.target.id+' .roleId').val(),
			update: Date.now()
		};
		if (canSend(opts)) {
			$.ajax({
				type: 'PUT',
				url: '/user/' + opts.id,
				data: opts
			}).done(function(){
				location.reload();
			});
		} else {
			$('#table-'+event.target.id).addClass('danger');
		}
	});

	$('.delete-user').click(function(event){
		//$('#userManageModal').modal('show');
		console.log('id', $('#table-'+event.target.id+' .id').text());
		$.ajax({
			type: 'DELETE',
			url: '/user/' + $('#table-'+event.target.id+' .id').text(),
		}).complete(function(){
			location.reload();
		});
		$('#table-'+event.target.id).remove();
	});

	$('.add-user').click(function(event){
		var newUser = {};
		newUser.email = isValid('email', $('#add-email').val());
		newUser.password = isValid('text', $('#add-password').val());
		newUser.lastName = isValid('text', $('#add-lastName').val());
		newUser.firstName = isValid('text', $('#add-firstName').val());
		newUser.cityId = $('#add-cityId').val();
		newUser.roleId = $('#add-roleId').val();
		newUser.create = Date.now();
		if (canSend(newUser)) {		
			$.ajax({
				type: 'POST',
				url: '/user',
				data: newUser
			}).done(function(){
				location.reload();
			});
		} else {
			$('#add-row').addClass('danger');
		}	
	});	

});