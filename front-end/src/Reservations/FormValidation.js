

function FormValidation (reservation) {
    let errors = [];
    let errorMessages = [
        "Reservation must be in the future",
        "Restaurant is Closed on Tuesdays",
        "Reservations must be between 1030am and 930pm",
      ];

    //reservation must be in the future
        let date = new Date(reservation.reservation_date);
        console.log("form validation date", date)
        let today = new Date();
        console.log("from validation, today", today)
        if (today > date) {
          if (!errors.includes(errorMessages[0])) {
            errors.push("Reservation must be in the future");       
          }
        }
         
      //reservation cannot be on a tuesday
        let day = date.getUTCDay();
        if (day === 2) {
          if (!errors.includes(errorMessages[1])) {
            errors.push("Restaurant is Closed on Tuesdays");   
          }
        }
        
      
      //reservation must be between 1030am and 930pm
const time = reservation.reservation_time
        if (time < "10:30" || time > "21:30") {
          if (!errors.includes(errorMessages[2])) {
            errors.push("Reservations must be between 1030am and 930pm");          
          }
          }
      
      return errors

}

export default FormValidation;