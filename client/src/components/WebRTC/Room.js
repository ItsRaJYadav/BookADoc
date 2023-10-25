import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';

function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
        maxPos = chars.length,
        i;
    len = len || 5;
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export function getUrlParams(
    url = window.location.href
) {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
}

export default function App() {
    const { roomID } = useParams();
    let myMeeting = async (element) => {

        // generate Kit Token
        const appID = parseInt(process.env.REACT_APP_ID);
        const serverSecret = process.env.REACT_APP_SECRET;
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), 'type your name here');

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
        });
    };

    return (
        <div
            className="myCallContainer"
            ref={myMeeting}
            style={{ width: '100vw', height: '91.5vh' }}
        ></div>
    );
}