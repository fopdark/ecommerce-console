import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import ProductCategory from './pages/Product';
import Customer from './pages/Customer';
import ServiceLevel1 from './pages/Service/ServiceLevel1';
import Service from './pages/Service';
import { CommonContext } from './context/CommonContext';
import IntroduceList from './pages/Introduce';
import ContactForm from './pages/Contact';
import FooterForm from './pages/Footer';
import Policy from './pages/Policy';
import Project from './pages/Project';
import WhyChooseUsForm from './pages/WhyChooseUs';
import SliderPage from './pages/Slider';
import Feedbacks from './pages/Feedback';
import SettingForm from './pages/Setting';
import AdviseList from './pages/Advise';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { access_token, handleSetAccessToken, handleSetUser } =
    useContext(CommonContext);
  const tokenLocalStorage = localStorage.getItem('access_token');
  const userLocalStorage = localStorage.getItem('user');
  // const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!tokenLocalStorage) {
      navigate('/auth/signin');
    }
  }, [tokenLocalStorage]);

  useEffect(() => {
    tokenLocalStorage && handleSetAccessToken(tokenLocalStorage);
    userLocalStorage && handleSetUser(JSON.parse(userLocalStorage));
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard | DiepKienHuy" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/product/category"
          element={
            <>
              <PageTitle title="Product | DiepKienHuy" />
              <ProductCategory />
            </>
          }
        />
        <Route
          path="/media"
          element={
            <>
              <PageTitle title="Media | DiepKienHuy" />
              <ProductCategory />
            </>
          }
        />
        <Route
          path="/customer/getInfo"
          element={
            <>
              <PageTitle title="Customer | DiepKienHuy" />
              <Customer />
            </>
          }
        />
        <Route
          path="/service/level1"
          element={
            <>
              <PageTitle title="Service Level 1 | DiepKienHuy" />
              <ServiceLevel1 />
            </>
          }
        />
        <Route
          path="/service/list"
          element={
            <>
              <PageTitle title="Service | DiepKienHuy" />
              <Service />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SettingForm />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | DiepKienHuy" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/introduce"
          element={
            <>
              <PageTitle title="Introduce | DiepKienKuy" />
              <IntroduceList />
            </>
          }
        />
        <Route
          path="/advise"
          element={
            <>
              <PageTitle title="Advise | DiepKienKuy" />
              <AdviseList />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <PageTitle title="Contact | DiepKienKuy" />
              <ContactForm />
            </>
          }
        />
        <Route
          path="/footer"
          element={
            <>
              <PageTitle title="Footer | DiepKienKuy" />
              <FooterForm />
            </>
          }
        />
        <Route
          path="/policy"
          element={
            <>
              <PageTitle title="Policy | DiepKienKuy" />
              <Policy />
            </>
          }
        />
        <Route
          path="/project"
          element={
            <>
              <PageTitle title="Project | DiepKienKuy" />
              <Project />
            </>
          }
        />
        <Route
          path="/why"
          element={
            <>
              <PageTitle title="Why Choose Us | DiepKienKuy" />
              <WhyChooseUsForm />
            </>
          }
        />
        <Route
          path="/slider"
          element={
            <>
              <PageTitle title="Slider | DiepKienKuy" />
              <SliderPage />
            </>
          }
        />
        <Route
          path="/feedback"
          element={
            <>
              <PageTitle title="Feedback | DiepKienKuy" />
              <Feedbacks />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
