import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/ironSession/config";

export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req, res) {
    if (req.session.user) {

    }
}