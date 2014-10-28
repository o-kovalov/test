$(document).ready(function() {
	$('.delete-user-from-project').click(function(event){
		console.log('event', event);
		console.log($('.projectid-'+event.target.id).text());
		$.ajax({
			type: 'DELETE',
			url: '/userstoproject/'+ $('.projectid-'+event.target.id).text() + '/' + $('#'+event.target.classList[3]).text()
		}).done(function(){
			location.reload();
		});
	});

	$('.add-user-to-project').click(function(event){
		console.log('.projectid-'+event.target.id);
		console.log($('.projectid-'+event.target.id).text());
		$.ajax({
			type: 'PUT',
			url: '/userstoproject/' + $('.projectid-'+event.target.id).text() + '/' + $('.add-user-'+event.target.id).val() ,
			data: {}
		});
		location.reload();
	});	

});