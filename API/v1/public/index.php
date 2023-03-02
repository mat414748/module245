<?php 
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use ReallySimpleJWT\Token;
require __DIR__ . "/../vendor/autoload.php";
require_once "model/db_functions.php";
require "config/config.php";
require "controller/anti_sql_injection.php";
header("Content-Type: application/json");
//Reserving App version 1.0
$app = AppFactory::create();    
$app->setBasePath("/API/V1"); 
/*
 Returns an error to the client with the given message and status code.
 This will immediately return the response and end all scripts.
*/
function message($message, $code) {
    $message_result = array("message" => $message);
    echo json_encode($message_result);
    http_response_code($code);
    die();    
}
//Checks the entered parameter value for suitability to change it in the database table.
function put_check($name, $object, $request_data) {
    if (isset($request_data[$name]) && isset($object[$name])) {
        $value = anti_injection($request_data[$name]);
        $object[$name] = $value;
        return $object;
    } else if (isset($request_data[$name]) && empty(anti_injection($request_data[$name]))) {
        message("The " . $name . " field must not be empty. ", 400);
    } else {
        return $object;
    }
}

//Authentication
$app->post("/Authentication", function (Request $request, Response $response, $args) {
    global $api_username;
    global $api_password;
    $request_body = file_get_contents("php://input");
    $request_data = json_decode($request_body, true);
    //If the parameters are not set
    if (!isset($request_data["username"]) || empty($request_data["username"])) {
        message("Please provide a \"username\" field.", 400);
    } 
    if (!isset($request_data["password"]) || empty($request_data["password"])) {
        message("Please provide a \"password\" field.", 400);
    }

    $username = anti_injection($request_data["username"]);
    $password = anti_injection($request_data["password"]);
    //Verification of login and password for token creation
    if ($username != $api_username || $password != $api_password) {
        message("Invalid credentials", 401);
    }

    $token = Token::create($username, $password, time() + 3600, "m245Token");
    setcookie("token", $token, time() + 3600, "/");
    message("Token created!", 200);
    return $response;
});

//Rooms
//Create a room
$app->post("/CreateRoom", function (Request $request, Response $response, $args) {
    //Chekc if authentificated
    require "controller/require_authentication.php";
    //Get request content
    $request_body = file_get_contents("php://input");
    $request_data = json_decode($request_body, true);
    //If the parameters are not set
    if (!isset($request_data["room"]) || empty($request_data["room"])) {
        message("Please choose a \"room\".", 400);
    } 
    if (!isset($request_data["floor"]) || empty($request_data["floor"])) {
        message("Please choose a \"floor\".", 400);
    } 
    //Anti injection
    $room = anti_injection($request_data["room"]);
    $floor = anti_injection($request_data["floor"]);
    //If an error occurs specifically at the database level, then an exception will be thrown.
    try {
        create_room($room, $floor);
    } catch (Exception $pizdec) {
        message($pizdec->getMessage(), 500);
    }
    return $response;
});

//Reserve a room
$app->post("/ReserveRoom", function (Request $request, Response $response, $args) {
    //Chekc if authentificated
    require "controller/require_authentication.php";
    //Get request content
    $request_body = file_get_contents("php://input");
    $request_data = json_decode($request_body, true);
    //If the parameters are not set
    if (!isset($request_data["room"]) || empty($request_data["room"])) {
        message("Please choose a \"room\".", 400);
    } 
    if (!isset($request_data["date"]) || empty($request_data["date"])) { 
        message("Please choose a \"date\".", 400);
    }
    if (!isset($request_data["timeFrom"]) || empty($request_data["timeFrom"])) { 
        message("Please choose a \"time from\".", 400);
    }
    if (!isset($request_data["timeTo"]) || empty($request_data["timeTo"])) {
        message("Please choose a \"time to\".", 400);
    }
    //Anti injection
    $room = anti_injection($request_data["room"]);
    $date = anti_injection($request_data["date"]);
    $time_from = anti_injection($request_data["timeFrom"]);
    $time_to = anti_injection($request_data["timeTo"]);
    $user = anti_injection($request_data["user"]);
    //If an error occurs specifically at the database level, then an exception will be thrown.
    try {
        reserve_room($room, $date, $time_from, $time_to, $user);
    } catch (Exception $pizdec) {
        message($pizdec->getMessage(), 500);
    }
    return $response;
});

