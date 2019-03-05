const Session = require("../models/session"); 

// calculate how long ago session was started

const monthAgo= new Date().getTime() - 2592000000;

const totalAmount = session => { 
    return session.status ? session.amount : -(session.amount);
}

// fetch sessions from last 30 days
const Last30DaySessionData = async () => { 
    try {
    const sessions = await Session.query('where', await new Date('created_at').toString().replace(/-/g,"/").getTime(), '>', monthAgo).fetch(); 
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
    } catch (error) {
        console.error(error);
    }
    return data;
}

module.exports = (Last30DaySessionData);