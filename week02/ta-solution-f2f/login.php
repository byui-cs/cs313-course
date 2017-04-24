<!DOCTYPE html>
<html>
<head>
	<title>Login</title>

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

		<h2>Login</h2>

		<ul>
			<!-- the forceLogin.php page is not implemented yet, but my approach
			     is to have that page simply set the session variable according to the
			     type parameter passed on the URL. Notice that this is NOT a good
			     approach for authentication. We'll discuss later better ways to handle
			     usernames and passwords.
			-->

			<li><p><a href="forceLogin.php?type=admin">Login as Administrator</a></p></li>
			<li><p><a href="forceLogin.php?type=tester">Login as Tester</a></p></li>
		</ul>
	</div>

</body>
</html>