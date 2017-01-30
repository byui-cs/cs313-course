<?php
/**********************************************************
* File: viewScriptures.php
* Author: Br. Burton
* 
* Description: This file shows an example of how to query a
*   PostgreSQL database from PHP.
***********************************************************/

// It would be better to store these in a different file
$dbUser = 'ta_user';
$dbPassword = 'ta_pass';
$dbName = 'scripture_ta';
$dbHost = 'localhost';
$dbPort = '5432';

try
{
	// Create the PDO connection
	$db = new PDO("pgsql:host=$dbHost;port=$dbPort;dbname=$dbName", $dbUser, $dbPassword);

}
catch (PDOException $ex)
{
	// If this were in production, you would not want to echo
	// the details of the exception.
	echo "Error connecting to DB. Details: $ex";
	die();
}

?>
<!DOCTYPE html>
<html>
<head>
	<title>Scripture List</title>
</head>

<body>
<div>

<h1>Scripture Resources</h1>

<?php

// In this example, for simplicity, the query is executed
// right here and the data echoed out as we iterate the query.

// You could imagine that in a more involved application, we
// would likely query the database in a completely separate file / function
// and build a list of objects that held the components of each
// scripture. Then, here on the page, we could simply call that 
// function, and iterate through the list that was returned and
// print each component.



// First, prepare the statement

// Notice that we avoid using "SELECT *" here. This is considered
// good practice so we don't inadvertently bring back data we don't
// want, especially if the database changes later.
$statement = $db->prepare("SELECT book, chapter, verse, content FROM scripture");
$statement->execute();

// Go through each result
while ($row = $statement->fetch(PDO::FETCH_ASSOC))
{
	// The variable "row" now holds the complete record for that
	// row, and we can access the different values based on their
	// name
	echo '<p>';
	echo '<strong>' . $row['book'] . ' ' . $row['chapter'] . ':';
	echo $row['verse'] . '</strong>' . ' - ' . $row['content'];
	echo '</p>';
}

?>


</div>

</body>
</html>