const Session = require("../models/session"); 

// calculate how long ago session was started

const monthAgo= new Date().getTime() - 2592000000;

const time = timestamp => { 
    return new Date(timestamp).toString().replace(/-/g,"/").getTime()
}

const totalAmount = session => { 
    return session.status ? session.amount : -(session.amount);
}

const Last30DaySessionData = async () => { 
    try {
    const sessions = await Session.fetchAll(); 
    console.log(`sessions: ${sessions}`);
    // save data object with each date and total for the day
    const data = {};
    sessions.forEach(session => { 
        console.log(`made it this far`)
        console.log(await (time(session.created_at)))
        console.log(monthAgo)
        if (session.isTermed && time(session.created_at) > monthAgo) { 
            console.log('still with ya')
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