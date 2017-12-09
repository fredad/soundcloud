
$(document).ready(function(){


SC.initialize({
client_id: 'fd4e76fc67798bfa742089ed619084a6'
});

var Jukebox = {
	'loadById':function(trackid){
		SC.stream('/tracks/'+ trackid).then(function(player){
			$('#play').click(function(){
				player.play();
			});
			$('#pause').click(function(){
				player.pause();
			});
			$('#stop').click(function(){
				player.pause();
				player.seek(0);
				$('.q').removeClass('now');
			});
			})},

	'streamById': function(trackid){
		SC.stream('/tracks/'+ trackid).then(function(player){
			player.play();
			$('#play').click(function(){
				player.play();
			});
			$('#pause').click(function(){
				player.pause();
			});
			$('#stop').click(function(){
				player.pause();
				player.seek(0);
				$('.q').removeClass('now');
			});
			})},
	// 'byplaylist':function(playlist){
	// 	SC.stream('/playlists/'+ playlist).then(function(player){
	// 		player.play();
	// 		$('#play').click(function(){
	// 			player.play();
	// 		});
	// 		$('#pause').click(function(){
	// 			player.pause();
	// 		});
	// 		$('#stop').click(function(){
	// 			player.pause();
	// 			player.seek(0);
	// 			$('.q').removeClass('now');
	// 		});
	// 		})
	// 		},	
	'resultById': function(){
		SC.get('/tracks/'+$('#searchId').val()).then(function(response) {
			$('#result').html("<div class='q  clearfix'> <p><a href='" + response.permalink_url + "' target='_blank' >" + response.title + "</a><br> uploaded by: <a href='https://soundcloud.com/"+ response.user.permalink +"'target='_blank'>"+ response.user.username + "</a><br>Genre: "+response.genre+"</p><img src='" + response.artwork_url
+ "' alt='artwork'/></div>");
		})},
	'resultByTerm':function(term){
		SC.get("/tracks", {q: term }).then(function(response) {
			//var index === 0;
			$('#result').html('');
			for (i=0; i < response.length; i++){
			$('#result').append("<div class='q clearfix' id ='" +i + "'><p><a href='" + response[i].permalink_url + "' target='_blank' >" + response[i].title + "</a> <br>uploaded by: <a href='https://soundcloud.com/"+ response[i].user.permalink +"'target='_blank'>"+ response[i].user.username + "</a><br>Genre: "+response[i].genre+"</p><img src='" + response[i].artwork_url
+ "' /><br></div>");
		};
			$('.q').click(function(){
				$('.q').removeClass('now');
				var index = $(this).attr('id');
				Jukebox.streamById(response[index].id);
				$(this).addClass('now');
				$('#next').click(function(){
					$('.q').removeClass('now');
					if (index < response.length-1){
					index = parseInt(index)+1
					Jukebox.streamById(response[index].id);
					$('#'+index).addClass('now');}
					else {
					index = 0
					Jukebox.streamById(response[index].id);
					$('#0').addClass('now');
					}
				});
				$('#previous').click(function(){
					$('.q').removeClass('now');
					if (index >= response.length || index < 1 ){
					index = response.length-1
					Jukebox.streamById(response[index].id)
					$('#'+index).addClass('now');}
					else {
					index = parseInt(index)-1
					Jukebox.streamById(response[index].id);
					$('#'+index).addClass('now');
					}
				});

				});

			// 		$('#next').click(function(){
			// 			index = index +1
			// 			Jukebox.streamById(response[index].id);
			// });

		

		})},
// 	'resultByPlaylist':function(listID){
// 		SC.get("/playlists/" + listID).then(function(response) {
// 			$('#result').html('');
// 			for (i=0; i < response.length; i++){
// 			$('#result').append("<div class='q' id ='" +i + "'><p><a href='" + response.tracks[i].permalink_url + "' target='_blank' >" + response.tracks[i].title + "</a> <br>uploaded by: <a href='https://soundcloud.com/"+ response.tracks[i].user.permalink +"'target='_blank'>"+ response.tracks[i].user.username + "</a><br>Genre: "+response.tracks[i].genre+"</p><img src='" + response.tracks[i].artwork_url
// + "' /><br></div>");
// 		};
// 			$('.q').click(function(){
// 				$('.q').removeClass('now');
// 				var index = $(this).attr('id');
// 				Jukebox.streamById(response.tracks[index].id);
// 				$(this).addClass('now');});
// 		})},

}

Jukebox.loadById(115841065);

$('#searchTerm').change(function(){
	Jukebox.resultByTerm($('#searchTerm').val());
});

$('#searchId').change(function(){
	Jukebox.resultById();
	Jukebox.loadById($('#searchId').val());
});

// $('#searchList').change(function(){
// 	//Jukebox.resultByPlaylist($('#searchList').val());
// 	//Jukebox.byplaylist($('#searchList').val());
// 	SC.get("/playlists/" + $('#searchList').val()).then(function(response) {
// 		console.log(response.tracks[1])});
// });


var scrollTop = 0;
$(window).scroll(function(){
scrollTop = $(window).scrollTop();
 $('.counter').html(scrollTop);

if (scrollTop < 120) {
  $('#content').removeClass('clouds');
  $('#content').addClass('style');
} else if (scrollTop >= 120) {
  $('#content').addClass('clouds');
  $('#content').removeClass('style');
} 



}); 

//359621195
  

// $('#play').click(function(){
// 	Jukebox.play();
// });

// $('#pause').click(function(){
// 	// console.log('hi');
// 	Jukebox.pause();
// });

// $('#stop').click(function(){
// 	Jukebox.stop();
// });



/*SC.resolve("http://soundcloud.com/forss/voca-nomen-tuum").then(function(response) {
// things to do after the track info loads...

// this should display all relevant information regarding the track
// e.g title, author, album art
console.log(response);
});*/

/*var id;
SC.resolve('').then(function(response){
	id = response.id
	SC.stream('/track/'+id).then(function(player){
		player.play();
	});*/


/*document.getElementById('search').onchange = function(){
	var query = document.getElementById("search").value;
		SC.get("/tracks", {
		q: query
		}).then(function(response) {
		var id = response[0].id;
		SC.stream('/tracks/'+ id).then(function(player){
			player.play();
		});

		//115841065
});
}*/
})



