import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/ironSession/config";

export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req, res) {
    req.session.destroy();
    res.send({ ok: true });
}