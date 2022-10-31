import React from 'react';
import axios from 'axios';

function DiscordService( ) {
    
    const Send = async (data) => {
        const body = {
          content: 'Message Recieved',
          tts: false,
          embeds: [
            {
                title: 'Contact Message',
                description: data,
            }
          ]
        };

       try {
           const data = await axios.post(
            'https://discord.com/api/webhooks/1023874528612458507/ON9d0mPOjEh2rHZTtNxMy7J-3OMb0hO6riTBAjLzs8oPO3bFGorbalWWcv3lYsnTWA-R',
            body
        );
       } catch (error) {
       }
    };
    return{
        Send,
    };
}

export default DiscordService;