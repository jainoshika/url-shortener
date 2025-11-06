const {nanoid} = require("nanoid");
const URLModel = require("../models/user");

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    const redirectLink = body.url // form data parsed using middleware, same body.name (where name is form ejs)
    console.log(redirectLink);
    if (!redirectLink) return res.status(400).json({error : 'in function, url is required'});
    const shortID = nanoid(7);
    await URLModel.create({
        shortid: shortID,
        redirectLink: redirectLink,
        visitHistory: []
    })
    return res.render("home", { shortid: shortID}); //generated short id and render home page and take data shortid
}

async function handleRedirectShortUrl(req, res) {
    const shortid = req.params.shortid;
    if (!shortid) return res.status(400).json({error: "redirect , url is required"});

    const entry = await URLModel.findOneAndUpdate({
            shortid,
        },
        {
            $push: {
                visitHistory: {
                    timestamps: Date.now()
                },
            },
        }
    );
    return res.redirect(entry.redirectLink);
}

async function handleVisitClicks(req, res) {
    const shortid = req.params.shortid;
    console.log(shortid);
    const entry = await URLModel.findOne({shortid});
    return res.json({totalClicks: entry.visitHistory.length});
}
module.exports = {
    handleGenerateNewShortUrl,
    handleRedirectShortUrl,
    handleVisitClicks
}