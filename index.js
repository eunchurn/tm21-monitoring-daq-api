import daq from "@src/daq.js";

daq.on("data", data => {
  console.log(data)
})