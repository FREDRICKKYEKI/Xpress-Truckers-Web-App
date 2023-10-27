# Backend and APIs

## API ROUTES IMPLEMENTED
### GET /api/v1/users
Gets information for all users(Drivers and Clients)

#### Sample Output
[{"created_at":"2023-10-26T13:09:16.000000","email":"lennoxnams@example.com","first_name":"kwargs","id":"2289f481-c1b0-4ce1-a30f-299493ba9568","last_name":"model","phonenumber":null,"ratings":null,"role":"user","updated_at":"2023-10-26T13:09:16.000000"},{"created_at":"2023-02-28T09:00:00.000000","email":"user1@example.com","first_name":"John","id":"28f43756-8129-4ebc-bc60-1c55a409ea62","last_name":"Doe","phonenumber":null,"ratings":"4.5","role":"user","updated_at":"2023-02-28T12:15:00.000000"},{"created_at":"2023-02-28T09:00:00.000000","email":"user2@example.com","first_name":"Jane","id":"28f43756-8129-4ebc-bc60-1c55a409ea63","last_name":"Smith","phonenumber":null,"ratings":"4.0","role":"user","updated_at":"2023-02-28T12:15:00.000000"},{"created_at":"2023-02-28T09:00:00.000000","email":"user5@example.com","first_name":"Mary","id":"28f43756-8129-4ebc-bc60-1c55a409ea64","last_name":"Johnson","phonenumber":null,"ratings":"4.3","role":"driver","updated_at":"2023-02-28T12:15:00.000000"},{"created_at":"2023-02-28T09:00:00.000000","email":"user6@example.com","first_name":"David","id":"28f43756-8129-4ebc-bc60-1c55a409ea65","last_name":"Lee","phonenumber":null,"ratings":"4.1","role":"driver","updated_at":"2023-02-28T12:15:00.000000"}]

### GET /api/v1/user/<user_id>
Gets a certain user given a user ID

#### Sample Output
{"created_at":"2023-10-26T13:09:16.000000","email":"lennoxnams@example.com","first_name":"kwargs","id":"2289f481-c1b0-4ce1-a30f-299493ba9568","last_name":"model","phonenumber":null,"ratings":null,"role":"user","updated_at":"2023-10-26T13:09:16.000000"}

### GET /api/v1/clients/
Gets exclusive information about clients

#### Sample Output
[{"created_at":"2023-10-26T13:09:16.000000","email":"lennoxnams@example.com","first_name":"kwargs","id":"2289f481-c1b0-4ce1-a30f-299493ba9568","last_name":"model","phonenumber":null,"ratings":null,"role":"user","updated_at":"2023-10-26T13:09:16.000000"},{"created_at":"2023-02-28T09:00:00.000000","email":"user1@example.com","first_name":"John","id":"28f43756-8129-4ebc-bc60-1c55a409ea62","last_name":"Doe","phonenumber":null,"ratings":"4.5","role":"user","updated_at":"2023-02-28T12:15:00.000000"},{"created_at":"2023-02-28T09:00:00.000000","email":"user2@example.com","first_name":"Jane","id":"28f43756-8129-4ebc-bc60-1c55a409ea63","last_name":"Smith","phonenumber":null,"ratings":"4.0","role":"user","updated_at":"2023-02-28T12:15:00.000000"}]

### GET /api/v1/clients/<client_id>
Gets a certain client given a client ID

#### Sample Output
{"created_at":"2023-02-28T09:00:00.000000","email":"user1@example.com","first_name":"John","id":"28f43756-8129-4ebc-bc60-1c55a409ea62","last_name":"Doe","phonenumber":null,"ratings":"4.5","role":"user","updated_at":"2023-02-28T12:15:00.000000"}

### GET /api/v1/drivers
Gets exclusive information about drivers

#### Sample Output
[{"created_at":"2023-02-28T09:00:00.000000","email":"user5@example.com","first_name":"Mary","id":"28f43756-8129-4ebc-bc60-1c55a409ea64","last_name":"Johnson","phonenumber":null,"ratings":"4.3","role":"driver","updated_at":"2023-02-28T12:15:00.000000"},{"created_at":"2023-02-28T09:00:00.000000","email":"user6@example.com","first_name":"David","id":"28f43756-8129-4ebc-bc60-1c55a409ea65","last_name":"Lee","phonenumber":null,"ratings":"4.1","role":"driver","updated_at":"2023-02-28T12:15:00.000000"}]

### GET /api/v1/driver/<driver_id>
Gets a certain driver given a driver ID

#### Sample Output
{"created_at":"2023-02-28T09:00:00.000000","email":"user6@example.com","first_name":"David","id":"28f43756-8129-4ebc-bc60-1c55a409ea65","last_name":"Lee","phonenumber":null,"ratings":"4.1","role":"driver","updated_at":"2023-02-28T12:15:00.000000"}

### GET /api/v1/vehicles/
Gets exclusive information about drivers

