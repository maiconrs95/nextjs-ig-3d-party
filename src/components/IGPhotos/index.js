import React, { useEffect, useState } from "react";

import { igGraphService, fbGraphService } from "../../services/ig-service";

const IGMedia = ({ media_id, media_url, media_type }) => {
  return (
    <span>
      {media_type === "IMAGE" ? (
        <img src={media_url} width={150} alt={media_id} />
      ) : (
        <p>Loading</p>
      )}
    </span>
  );
};

const IGPhotos = () => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await igGraphService.get(`/me/media`, {
        params: {
          fields: "id,caption,media_url,media_type,caption",
        },
      });

      console.log(data);
      setMedias(data.data);
    })();
  }, []);

  return (
    <div
      style={{
        maxWidth: "750px",
        margin: "0 auto",
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "repeat(auto-fill, 150px)",
      }}
    >
      {medias.map(({ id, media_url, media_type }) => (
        <IGMedia
          key={id}
          media_id={id}
          media_url={media_url}
          media_type={media_type}
        />
      ))}
    </div>
  );
};

export default IGPhotos;
