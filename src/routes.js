
// Import the "wrap" function
import { wrap } from 'svelte-spa-router'

// Components
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'
import NotFound from './routes/NotFound'
import UserProfile from './routes/user/Profile'
import Quote from './routes/Quote'
import SingleQuote from './routes/admin/SingleQuote'
import Quotes from './routes/admin/Quotes'
import Privacy from './routes/Privacy'
import Contact from './routes/Contact'
import Forgot from './routes/Forgot'
import Reset from './routes/Reset'
import AdminUsers from './routes/admin/Users'
import UserPage from './routes/admin/UserPage'
import Settings from './routes/admin/Settings'
import userStore from './stores/userStore'
import jwt_decode from 'jwt-decode'
import ls from 'local-storage'
import * as api from './helpers/api'

let isAdmin = false;
const token = ls.get('jwt')

/* This will resfresh user data on the userStore only if browser reloads */
if(token){
    const decoded = jwt_decode(token)
    isAdmin = decoded.role === 'admin'
    
    if( Date.now() >= decoded.exp * 1000 ){
        ls.remove('jwt');
        return window.location.replace('/')      
    } else {
        async function getUser(){
            try {
                const res = await api.post(`user/account`, {}, token)
                await userStore.setUser(res.user)
    
            } catch (error) {
                ls.remove('jwt');
                window.location.replace('/')            
            }
        }
        getUser();
    }
}

let routes

routes = new Map()

routes.set('/', Home)
routes.set('/brand', Home)
routes.set('/login', wrap(Login, (detail) => { 
    if(!token) return true
}))
routes.set('/register', wrap(Register, (detail) => {
    if(!token) return true
}))
routes.set('/user/profile', wrap(UserProfile, detail => {
    if(token) return true
}))
routes.set('/admin/users/:page', wrap(AdminUsers, detail => {
    if(isAdmin) return true
}))
routes.set('/admin/user/:id', wrap(UserPage, detail => {
    if(isAdmin) return true
}))
routes.set('/admin/quotes/:page', wrap(Quotes, detail => {
    if(isAdmin) return true 
}))
routes.set('/admin/quote/:id', wrap(SingleQuote, detail => {
    if(isAdmin) return true
}))
routes.set('/admin/settings', wrap(Settings, detail => {
    if(isAdmin) return true
}))
routes.set('/quote', Quote)
routes.set('/privacy', Privacy)
routes.set('/contact', Contact)
routes.set('/forgot', Forgot)
routes.set('/reset/:resetToken', Reset)
routes.set('*', NotFound)

export default routes
