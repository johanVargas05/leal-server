import * as bcrypt from 'bcrypt';

interface SeedUser {
    email:    string;
    fullName: string;
    password: string;
    roles:     string[];
    points:  number;
}

export const initialData:{users:SeedUser[]} = {
    users: [
        {
            email: 'test1@google.com',
            fullName: 'Cristian Cruz',
            password: bcrypt.hashSync( 'Abc123', 10 ),
            roles: ['admin', 'user'],
            points: 100000
        },
        {
            email: 'test2@google.com',
            fullName: 'Nicolas Rozo',
            password: bcrypt.hashSync( 'Abc123', 10 ),
            roles: ['user'],
            points: 10000000
        },

    ],

}