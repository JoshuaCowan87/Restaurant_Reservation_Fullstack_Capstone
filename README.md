# Restaurant Reservation
The Restaurant Reservation Fullstack App is the application I made for my final project for Thinkful's Software Engineering bootcamp. It allows the user to create, display and edit reservations as well as tables within the restaurant. The key feature that I really enjoy is the ability to change the status of reservations and tables by "seating" and "finishing" a reservation at a specific table, allowing the user to see which tables are free and which are occupied by specific reservations. The functionality allows the user to monitor all reservations by date, do basic search of reservations and track the status of each table.
Thinkful provided a series of user stories to offer insight into what the app user wants, providing the framework of what to build. Comprehensive tests were also provided to allow for TDD. The original instructions and user stories can be found here, https://github.com/Thinkful-Ed/starter-restaurant-reservation

## Deployment
coming soon

## Tech Stack
**Client:** React, Bootstrap
<br />
**Server:** Node, Express
<br />
**Database:** ElephantSQL

## API

| Request | Path | Function |
|:--------|:-----|:---------|
|GET| /reservations| list all reservations| 
|POST| /reservations| create new reservation|
|GET| /reservations/:reservation_id| list one reservation by reservation id|
|DELETE| /reservations/:reservation_id| delete reservation by reservation id|
|PUT| /reservations/:reservation_id| update reservation data
|GET| /reservation?mobile_number=`xxx-xxx-xxxx`|list reservations for specific phone number|
|GET| /reservations/byDate?Reservation_date='YYYY-MM-DD'| list all reservations on a specific date|
|PUT| /reservations/:reservationId/status| update reservation status|
|GET| /tables| list all tables|
|POST| /tables| create new table|
|PUT| /table:table_id/seat| update table status|
|DELETE| /tables/:table_id/seat| remove table status|

## Installation
```bash
1. Fork and clone this repository.
2. Run cp ./back-end/.env.sample ./back-end/.env.
3. Update the ./back-end/.env file with the connection URL's to your ElephantSQL database instance.
4. Run cp ./front-end/.env.sample ./front-end/.env.
5. You should not need to make changes to the ./front-end/.env file unless you want to connect to a backend at a location other than http://localhost:5000.
6. Run npm install to install project dependencies.
7. Run npm run start:dev to start your server in development mode.
```

## Improvements		
Some improvements I would like to make are increasing functions that can be done to tables, such as deleting or updating table data. I would also like to allow for two levels of usage. An admin side that has full functionality and a customer side that is allowed to only view availability abd create a reservation. For a restaurant, this would drastically reduce the number of phone calls and staff time manually entering reservations. This app could also benefit from more advanced styling. A notes section in the reservations would be helpful for important information such as listing if its someones birthday, VIP, etc. 
