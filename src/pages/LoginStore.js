import { types, destroy } from 'mobx-state-tree'

const Login = types.model('Login', {
    email: types.string,
    pass: types.string
})

const LoginStore = types.model('Login', {
    logins: types.array(Login)
})
.actions(self => ({
    loginUser() {
        if (email == "Test" & (pass == "Test")){
            this.props.navigation.navigate('Home')
        }else {
            alert("Nope")
        }
    }
}))
.create({
    user: [{
        email: "Test",
        pass:  "Test"
    }]
})

export default LoginStore