const Session = require("../models/session"); 

// calculate how long ago session was started

//TODO: try to refactor to filter out using time method in sql query

const monthAgo= new Date().getTime() - 2592000000;

const time = timestamp => { 
    return new Promise(resolve => { 
        var created = new Date(timestamp.toString().replace(/-/g,"/")).getTime(); 
        resolve(created);
    }).catch(error => { 
        console.error(error);
    });
}

const totalAmount = session => { 
    return session.attributes.status ? session.attributes.amount : -(session.attributes.amount);
}

const Last30DaySessionData = async () => { 
    try {
    const sessions = await Session.fetchAll(); 
    // save data object with each date and total for the day
    const data = [];
    sessions.forEach(async session => {
        var created = await time(session.attributes.created_at);
        if (session.attributes.isTermed && created > monthAgo) { 
            const date = new Date(session.attributes.created_at)
            dataforDay = data.find(datum => datum.date === date);
            if (dataforDay)
                dataforDay.amount += totalAmount(session)
            else {
                datum = {date: date,  amount: totalAmount(session)}
                data.push(datum);
            }
        }
    });
    return data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = (Last30DaySessionData);