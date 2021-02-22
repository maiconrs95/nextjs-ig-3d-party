import FormData from "form-data";
import { igApiService, igGraphService } from "../../services/ig-service";

import { REDIRECT_URI } from "../../constants/config";

export default async (req, res) => {
  try {
    const code = (req.body && req.body.code) ?? null;
    const body = new FormData();

    body.append("client_id", 480414736298190);
    body.append("client_secret", "664c307fb230121a91e88a4993f7b249");
    body.append("grant_type", "authorization_code");
    body.append("redirect_uri", REDIRECT_URI);
    body.append("code", code);

    const { data } = await igApiService.post("/oauth/access_token", body, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=<calculated when request is sent>",
      },
    });

    console.log(data);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.response });
  }
};
