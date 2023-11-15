const livekit = require("livekit-server-sdk");
const express = require("express");
const http = require("http");
const io = require("socket.io-client");

const socket = io("ws://localhost:8000");

const livekitHost = "https://www.gdscmeet.live";
const roomName = "quickstart-room";
const participantName = "quickstart-username";
const roomService = new livekit.RoomServiceClient(
  livekitHost,
  "APIk645U8MckJHy",
  "BRxks3fY7udezPVhloXyzSk7fVeUlenFzo0a9miKrGbE"
);

socket.emit("hello", { message: "Hello from the client!" });
