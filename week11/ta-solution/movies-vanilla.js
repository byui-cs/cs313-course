function search() {
	// Get the value from the search box
	var searchString = document.getElementById("txtSearch").value;
	console.log("Searching for: " + searchString);

	var xhr = new XMLHttpRequest();

	// set up the function to be called when this is complete
	xhr.onload = function () {
		if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
			// We are back from the server now...
			
			console.log("Back from server with the following results:")
	    	console.log(xhr.responseText);

	    	updateResultList(JSON.parse(xhr.responseText));
		} else {
			// This will run when it's not
			console.log('The request failed!');
		}

	};

	// Set up the parameters to send to the API
	var params = "?apikey=byuidaho&s=" + searchString;
	var url = "http://www.omdbapi.com/" + params;

	xhr.open("GET", url);
	xhr.send();
}

function updateResultList(data) {
	console.log("UpdateResultList");
	console.log(data)

	if (data.Search && data.Search.length > 0) {
		var resultList = document.getElementById("ulResults");
		resultList.innerHTML = "";

		for (var i = 0; i < data.Search.length; i++) {
			var title = data.Search[i].Title;
			console.log("Adding: " + title);

			var newLi = document.createElement("li");
			var newP = document.createElement("p");
			newP.appendChild(document.createTextNode(title));

			newLi.appendChild(newP);
			resultList.appendChild(newP);
		}
	}

}
