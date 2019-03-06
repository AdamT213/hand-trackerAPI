const Session = require("../models/session"); 

// calculate how long ago session was started

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
    return session.status ? session.amount : -(session.amount);
}

const Last30DaySessionData = async () => { 
    try {
    const sessions = await Session.fetchAll(); 
    // save data object with each date and total for the day
    const data = {};
    sessions.forEach(async session => {
        var created = await time(session.attributes.created_at);
        if (session.attributes.isTermed && created > monthAgo) { 
            const date = new Date(session.attributes.created_at).toDateString()
            console.log(`date: ${date}`);
            if(data[date])
                data[date] += totalAmount(session);
            data[date] = totalAmount(session);
        }
    }); 
    } catch (error) {
        console.error(error);
    }
    return data;
}

module.exports = (Last30DaySessionData);