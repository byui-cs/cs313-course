function search() {
	// Get the value from the search box
	var searchString = $("#txtSearch").val();
	console.log("Searching for: " + searchString);

	// Set up the parameters to send to the API
	var params = {s: searchString, apikey:"fill_this_in_with_the_correct_key"};

	// Use jQuery to make the get request
	$.get("http://www.omdbapi.com/", params, function(data, status){
		// For debugging purposes, make a note that we're back
		console.log("Back from server with the following results:")
		console.log(status);
    	console.log(data);

    	updateResultList(data)
	});
}

function updateResultList(data) {
	if (data.Search && data.Search.length > 0) {
		var resultList = $("#ulResults");
		resultList.empty();

		for (var i = 0; i < data.Search.length; i++) {
			var title = data.Search[i].Title;
			resultList.append("<li><p>" + title + "</p></li>");
		}
	}

}