//Get all rooms
$app->get("/Rooms", function (Request $request, Response $response, $args) {
    require "controller/require_authentication.php";
    get_all_rooms();   
    return $response;
});

//Get all reserved rooms
$app->get("/ReservedRooms", function (Request $request, Response $response, $args) {
    require "controller/require_authentication.php";
    get_all_reserved_rooms();   
    return $response;
});

//Delete room
$app->delete("/Room/{name}", function (Request $request, Response $response, $args) {
    require "controller/require_authentication.php";
    $name = anti_injection($args["name"], true);
    //If the parameters are not set
    if (!isset($name) || empty($name)) {
        message("False name", 400);
    }
    delete_room($name);
    return $response;
});

//Delete room reservation
$app->delete("/ReservedRoom/{id}", function (Request $request, Response $response, $args) {
    require "controller/require_authentication.php";
    $id = anti_injection($args["id"], true);
    //If the parameters are not set
    if (!isset($id) || empty($id)) {
        message("False id", 400);
    }
    delete_room_reservation($id);
    return $response;
});

//Parking   
//Create parking
$app->post("/CreateParking", function (Request $request, Response $response, $args) {
    //Chekc if authentificated
    require "controller/require_authentication.php";
    //Get request content
    $request_body = file_get_contents("php://input");
    $request_data = json_decode($request_body, true);
    //If the parameters are not set
    if (!isset($request_data["parking"]) || empty($request_data["parking"])) {
        message("Please choose a \"room\".", 400);
    } 
    //Anti injection
    $parking = anti_injection($request_data["parking"]);
    //If an error occurs specifically at the database level, then an exception will be thrown.
    try {
        create_parking_place($parking);
    } catch (Exception $pizdec) {
        message($pizdec->getMessage(), 500);
    }
    return $response;
});

//Reserve a parking
$app->post("/ReserveParking", function (Request $request, Response $response, $args) {
    //Chekc if authentificated
    require "controller/require_authentication.php";
    //Get request content
    $request_body = file_get_contents("php://input");
    $request_data = json_decode($request_body, true);
    //If the parameters are not set
    if (!isset($request_data["spot"]) || empty($request_data["spot"])) {
        message("Please choose a \"spot\".", 400);
    } 
    if (!isset($request_data["date"]) || empty($request_data["date"])) { 
        message("Please choose a \"date\".", 400);
    }
    if (!isset($request_data["timeFrom"]) || empty($request_data["timeFrom"])) { 
        message("Please choose a \"time from\".", 400);
    }
    if (!isset($request_data["timeTo"]) || empty($request_data["timeTo"])) {
        message("Please choose a \"time to\".", 400);
    }
    //Anti injection
    $spot = anti_injection($request_data["spot"]);
    $date = anti_injection($request_data["date"]);
    $time_from = anti_injection($request_data["timeFrom"]);
    $time_to = anti_injection($request_data["timeTo"]);
    $user = anti_injection($request_data["user"]);
    //If an error occurs specifically at the database level, then an exception will be thrown.
    try {
        reserve_parking($spot, $date, $time_from, $time_to, $user);
    } catch (Exception $pizdec) {
        message($pizdec->getMessage(), 500);
    }
    return $response;
});

//Get all parkings
$app->get("/Parkings", function (Request $request, Response $response, $args) {
    require "controller/require_authentication.php";
    get_all_parkings();   
    return $response;
});

//Get all reserved parkings
$app->get("/ReservedParkings", function (Request $request, Response $response, $args) {
    require "controller/require_authentication.php";
    get_all_reserved_parkings();   
    return $response;
});

//Delete parking
$app->delete("/Parking/{name}", function (Request $request, Response $response, $args) {
    require "controller/require_authentication.php";
    $name = anti_injection($args["name"], true);
    //If the parameters are not set
    if (!isset($name) || empty($name)) {
        message("False name", 400);
    }
    delete_parking($name);
    return $response;
});

//Delete parking reservation
$app->delete("/ReservedParking/{id}", function (Request $request, Response $response, $args) {
    require "controller/require_authentication.php";
    $id = anti_injection($args["id"], true);
    //If the parameters are not set
    if (!isset($id) || empty($id)) {
        message("False id", 400);
    }
    delete_parking_reservation($id);
    return $response;
});

//Vendor Launch
$app->run();
?>
