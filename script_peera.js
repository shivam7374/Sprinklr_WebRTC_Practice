const localConnection = new RTCPeerConnection();

localConnection.onicecandidate = (e) => {
  console.log(" NEW ice candidnat!! on localconnection reprinting SDP ");
  console.log(JSON.stringify(localConnection.localDescription));
  const local_address = document.getElementById("local_address");
  local_address.value = JSON.stringify(localConnection.localDescription);
};

const sendChannel = localConnection.createDataChannel("sendChannel");
sendChannel.onmessage = (e) => console.log("messsage received!!!" + e.data);
sendChannel.onopen = (e) => console.log("open!!!!");
sendChannel.onclose = (e) => console.log("closed!!!!!!");

localConnection
  .createOffer()
  .then((o) => localConnection.setLocalDescription(o));

document.querySelector(".accept_answer").addEventListener("click", async () => {
  const answer = JSON.parse(document.getElementById("remote_address").value);
  localConnection.setRemoteDescription(answer).then((a) => console.log("done"));
  console.log("bro hogya");
});
