import { Parser } from "binary-parser");

const daqParser = new Parser()
  .uint32be("header")
  .int8("noCh")
  .int8("noSample")
  .int8("samplingRate")
  .int8("station")
  .array("channel", {
    type: new Parser().array("data", {
      type: "doublebe",
      length: 100
    }),
    length: "noCh"
  });

  export const daqParse = data => daqParser.parse(data);