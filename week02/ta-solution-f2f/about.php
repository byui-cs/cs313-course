<!DOCTYPE html>
<html>
<head>
	<title>About Us</title>

	<!-- Using Bootstrap for this assignment certainly isn't required, but I got having
		 fun and couldn't resist. Notice that I include my own stylesheet after the
		 bootstrap one so that I can override styles. -->

	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

	<link rel="stylesheet" href="main.css">

</head>
<body class="mountain-bg">

<div class="container">

<?php

// By using require here, instead of include, we have decided that if that nav.php
// page is not available, we want the page to crash.

require("nav.php");

?>

	<div class="jumbotron">
	<h2>About Us</h2>

	<p>At Make your own Mountain, we believe that everyone should have their own mountain. Whether you are ready for a full-scale mountain, or just getting started with your first hill in the backyard, we have you covered.</p>

	</div>
</div>
</body>
</html>