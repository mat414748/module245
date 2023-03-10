<?php
$database = new mysqli("localhost", "root", "", "245");
require_once "../public/index.php";

//Rooms
//Create a room
function create_room($room, $floor) {
   global $database;
   $result = $database->query("INSERT INTO rooms VALUES ('$room', '$floor')");
   if (!$result){
      message("Error creating a room",500);
   } else {
      message("Successfully created room",201);
   }
}

//Reserve a room
function reserve_room($room, $date, $time_from, $time_to, $user) {
   global $database;
   $result = $database->query("INSERT INTO reserved_rooms VALUES ('', '$room', '1', '$time_from', '$time_to', '$date', '$user')");
   if (!$result){
      message("Error reserving a room",500);
   } else if ($result === true && $database->affected_rows == 0){
      message("Room with this name doesn't exist. Name: " . $room, 404);  
   } else {
      send_mail("Room reservation", "The room <b>$room</b> was successfully reserved for the time from <b>$time_from-$time_to</b> and the date <b>$date</b> from user <b>$user</b>", "The room $room was successfully reserved for the time from $time_from-$time_to and the date $date from user $user");
      message("Successfully reserved room",201);
   }
}

//Get all rooms
function get_all_rooms() {
   global $database; 
   $result = $database->query("SELECT * FROM rooms");
   if (!$result){
      message("Error when requesting a list of rooms", 500); 
   } else if ($result === true || $result->num_rows == 0){
      message("No rooms found", 404);  
   } else {
      $rooms_list = array( );
		while ($room = $result->fetch_assoc()) {
			$rooms_list[] = $room;
		}
      message($rooms_list, 200);
   }
}

//Get all reserved rooms
function get_all_reserved_rooms() {
   global $database; 
   $result = $database->query("SELECT * FROM reserved_rooms");
   if (!$result){
      message("Error when requesting a list of reserved rooms", 500); 
   } else if ($result === true || $result->num_rows == 0){
      message("No reserved rooms found", 404);  
   } else {
      $reserved_rooms_list = array( );
		while ($reserved_room = $result->fetch_assoc()) {
			$reserved_rooms_list[] = $reserved_room;
		}
      message($reserved_rooms_list, 200);
   }
}

//Delete room
function delete_room($name) {
   global $database;
   $result = $database->query("DELETE FROM rooms WHERE room = '$name'");
   if (!$result){
      message("Request error", 500);  
   } else if ($result === true && $database->affected_rows == 0){
      message("Room object with this name does not exist. Name: " . $name, 404);  
   } else {
      message("The room was successfully removed",200);  
   }
}

//Delete reservation of room
function delete_room_reservation($id, $room, $date, $time_from, $time_to, $user) {
   global $database;
   $result = $database->query("DELETE FROM reserved_rooms WHERE id = '$id'");
   if (!$result){
      message("Request error", 500);  
   } else if ($result === true && $database->affected_rows == 0){
      message("Room reservation object with this id does not exist. ID: " . $id, 404);  
   } else {
      send_mail("Cancellation of a room reservation", "The reservation of room <b>$room</b> has been cancelled for the time from <b>$time_from-$time_to</b> and the date <b>$date</b> from user <b>$user</b>", "The reservation of room $room has been cancelled for the time from $time_from-$time_to and the date $date from user $user");
      message("The room reservation was successfully removed", 200);  
   }
}

//Parkings
//Create a parking place
function create_parking_place($parking) {
   global $database;
   $result = $database->query("INSERT INTO parking_spots VALUES ('$parking')");
   if (!$result){
      message("Error creating a parking place", 500);
   } else {
      message("Successfully created parking place", 201);
   }
}

//Reserve a parking
function reserve_parking($spot, $date, $time_from, $time_to, $user) {
   global $database;
   $result = $database->query("INSERT INTO reserved_parking VALUES ('', '$spot', '1', '$time_from', '$time_to', '$date', '$user')");
   if (!$result){
      message("Error reserving a parking place", 500);
   } else if ($result === true && $database->affected_rows == 0){
      message("Parking place with this name doesn't exist. Name: " . $spot, 404);  
   } else {
      send_mail("Parking reservation", "The parking <b>$spot</b> was successfully reserved for the time from $time_from-$time_to and the date $date", "The spot $spot was successfully reserved for the time from $time_from-$time_to and the date $date");
      message("Successfully reserved spot", 201);
   }
}
//Get all parking places
function get_all_parkings() {
   global $database; 
   $result = $database->query("SELECT * FROM parking_spots");
   if (!$result){
      message("Error when requesting a list of parking_spots", 500); 
   } else if ($result === true || $result->num_rows == 0){
      message("No parking spots found", 404);  
   } else {
      $parking_list = array( );
		while ($parking = $result->fetch_assoc()) {
			$parking_list[] = $parking;
		}
      message($parking_list, 200);
   }
}

//Get all reserved parking places
function get_all_reserved_parkings() {
   global $database; 
   $result = $database->query("SELECT * FROM reserved_parking");
   if (!$result){
      message("Error when requesting a list of reserved parking places", 500); 
   } else if ($result === true || $result->num_rows == 0){
      message("No reserved parking places found", 404);  
   } else {
      $reserved_parking_list = array( );
		while ($reserved_parking = $result->fetch_assoc()) {
			$reserved_parking_list[] = $reserved_parking;
		}
      message($reserved_parking_list, 200);
   }
}

//Delete parking
function delete_parking($name) {
   global $database;
   $result = $database->query("DELETE FROM parking_spots WHERE spot = '$name'");
   if (!$result){
      message("Request error", 500);  
   } else if ($result === true && $database->affected_rows == 0){
      message("Parking with this name does not exist. Name: " . $name, 404);  
   } else {
      message("The parking place was successfully removed",200);  
   }
}

//Delete reservation of parking
function delete_parking_reservation($id, $spot, $date, $time_from, $time_to, $user) {
   global $database;
   $result = $database->query("DELETE FROM reserved_parking WHERE id = '$id'");
   if (!$result){
      message("Request error", 500);  
   } else if ($result === true && $database->affected_rows == 0){
      message("Parking reservation object with this id does not exist. ID: " . $id, 404);  
   } else {
      send_mail("Cancellation of a spot reservation", "The reservation of spot <b>$spot</b> has been cancelled for the time from <b>$time_from-$time_to</b> and the date <b>$date</b> from user <b>$user</b>", "The reservation of spot $spot has been cancelled for the time from $time_from-$time_to and the date $date from user $user");
      message("The parking reservation was successfully removed",200);  
   }
}

?>