const { executeQuery } = require("../utils/firebird");
const iconv = require("iconv-lite");

exports.getITMS = async (req, res) => {
  try {
    const query = "SELECT * FROM ITMS";
    const result = await executeQuery(query);
    const records = await result.map((record) => {
      return Object.fromEntries(
        Object.entries(record).map(([key, value]) => {
          if (typeof value == "string") {
            const windows1253Buffer = Buffer.from(value, "binary");
            const utf8String = iconv.decode(windows1253Buffer, "windows-1253");
            return [key, utf8String];
          } else {
            return [key, value];
          }
        })
      );
    });
    if (records) {
      return res.status(200).json(records);
    } else {
      return res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
