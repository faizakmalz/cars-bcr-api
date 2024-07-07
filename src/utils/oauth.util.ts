import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { authService } from '../services/auth.service';
import { UsersModel } from '../models/users.model';

passport.use(new GoogleStrategy({
  clientID: '1020414211454-vhqkl708cateej0qsl84knc1ok6kslr7.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'https://resulting-roby-synrgy7-faza-1307d6b4.koyeb.app/api/v1/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => {
  // Save user to database here
  const user = {
    id: profile.id,
    email: profile.emails?.values,
    name: profile.displayName,
    role: 'customer'
  };
  
  // Save the user to your database
  await authService.register(user);
  done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});
