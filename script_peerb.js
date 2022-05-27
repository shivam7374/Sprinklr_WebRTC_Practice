document.querySelector(".offer_entered").addEventListener("click", async () => {
  console.log("here at peer b");
  const offer = JSON.parse(document.getElementById("remote_address").value);
  console.log(offer);
  const remoteConnection = await new RTCPeerConnection();
  remoteConnection.onicecandidate = (e) => {
    console.log(" NEW ice candidnat!! on localconnection reprinting SDP ");
    console.log(JSON.stringify(remoteConnection.localDescription));
    const local_address = document.getElementById("local_address");
    local_address.value = JSON.stringify(remoteConnection.localDescription);
  };

  remoteConnection.ondatachannel = (e) => {
    const receiveChannel = e.channel;
    receiveChannel.onmessage = (e) =>
      console.log("messsage received!!!" + e.data);
    receiveChannel.onopen = (e) => console.log("open!!!!");
    receiveChannel.onclose = (e) => console.log("closed!!!!!!");
    remoteConnection.channel = receiveChannel;
  };
  console.log(typeof offer + offer);
  await remoteConnection.setRemoteDescription(offer);

  //create answer
  await remoteConnection
    .createAnswer()
    .then((a) => remoteConnection.setLocalDescription(a))
    .then((a) => {
      console.log(JSON.stringify(remoteConnection.localDescription));
    });
  //send the anser to the client
});
