$(document).ready(function() {
	$('.save-note').click(function(event){
		var opts = {
			id: $('#table-'+event.target.id+' .id').text(),
			note: isValid('text', $('#table-'+event.target.id+' .note').text()),
			milestoneId: $('#table-'+event.target.id+' .milestoneId').val(),
			userId: $('#table-'+event.target.id+' .userId').val(),
			update: Date.now()
		};
		if (canSend(opts)) {
			$.ajax({
				type: 'PUT',
				url: '/note/' + opts.id,
				data: opts
			}).done(function(){
				location.reload();
			});
		} else {
			$('#table-'+event.target.id).addClass('danger');
		}
	});

	$('.delete-note').click(function(event){
		$.ajax({
			type: 'DELETE',
			url: '/note/' + $('#table-'+event.target.id+' .id').text(),
		});
		$('#table-'+event.target.id).remove();
	});

	$('.add-note').click(function(event){
		var newNote = {};
		newNote.note = isValid('text', $('#add-note').val());
		newNote.create = Date.now();
		newNote.milestoneId = $('#add-milestoneId').val();
		newNote.userId = $('#add-userId').val();
		if (canSend(newNote)) {		
			$.ajax({
				type: 'POST',
				url: '/note',
				data: newNote
			}).done(function(){
				location.reload();
			});
		} else {
			$('#add-row').addClass('danger');
		}
	});	

});