export type Login = {
    username: string,
    password: string
};

export const testData: { validLogin: Login, invalidLogin: Login } = {
    validLogin: {
        username: "tomsmith",
        password: "SuperSecretPassword"
    },

    invalidLogin: {
        username: "xxx",
        password: "xxx"
    }

}