$(document).ready(function() {
	$('.save-milestone').click(function(event){
		var opts = {
			id: $('#table-'+event.target.id+' .id').text(),
			name: isValid('text', $('#table-'+event.target.id+' .name').text()),
			number: isValid('number', $('#table-'+event.target.id+' .number').text()),
			complete: isValid('number', $('#table-'+event.target.id+' .complete').text()),
			projectId: $('#table-'+event.target.id+' .projectId').val(),
			update: Date.now()
		};
		if (canSend(opts)) {
			$.ajax({
				type: 'PUT',
				url: '/milestone/' + opts.id,
				data: opts
			}).done(function(){
				location.reload();
			});
		} else {
			$('#table-'+event.target.id).addClass('danger');
		}
	});

	$('.delete-milestone').click(function(event){
		//$('#userManageModal').modal('show');
		$.ajax({
			type: 'DELETE',
			url: '/milestone/' + $('#table-'+event.target.id+' .id').text(),
		});
		$('#table-'+event.target.id).remove();
	});

	$('.add-milestone').click(function(event){
		var newMilestone = {};
		newMilestone.name = isValid('text', $('#add-name').val());
		newMilestone.number = isValid('number', $('#add-number').val());
		newMilestone.complete = isValid('number', $('#add-complete').val());
		newMilestone.projectId = $('#add-project').val();
		newMilestone.create = Date.now();
		if (canSend(newMilestone)) {
			$.ajax({
				type: 'POST',
				url: '/milestone',
				data: newMilestone
			}).done(function(){
				location.reload();
			});
		} else {
			$('#add-row').addClass('danger');
			alert($('#add-ptoject').val());
		}
	});	
});