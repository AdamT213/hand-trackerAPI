const Session = require("../models/session"); 

// calculate how long ago session was started

const currentDay = new Date().getTime();
const age = (date, current) => { 
    return current - (new Date(date).getTime());
} 

const totalAmount = session => { 
    return session.status ? session.amount : -(session.amount);
}

// fetch sessions from last 30 days
const Last30DaySessionData = () => { 
    const sessions = Session.query('where', age('created_at', currentDay), '<', 2592000).fetch(); 
    console.log(`sessions: ${sessions}`);
    // save data object with each date and total for the day
    const data = {};
    sessions.forEach(session => { 
        if (session.isTermed) { 
            if(data[new Date(session.created_at).toDateString()]) 
                data[new Date(session.created_at).toDateString()] += totalAmount(session);
            data[new Date(session.created_at).toDateString()] = totalAmount(session);
        }
    }); 
    return data;
}

module.exports = (Last30DaySessionData);