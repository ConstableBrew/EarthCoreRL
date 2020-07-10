import {Component} from 'geotic';

export class Animation extends Component {
    static properties = {
        frames: [ // Key frames, array of Appearance objects
            {char: '-'},
            {char: '\\'},
            {char: '|'},
            {char: '/'},
        ],
        duration: 1000,
        start: 0,
    };

    onUpdate(event) {
        const {frames, duration, start} = this.animation;
        const timestamp = event.data.timestamp;
        const frame = Math.abs(((timestamp - start) % duration) / duration * frames.length) | 0;
        this.appearance = {
            ...this.appearance,
            ...this.frames[frame],
        };
    }
}


// Manual testing:

// const char = {
//     appearance: {
//         char: '*',
//     },
//     frames: [ // Key frames, array of Appearance objects
//         {char: '-'},
//         {char: '\\'},
//         {char: '|'},
//         {char: '/'},
//     ],
//     duration: 1000,
//     start: Date.now(),
//         const frame = Math.abs(((timestamp - start) % duration) / duration * frames.length) | 0;
//         this.appearance = {
//             ...this.appearance,
//             ...this.frames[frame],
//         };
//     },
// };
// const start = Date.now();
// const loop = () => setTimeout(() => {
//     char.onUpdate({data: {timestamp: Date.now()}});
//     console.log(char.appearance.char);
//     if (Date.now() - start < 5000) loop();
// }, 50);