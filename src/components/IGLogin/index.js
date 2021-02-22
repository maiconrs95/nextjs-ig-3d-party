import React from "react";

import * as S from "./styles";

import { REDIRECT_URI } from "../../constants/config";

const CONFIG = {
  API_URL: "https://api.instagram.com/oauth/authorize",
  CLIENT_ID: 480414736298190,
  SCOPE: "user_profile,user_media",
  RESPONSE_TYPE: "code",
};

const IGLogin = () => (
  <div>
    <S.IGButton
      id="IGButtonLink"
      href={`${CONFIG.API_URL}?client_id=${CONFIG.CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${CONFIG.SCOPE}&response_type=${CONFIG.RESPONSE_TYPE}`}
    >
      Entrar com o instagram
    </S.IGButton>
  </div>
);

export default IGLogin;
