## Greeting Command
```
start bot
command greet(firstname: string, lastname?: string) {
    var message = "Hello, " + firstname;
    
    if (lastname !== undefined) {
        message = message + " " + lastname;
    }
    message = message + "!";

    reply(message);
}
end bot

token = *TOKEN*,
clientID = *client_id*,
guildId = *guild_id*
```

Results in: 

<img width="1104" alt="image" src="https://user-images.githubusercontent.com/50648660/193162062-3f4249f0-927d-496f-b48e-905fecf4352c.png">
<img width="295" alt="image" src="https://user-images.githubusercontent.com/50648660/193162089-68a57ba9-ea98-4afb-aa38-f8da971e6c4b.png">


## Polling Command
```
start bot

var optionEmojis = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

command poll(
    topic: string,
    option1: string, 
    option2: string, 
    option3?: string, 
    option4?: string, 
    option5?: string, 
    option6?: string, 
    option7?: string,
    option8?: string, 
    option9?: string, 
    option10?: string
) {
    var optionals = [option3, option4, option5, option6, option7, option8, option9, option10];

    var message = "NEW POLL: " + topic + "\n\n\t" + get(optionEmojis, 0) + " " + option1 + "\n\t" + get(optionEmojis, 1) + option2 + "\n";

    var currentEmoji = 2;       // are we doing 0 based indexing? if not add 1
    var reactionsNeeded = 2;

    forEach(optional : optionals) {
        if (optional != undefined) {
            message = message + "\t" + get(optionEmojis, currentEmoji) + optional + "\n";
            currentEmoji = currentEmoji + 1;
            reactionsNeeded = reactionsNeeded + 1;
        }
    }

    reply(message);

    var counter = 0;
    while (counter < reactionsNeeded) {
        react(get(optionEmojis, counter));
    }
}

end bot

token = *TOKEN*,
clientID = *client_id*,
guildId = *guild_id*
```

Results in:

<img width="1101" alt="image" src="https://user-images.githubusercontent.com/50648660/192076596-8f15c39a-5edc-4857-a85b-b2ca2b8e2a98.png">

<img width="325" alt="image" src="https://user-images.githubusercontent.com/50648660/192076578-7b48cd9b-00b7-4142-b1ec-67498a881428.png">