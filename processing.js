const _ = require('lodash');
const send = require('./send');
let waitUserId = null;
const couples = [];
module.exports = async ({user_id: userId, body: text, payload}) => {
    userId = +userId;
    const index = _.findIndex(couples, arr  => _.indexOf(arr, userId) !== -1);
    
    if(index === -1){
        if(!waitUserId){
            waitUserId = userId;
            await send(userId, 'Ждем собеседника...');
            return
        } else {
            couples.push([userId, waitUserId]);
            const text = "Поприветствуйте собеседника";
            await send(userId, text);
            await send(waitUserId, text);
            waitUserId = null;
            return;
        }
    } else {
        const couple = couples[index];
        const to = _.indexOf(couple, userId) === 0 ? couple[1] : couple[0];
       
       
        let button;
    try {
        button = +JSON.parse(payload).button;
    } catch (error) { // eslint-disable-line
        
    }
    console.log(button);
    if (button === 1) {
        couples.splice(index, 1)
        await send(to, 'Собеседник отключился');
        await send(userId, 'Чат остановлен');
        return;
    } 

    await send(to, text);
};
    }
    
    
    


    