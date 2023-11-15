import * as livekit from "livekit-server-sdk";

export const createToken = () => {
  try {
    const roomName = "quickstart-room";
    const participantName = "quickstart-username";

    const at = new livekit.AccessToken(
      "APIk645U8MckJHy",
      "BRxks3fY7udezPVhloXyzSk7fVeUlenFzo0a9miKrGbE",
      { identity: participantName }
    );
    at.addGrant({ roomJoin: true, room: roomName });

    return at.toJwt();
  } catch (error) {
    console.log(error);
    return "";
  }
};

console.log(createToken());
