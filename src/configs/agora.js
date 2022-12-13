import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = "3cea8b5d4b3b4387abfade361d6acbd5";
const TOKEN =
	"007eJxTYJi+NiZuif/UPwv2292ND1wn0idtbrKtyqWKv3k5/6GeQzYKDMbJqYkWSaYpJknGSSbGFuaJSWmJKanGZoYpZonJSSmm5wKnJzcEMjJM841nZmSAQBCfnSGxoMA5I7GEgQEAvtAg6Q==";
const CHANNEL = "appChat";

const client = AgoraRTC.createClient({
	mode: "rtc",
	codec: "vp8",
});

export { APP_ID, TOKEN, CHANNEL };
export default client;
