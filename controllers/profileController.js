// profileCreateGet, profileCreatePost, profileGet, profileEdit, profileDelete

import User from '../models/user.js';

const testUser = new User({
	name: 'kai',
	birthdate: '1-5-56',
	email: 'jfdja',
	hobbies: ['hodsa', 'hofda', 'kfa'],
});

export function logUser() {
	console.log(testUser);
}