#### Sample Output
[{"created_at":"2023-02-28T09:00:00.000000","driver_id":"28f43756-8129-4ebc-bc60-1c55a409ea62","id":"f6cb075c-d5a4-44d0-9e78-57a11e3c34b6","location":"Location 1","make":"Make 1","updated_at":"2023-02-28T12:15:00.000000","vehicle_registration":"ABC123","vehicle_type":"A"},{"created_at":"2023-02-28T09:00:00.000000","driver_id":"28f43756-8129-4ebc-bc60-1c55a409ea64","id":"f6cb075c-d5a4-44d0-9e78-57a11e3c34b7","location":"Location 3","make":"Make 3","updated_at":"2023-02-28T12:15:00.000000","vehicle_registration":"DEF456","vehicle_type":"C"},{"created_at":"2023-02-28T09:00:00.000000","driver_id":"28f43756-8129-4ebc-bc60-1c55a409ea65","id":"f6cb075c-d5a4-44d0-9e78-57a11e3c34b8","location":"Location 4","make":"Make 4","updated_at":"2023-02-28T12:15:00.000000","vehicle_registration":"GHI789","vehicle_type":"B"}]

### GET /api/v1/vehicle/<vehicle_id>
Gets a certain vehicle given a vehicle ID

#### Sample Output
{"created_at":"2023-02-28T09:00:00.000000","driver_id":"28f43756-8129-4ebc-bc60-1c55a409ea62","id":"f6cb075c-d5a4-44d0-9e78-57a11e3c34b6","location":"Location 1","make":"Make 1","updated_at":"2023-02-28T12:15:00.000000","vehicle_registration":"ABC123","vehicle_type":"A"}

### GET /api/v1/trips/
Gets exclusive information about clients

#### Sample Output
[{"client_id":"28f43756-8129-4ebc-bc60-1c55a409ea62","created_at":"2023-02-28T09:00:00.000000","destination":"Destination 1","driver_id":"28f43756-8129-4ebc-bc60-1c55a409ea63","end_at":"Tue, 28 Feb 2023 12:15:00 GMT","id":"a50ea26d-9926-4b6a-8e5a-ea6c9d52b6e7","origin":"Origin 1","service_id":"36642cb9-792b-45d0-b216-ef147d1570ff","start_at":"Tue, 28 Feb 2023 09:00:00 GMT","status":"pending","updated_at":"2023-02-28T12:15:00.000000","vehicle_id":"f6cb075c-d5a4-44d0-9e78-57a11e3c34b6"},{"client_id":"28f43756-8129-4ebc-bc60-1c55a409ea64","created_at":"2023-02-28T09:00:00.000000","destination":"Destination 4","driver_id":"28f43756-8129-4ebc-bc60-1c55a409ea65","end_at":"Tue, 28 Feb 2023 12:15:00 GMT","id":"a50ea26d-9926-4b6a-8e5a-ea6c9d52b6ed","origin":"Origin 4","service_id":"36642cb9-792b-45d0-b216-ef147d157105","start_at":"Tue, 28 Feb 2023 09:00:00 GMT","status":"pending","updated_at":"2023-02-28T12:15:00.000000","vehicle_id":"f6cb075c-d5a4-44d0-9e78-57a11e3c34b7"},{"client_id":"28f43756-8129-4ebc-bc60-1c55a409ea65","created_at":"2023-02-28T09:00:00.000000","destination":"Destination 5","driver_id":null,"end_at":"Wed, 01 Mar 2023 10:45:00 GMT","id":"a50ea26d-9926-4b6a-8e5a-ea6c9d52b6ee","origin":"Origin 5","service_id":"36642cb9-792b-45d0-b216-ef147d157106","start_at":"Wed, 01 Mar 2023 08:30:00 GMT","status":"ongoing","updated_at":"2023-02-28T12:15:00.000000","vehicle_id":"f6cb075c-d5a4-44d0-9e78-57a11e3c34b8"}]

### GET /api/v1/trip/<trip_id>
Gets a certain trip given a trip ID

#### Sample Output
{"client_id":"28f43756-8129-4ebc-bc60-1c55a409ea62","created_at":"2023-02-28T09:00:00.000000","destination":"Destination 1","driver_id":"28f43756-8129-4ebc-bc60-1c55a409ea63","end_at":"Tue, 28 Feb 2023 12:15:00 GMT","id":"a50ea26d-9926-4b6a-8e5a-ea6c9d52b6e7","origin":"Origin 1","service_id":"36642cb9-792b-45d0-b216-ef147d1570ff","start_at":"Tue, 28 Feb 2023 09:00:00 GMT","status":"pending","updated_at":"2023-02-28T12:15:00.000000","vehicle_id":"f6cb075c-d5a4-44d0-9e78-57a11e3c34b6"}

# Errors are also handled as expected so far

## ENV VARIABLES
XT_ENV=dev XT_MYSQL_USER=xt_dev XT_MYSQL_PORT=3306 XT_MYSQL_DB=xt_dev_db XT_MYSQL_HOST=localhost XT_MYSQL_PWD=xt_dev_pwd
