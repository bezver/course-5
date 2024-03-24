import App from './App';
import Blog from './Blog/Blog';
import LoginForm from './Auth/LoginForm';
import PostComments from './Post/PostComments';
import Profile from './User/Profile';
import RegisterForm from './Auth/RegisterForm';
import ResetPasswordForm from './Auth/ResetPasswordForm';
import UserGrid from './User/UserGrid';
import useUser from '../contexts/user-context/useUser';
import VerifyUser from './Auth/VerifyUser';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export default function Router() {
  const { isAuth } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? (
          <>
            <Route path="/" element={<App />}>
              <Route path="/users" element={<UserGrid />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/blogs/:userId" element={<Blog />} />
              <Route path="/posts/:postId/comments" element={<PostComments />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/verify-user/:verificationToken" element={<VerifyUser />} />
            <Route path="/reset-password/:resetToken" element={<ResetPasswordForm />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
