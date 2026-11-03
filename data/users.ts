type UserCredentials = {
    username: string;
    password: string;
};

type Users = {
    STANDARD_USER: UserCredentials;
    INVALID_USER: UserCredentials;
};

export const users: Users = {
    STANDARD_USER: {
        username: 'standard_user',
        password: 'secret_sauce',
    },
    INVALID_USER: {
        username: 'invalid_user',
        password: 'invalid_password',
    }
};
