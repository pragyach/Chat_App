(function(){

	var user;
	var messages = [];

	var messages_template = Handlebars.compile($('#messages-template').html());

	function updateMessages(msg){
		messages.push(msg);
		var messages_html = messages_template({'messages': messages});
		$('#messages').html(messages_html);
		$("#messages").animate({ scrollTop: $('#messages')[0].scrollHeight}, 1000);
	}

	var conn = new WebSocket('ws://localhost:8080');
	conn.onopen = function(e) {
	    console.log("Connection established!");
	};

	conn.onmessage = function(e) {
		var msg = JSON.parse(e.data);
		updateMessages(msg);
	};
    
    var welcome = 'You can perform the following function : 1. Getting the Menu Card - menu 2. Know the cost of particular food - cost and then the name of the food 3. Know the food within a particular range - range and then the Maximum limit of the range 4. Contact Details - contact number 5. Order - order 6. Know the existing offers - offers 7. Know the time of the order - time of order 8. Know the total cost of order - total cost 9. Give the final order - final order' 

	$('#join-chat').click(function(){
		user = $('#user').val();
		$('#user-container').addClass('hidden');
		$('#main-container').removeClass('hidden');

		var msg = {
			'user': user,
			'text': welcome,
			
			'time': moment().format('hh:mm a')
		};

		updateMessages(msg);
		conn.send(JSON.stringify(msg));

		$('#user').val('');
	});
    c = 0

	$('#send-msg').click(function(){
		var text = $('#msg').val();
		if (text == "menu"){text = "menu_card"; }
        if (c == 4 ){
		text = "food within this range";
		c = 0
	    }
		if (c == 2 ){
		text = "Your order have been saved";
		c = 0;
		var order_list = text;
		c = 3;
	    }
        if (c == 1 ){
		if (text == "dosa"){text = "200"; c = 0;}
	    }
		if (text == "cost"){text = "ok_for which product";
		c = 1; }
		if (text == "contact number") {text = "Here are the contact details";}
		if (text == "range") {text = "Enter your range";
		c = 4;}
		if (text == "order") {text = "What would you like to have ?"; 
	       c = 2 ;}
	    if (text == "offers") {text = "Display the offers available"; 
	    }
	    if ( c==3 ) {if (text == "time of order") {text = "30 minutes"; 
	    } }
	    if ( c==3 ) {if (text == "total cost") {text = "Your total cost is"; 
	    } }
	    if ( c==3 ) { if (text == "final order") {text = "Your order is finalized. Thankyou	";
	     c = 0;} 
	    }



		var msg = {
			'user': user,
			'text': text,

			'time': moment().format('hh:mm a')
		};
		updateMessages(msg);
		conn.send(JSON.stringify(msg));

		$('#msg').val('');
	});


	$('#leave-room').click(function(){
		
		var msg = {
			'user': user,
			'text': user + ' has left the room',
			'time': moment().format('hh:mm a')
		};
		updateMessages(msg);
		conn.send(JSON.stringify(msg));

		$('#messages').html('');
		messages = [];

		$('#main-container').addClass('hidden');
		$('#user-container').removeClass('hidden');

		
	});

})();
