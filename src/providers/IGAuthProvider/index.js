import axios from "axios";
import { useEffect, createContext, useContext, useState, useMemo } from "react";

import { useRouter } from "next/router";

import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "../../constants/config";
import {
  igApiService,
  igGraphService,
  fbGraphService,
} from "../../services/ig-service";

const IGAuthContext = createContext({});

const IGAuthProvider = ({ children }) => {
  const route = useRouter();
  const [data, setData] = useState({});

  useEffect(() => {
    // GET AUTH CODE
    const code = (route && route.query && route.query.code) ?? null;
    const hasCode = Boolean(code);

    if (hasCode && !data.isLogged) {
      (async () => {
        try {
          const body = new FormData();
          body.append("client_id", CLIENT_ID);
          body.append("client_secret", CLIENT_SECRET);
          body.append("grant_type", "authorization_code");
          body.append("redirect_uri", REDIRECT_URI);
          body.append("code", code);

          // GET TEMPORARY TOKEN BY AUTH CODE
          const response = await igApiService.post(
            "/oauth/access_token",
            body,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data; boundary=<calculated when request is sent>",
              },
            }
          );

          // GET LONG LIFE TOKEN 60 dias
          const { data } = await igGraphService.get("/access_token", {
            params: {
              access_token: response.data.access_token,
              grant_type: "ig_exchange_token",
              client_secret: CLIENT_SECRET,
            },
          });

          const accessTokenInterceptor = (config) => ({
            ...config,
            params: {
              ...config.params,
              access_token: data.access_token,
            },
          });

          fbGraphService.interceptors.request.use(accessTokenInterceptor);
          igGraphService.interceptors.request.use(accessTokenInterceptor);

          const userData = {
            isLogged: true,
            user_id: response.data.user_id,
            access_token: data.access_token,
          };

          setData(userData);
          route.push("/");
        } catch (e) {
          console.log("AUTH:ERROR:", e);
        }
      })();
    }
  }, [route]);

  return (
    <IGAuthContext.Provider value={data}>{children}</IGAuthContext.Provider>
  );
};

export function useIGAuthConsumer() {
  const context = useContext(IGAuthContext);

  return context;
}

export default IGAuthProvider;
