import "@livekit/components-styles";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useLayoutEffect, useState } from "react";
import {
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
  Track,
  VideoPresets,
  VideoQuality,
} from "livekit-client";

function App() {
  const wsUrl = "https://www.gdscmeet.live:7880";
  const [token, setToken] = useState<string>(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6InF1aWNrc3RhcnQtcm9vbSJ9LCJpYXQiOjE3MDAwNDQzMTUsIm5iZiI6MTcwMDA0NDMxNSwiZXhwIjoxNzAwMDY1OTE1LCJpc3MiOiJBUElrNjQ1VThNY2tKSHkiLCJzdWIiOiJxdWlja3N0YXJ0LXVzZXJuYW1lIiwianRpIjoicXVpY2tzdGFydC11c2VybmFtZSJ9.p2hMF_AnYRDnlSB8L0ypuIlMltOX3SWPTAkD_ZHNSmE"
  );
  const [room, setRoom] = useState<Room | null>(null);

  useLayoutEffect(() => {
    if (!room) return;
    room.localParticipant;
  }, [room]);

  function handleTrackSubscribed(
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant
  ) {
    console.log("track subscribed", track, publication, participant);
    if (track.kind === Track.Kind.Video) {
      publication.setVideoQuality(VideoQuality.LOW);
    }
  }

  const connectToRoom = async () => {
    const _room = new Room({
      adaptiveStream: true,
      dynacast: true,
      videoCaptureDefaults: {
        resolution: VideoPresets.h540.resolution,
      },
    });

    await _room.connect(wsUrl, token);
    await _room.localParticipant.enableCameraAndMicrophone();
    await _room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
    setRoom(_room);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <input value={token} onChange={(e) => setToken(e.target.value)} />
        <button onClick={() => connectToRoom()}>Join</button>
        <button>Create Token</button>
      </div>
      <div>
        {room && (
          <LiveKitRoom
            room={room}
            video={true}
            audio={true}
            token={undefined}
            connectOptions={{ autoSubscribe: false }}
            serverUrl={undefined}
            style={{ height: "100vh" }}
          >
            <VideoConference />
          </LiveKitRoom>
        )}
      </div>
    </div>
  );
}

export default App;

{
  /* <input
type="text"
value={token}
onChange={(e) => setToken(e.target.value)}
></input>
<button
onClick={() => {
  const t = createToken();
  setToken(t);
}}
>
Gen Token
</button>
<button
onClick={() => {
  setJoin(!join);
}}
>
Join
</button>
{join && (
<LiveKitRoom
  video={true}
  audio={true}
  token={token}
  connectOptions={{ autoSubscribe: false }}
  serverUrl={wsUrl}
  data-lk-theme="default"
  style={{ height: "100vh" }}
>
  <RoomAudioRenderer />
</LiveKitRoom>
)} */
}

function connect(
  arg0: string,
  token: string,
  arg2: { audio: boolean; video: boolean }
) {
  throw new Error("Function not implemented.");
}

