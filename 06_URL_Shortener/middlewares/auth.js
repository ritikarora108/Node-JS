import authService from "../service/auth.js";

function checkForAuthentication(req, res, next) {
  try {
    req.user = null;
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return next();
    }

    // "Bearer e242rf3rf" => ['','e242rf3rf'] => e242rf3rf
    const token = authHeader.split("Bearer ")[1];
    const user = authService.verifyJwtToken(token);
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(500).json({ msg: String(error) });
  }
  req.user = null;
}

export default { checkForAuthentication };
