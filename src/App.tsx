import { useEffect } from 'react';

import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, } from 'react-router-dom';
import PostPage from './pages/post';
import HomePage from './pages//home/page';
import AmityService from './services/amity/amity.service';
import { ChakraProvider } from '@chakra-ui/react';
import ThreadDetail from './pages/thread/[id]/page';
import NewsPage from './pages/news/page';
import UserProfile from './pages/user/profile/page';
import TagDetailPage from './pages/tag/[id]/page';
import AllTagPage from './pages/tag/page';
import SignUpPage from './pages/signup/page';
import LoginPage from './pages/login/page';
import { auth } from './services/firebase/firebase.service';
import CommunityDetailPage from './pages/community/[id]/page';
import AllCommunityPage from './pages/community/page';

function App() {
  console.log("Render App function");
  useEffect(() => {
    AmityService.getAmityService();
  }, [])
  console.log(process.env.REACT_APP_DEFAULT_COMMUNITY_ID)
  return (
    <div className="App">


      <div>
        <ChakraProvider>
          <Switch>

            <Route exact path="/">
              <HomePage />
            </Route>

            <Route path="/post">
              <PostPage />
            </Route>

            <Route path="/thread/:id">
              <ThreadDetail />
            </Route>

            <Route path="/news">
              <NewsPage />
            </Route>

            <Route exact path="/tag">
              <AllTagPage />
            </Route>

            <Route path="/tag/:id">
              <TagDetailPage />
            </Route>

            <Route exact path="/community">
              <AllCommunityPage />
            </Route>

            <Route path="/community/:id">
              <CommunityDetailPage />
            </Route>

            <Route path="/user/profile">
              <UserProfile />
            </Route>

            <Route path="/login">
              <LoginPage />
            </Route>

            <Route path="/signup">
              <SignUpPage />
            </Route>

          </Switch>
        </ChakraProvider>
      </div>




    </div>
  );
}

export default App;
