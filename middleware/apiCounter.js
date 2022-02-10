const { default: axios } = require("axios");
const { config } = require("../config");

const getRoute = (req) => {
  const route = req.route ? req.route.path : ""; // check if the handler exist
  const baseUrl = req.baseUrl ? req.baseUrl : ""; // adding the base url if the handler is a child of another handler

  return route
    ? `${baseUrl === "/api" ? "" : baseUrl}${route}`
    : "unknown route";
};

exports.apiCounter = async (req, res, next) => {
  const path = req.originalUrl;
  //   const path = req.route && req.route.path;
  const type = path.includes("/users") ? 1 : path.includes("/arthing") && 2;

  //   res.on("finish", () => {
  //     const route = `${req.method} ${getRoute(req)} ${res.statusCode}`;
  //     console.log(route);
  //   });

  try {
    type &&
      (await axios.patch(`${config.apiTracker}/users/api-tracker`, {
        type,
        route: { method: req.method, path },
        accessKey: config.accessKey,
        accessKey: config.accountId,
    }));
    return next();
  } catch (error) {
    error.statusCode = error.statusCode ?? 500;
    return next(error);
    // return res.status(error.statusCode).json(error);
  }
};

// exports.apiCounter = (req, res, next) => {
//     const path = req.originalUrl;
//     res.on("finish", async () => {
//       //   const route = `${req.method} ${getRoute(req)} ${res.statusCode}`;
//       // const addr = req.route ? req.route.path : "";
//       const baseUrl = req.baseUrl ? req.baseUrl : "";
//       const type = path.includes("/users/")
//         ? 1
//         : baseUrl.includes("/arthing") && 2;

//       console.log("path===>", path, "baseurl===>", baseUrl, "type===>", type);
//       try {
//         if (!type) {
//           const error = new Error("unknown route");
//           throw error;
//         }
//         await axios.patch(`${config.apiTracker}/users/api-tracker`, {
//           type,
//           route: { method: req.method, path },
//           accessKey: config.accessKey,
//         });
//       } catch (error) {
//         error.statusCode = error.statusCode ?? 500;
//         res.status(500).json({error})
//       }
//     });
//     next();
//   };
