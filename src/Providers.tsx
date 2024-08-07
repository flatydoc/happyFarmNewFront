import { Outlet } from "react-router-dom";
import WebApp from "@twa-dev/sdk";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./core/theme/theme";
import { useAuth } from "./core/hooks/useAuth";
import { AuthContext } from "./core/context/AuthContext";
import { Loader } from "./pages/Loader";
import io from "socket.io-client";
import { QRCode } from "./QRCode";
import {
  I18nextProvider,
  initReactI18next,
  useTranslation,
} from "react-i18next";
import { resources } from "./locales";
import i18n from "i18next";

const getLng = () => {
  const language = WebApp.initDataUnsafe.user?.language_code;
  if (language === "ru") {
    return "ru";
  } else return "en";
};

i18n.use(initReactI18next).init({
  lng: getLng(),
  fallbackLng: "en",
  resources,
});

export const Providers = () => {
  WebApp.expand();
  const { isLogin, user, isLoading, token } = useAuth();
  const { i18n: LocaleConfig } = useTranslation();

  const platform = WebApp.platform;
  if (
    platform !== "android" &&
    platform !== "android_x" &&
    platform !== "ios"
  ) {
    return <QRCode />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const socket = io("https://happyfarmclicker.shop/", {
    query: {
      token,
      telegramId: user?.telegramId,
    },
    path: "/test/socket.io",
  });

  return (
    <AuthContext.Provider value={{ isLogin, user, socket }}>
      <I18nextProvider i18n={LocaleConfig}>
        <ThemeProvider theme={theme}>
          <Outlet />
        </ThemeProvider>
      </I18nextProvider>
    </AuthContext.Provider>
  );
};
