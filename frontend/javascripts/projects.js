$(document).ready(function() {
	$('.save-project').click(function(event){
		var opts = {
			id: $('#table-'+event.target.id+' .id').text(),
			name: isValid('text', $('#table-'+event.target.id+' .name').text()),
			description: isValid('text', $('#table-'+event.target.id+' .description').text()),
			update: Date.now()
		};
		if (canSend(opts)) {
			$.ajax({
				type: 'PUT',
				url: '/project/' + opts.id,
				data: opts
			}).done(function(){
				location.reload();
			});
		} else {
			$('#table-'+event.target.id).addClass('danger');
		}
	});

	$('.delete-project').click(function(event){
		//$('#userManageModal').modal('show');
		var a = $('#table-'+event.target.id+' .id').text()
		console.log(a);
		$.ajax({
			type: 'DELETE',
			url: '/project/' + a,
		}).done(function(data){
				$.ajax({
					type: 'DELETE',
					url: '/userstoproject/'+ a +'/del',
				})
				//location.reload();
			});;
		$('#table-'+event.target.id).remove();
	});

	$('.add-project').click(function(event){
		var newProject = {};
		newProject.name = isValid('text', $('#add-name').val());
		newProject.description = isValid('text', $('#add-description').val());
		newProject.create = Date.now();
		if (canSend(newProject)) {		
			$.ajax({
				type: 'POST',
				url: '/project',
				data: newProject
			}).done(function(data){
				$.ajax({
					type: 'POST',
					url: '/userstoproject',
					data: {projectId: data._id}
				})
				location.reload();
			});
		} else {
			$('#add-row').addClass('danger');
		}		
	});	

});