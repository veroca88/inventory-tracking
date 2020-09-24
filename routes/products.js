const express = require("express");
const router = express.Router();
const codeReader = new ZXing.BrowserQRCodeReader();

router.get("/", (req, res, next) => {
  res.render("products");
});

router.post("/", (req, res, next) => {
  codeReader
    .listVideoInputDevices()
    .then((videoInputDevices) => {
      videoInputDevices.forEach((device) =>
        console.log(`${device.label}, ${device.deviceId}`)
      );
    })
    .catch((err) => console.error(err));

  const firstDeviceId = videoInputDevices[0].deviceId;

  codeReader
    .decodeOnceFromVideoDevice(firstDeviceId, "video")
    .then((result) => console.log(result.text))
    .catch((err) => console.error(err));
});

module.exports = router;
