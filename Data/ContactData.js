

const contacts = [
    {
        name: 'Slash',
        id: 1,
        image: "https://i.scdn.co/image/ab6761610000517416bbce3d5fb8a51e7cc3dce0",
        status: 'En linea',
        messages: [
            { author: 'Yo', id: 1, text: 'Hey brother how are you doing?', time: '10:30', estado: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
    <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
</svg>`},
            { author: 'Slash', id: 2, text: 'Hey man, I am fine, and you?', time: '10:35' },
            { author: 'Yo', id: 3, text: 'Nice, but I was wondering if you will release new Guns N Roses songs', time: '11:00' },
            { author: 'Slash', id: 4,text:  'Oh, of course, I am writing new guitar solos right now', time: '11:15' },
            { author: 'Yo', id: 5,text:  'Oh man that is great, I will be looking forward to hear them', time: '11:20' }
        ]
    },
    {
        name: 'Duff McKagan',
        id: 2,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd_5Ux7EeJzUEuBJsBuIWtdORkxKI3NIUpnA&s",
        status: 'Ocupado',
        messages: [
            { author: 'Yo', id: 1, text: 'Hey brother how are you doing?', time: '11:30' },
            { author: 'Duff McKagan', id: 2, text: 'Hey man, I am fine, and you?', time: '11:35' },
            { author: 'Yo', id: 3, text: 'Nice, but I was wondering if you will release new Guns N Roses songs', time: '12:00' },
            { author: 'Duff McKagan', id: 4,text:  'Oh, of course, I am writing new bass parts right now', time: '12:15' },
            { author: 'Yo', id: 5,text:  'Oh man that is great, I will be looking forward to hear them', time: '12:20' }
        ]
    },
    {
        name: 'Izzy Stradlin',
        id: 3,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXHi-36gkss7S9d8r78jcaQvFkMK-MFoNWVQpbxjN-SERsPogp-btx6Xi8E55DeI4OfLw&usqp=CAU",
        status: 'Ocupado',
        messages: [
            { author: 'Yo', id: 1, text: 'Hey brother how are you doing?', time: '12:30' },
            { author: 'Izzy Stradlin', id: 2, text: 'Hey man, I am fine, and you?', time: '12:35' },
            { author: 'Yo', id: 3, text: 'Nice, but I was wondering if you will release new Guns N Roses songs', time: '13:00' },
            { author: 'Izzy Stradlin', id: 4,text:  'Oh, of course, I am writing new guitar riffs right now', time: '13:15' },
            { author: 'Yo', id: 5,text:  'Oh man that is great, I will be looking forward to hear them', time: '13:20' }
        ]
    },
    {
        name: 'Steven Adler',
        id: 4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaNe2_wBHqwlzJKH_Zu6an0MTLgeODQLpmVA&s",
        status: 'En linea', 
        messages: [
            { author: 'Yo', id: 1, text: 'Hey brother how are you doing?', time: '13:30' },
            { author: 'Steven Adler', id: 2, text: 'Hey man, I am fine, and you?', time: '13:35' },
            { author: 'Yo', id: 3, text: 'Nice, but I was wondering if you will release new Guns N Roses songs', time: '14:00' },
            { author: 'Steven Adler', id: 4,text:  'Oh, of course, I am writing new drum parts right now', time: '14:15' },
            { author: 'Yo', id: 5,text:  'Oh man that is great, I will be looking forward to hear them', time: '14:20' }
        ]
    },
    {
        name: 'Axl Rose',
        id: 5,
        image: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-599805352-1.jpg",
        status: 'En linea',
        messages: [
            { author: 'Yo', id: 1, text: 'Hey brother how are you doing?', time: '14:30' },
            { author: 'Axl Rose', id: 2, text: 'Hey man, I am fine, and you?', time: '14:35' },
            { author: 'Yo', id: 3, text: 'Nice, but I was wondering if you will release new Guns N Roses songs', time: '15:00' },
            { author: 'Axl Rose', id: 4,text:  'Oh, of course, I am writing new lyrics right now', time: '15:15' },
            { author: 'Yo', id: 5,text:  'Oh man that is great, I will be looking forward to hear them', time: '15:20' }
        ]
    }
];

export default contacts