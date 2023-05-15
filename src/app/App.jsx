import { Route, Routes } from 'react-router-dom'

import React, {useContext} from 'react'

import AuctionsPage from '../pages/pageAuctions/AuctionsPage.jsx'
import CabinetPage from '../pages/pageCabinet/CabinetPage.jsx'
import MainPage from '../pages/pageMain/MainPage.jsx'
import MyAuctionsPage from '../pages/pageMyAuctions/MyAuctionsPage.jsx'
import NewsPage from '../pages/pageNews/NewsPage.jsx'
import NotificationsPage from '../pages/pageNotifications/NotificationsPage.jsx'
import PartnerPage from '../pages/pagePartnerProgram/PartnerPage.jsx'
import QuestionsPage from '../pages/pageQuestions/QuestionsPage.jsx'
import SupportPage from '../pages/pageSupport/SupportPage.jsx'
import TokensPage from '../pages/pageTokens/TokensPage.jsx'
import WinnersListPage from '../pages/pageWinnersList/WinnersListPage.jsx'
import LotPage from '../pages/pageAuctions/LotPage/LotPage.jsx'

import MainSection from '../Components/MainSection/MainSection.jsx'
import NavHeader from '../Components/NavHeaderSection/NavHeader.jsx'

import LogIn from '../pagesAuthorization/PageLogIn/LogIn.jsx'
import SignIn from '../pagesAuthorization/PageSignIn/SignIn.jsx'
import ResetPassword from '../pagesAuthorization/PageResetPassword/ResetPassword.jsx'
import NewPassword from '../pagesAuthorization/PageNewPassword/NewPassword.jsx'

import './App.scss'
import {UserContextProvider} from "../context/AuthContext";

const App = () => {
  return (
      <UserContextProvider>
        <div className="app">
          <Routes>
            <Route element={<MainSection />}>
              <Route path="/auctions" element={<AuctionsPage title={'Auction'} />} />
              <Route path="/*" element={<MainPage title={'Main'} />} index />
              <Route path="/myauctions" element={<MyAuctionsPage title={'My Auctions'} />} />
              <Route path="/news" element={<NewsPage title={'News'} />} />
              <Route path="/partnerProgram" element={<PartnerPage title={'Partner Program'} />} />
              <Route path="/tokens" element={<TokensPage title={'Tokens'} />} />
              <Route path="/winnerList" element={<WinnersListPage title={'WinnerList'} />} />
              <Route path="/Lot" element={<LotPage title={'Lot №1'} />} />
              <Route path="/cabinet" element={<CabinetPage title={'Cabinet'} />} />
            </Route>

            <Route element={<NavHeader />}>
              <Route path="/cabinet" element={<CabinetPage title={'Cabinet'} />} />
              <Route path="/notifications" element={<NotificationsPage title={'Notifications'} />} />
              <Route path="/questions" element={<QuestionsPage title={'Questions'} />} />
              <Route path="/support" element={<SupportPage title={'Support'} />} />
            </Route>

            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/NewPassword" element={<NewPassword />} />
          </Routes>
        </div>
      </UserContextProvider>

  )
}

export default App
