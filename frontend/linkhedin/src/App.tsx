import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import AfterRegister from "./pages/auth/AfterRegister"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import Home from "./pages/Home"
import { setContext } from '@apollo/client/link/context'
import MyNetwork from "./pages/MyNetwork"
import Jobs from "./pages/Jobs"
import Messaging from "./pages/Messaging"
import Notification from "./pages/Notification"
import ProfilePage from "./pages/ProfilePage"
import SearchPage from "./pages/SearchPage"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // uri: "http://localhost:8080/query"
  link: createHttpLink({
    uri: "http://localhost:8080/query",
    fetch,
  })
})

const authLink = setContext((_, { header }) => {
  return {
    headers: {
      ...header,
      authorization: localStorage.getItem("token") || ""
    }
  }
})

function App() {

  return (
    <ApolloProvider client={ client }>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/after-register/:url" element={<AfterRegister />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/home" element={<Home /> }/>
              <Route path="/my-network" element={<MyNetwork />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/messaging" element={<Messaging />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/reset-password/:url" element={<ResetPassword />} />
              <Route path="/search/:input" element={<SearchPage />} />
          </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )

}

export default App
