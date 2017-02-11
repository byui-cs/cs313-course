<?php
/**********************************************************
* File: home.php
* Author: Br. Burton
* 
* Description: This is the home page. It checks that a user
*  exists on the session and redirects to the login page
*  if it does not.
***********************************************************/
session_start();

if (isset($_SESSION['username']))
{
	$username = $_SESSION['username'];
}
else
{
	header("Location: signIn.php");
	die(); // we always include a die after redirects.
}

?>

<!DOCTYPE html>
<html>
<head>
	<title>Home Page</title>
</head>

<body>
<div>

	<h1>Welcome to the homepage!</h1>

	Your username is: <?= $username ?><br /><br />

	<a href="signOut.php">Sign Out</a>
</div>

</body>
</html>