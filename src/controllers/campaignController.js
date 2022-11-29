const campaignModel = require("../models/campaignModel")

module.exports.createCampaign = async function (req, res) {
    try {
        let data = req.body
        if (!Object.keys(data)) return res.status(400).send("Enter Campaign Details")
        let campaign = await campaignModel.create(data)
        res.status(200).send(campaign)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports.redirectCampaign = async function (req, res) {
    try {
        let id = req.query.click_id
        if (!id) return res.status(400).send("Please Enter Short Token")
        let getCampaignDetails = await campaignModel.findOne({ short_token: id, enabled: true })
        if (!getCampaignDetails) return res.status(404).send(`Campaign with short_token - ${id}. Not Found or Not Enabled`)
        res.status(200).send(getCampaignDetails.offer)
    }
    catch (err) {
        res.status(500).send(err)
    }
}


module.exports.toggleCampaign = async function (req, res) {
    try {
        let campaignId = req.params.id
        let getCampaignDetails = await campaignModel.findOne({ short_token: campaignId })
        if (getCampaignDetails.enabled === false) {
            var toggleCampaign = await campaignModel.findOneAndUpdate({ short_token: campaignId }, { enabled: true }, { new: true })
        } else {
            var toggleCampaign = await campaignModel.findOneAndUpdate({ short_token: campaignId }, { enabled: false }, { new: true })
        }
        res.status(200).send("Set Campaign => Enabled : " + toggleCampaign.enabled)
    }
    catch (err) {
        res.status(500).send(err)
    }
}






// {
//     "short_token":"67891",
//     "name":"campaign2",
//     "offer":[{
//         "offer_url":"http://google.com/?click={click_id}",
//         "ratio_percentage":70
//         },{
//         "offer_url":"http://microsoft.com/?msclickid={click_id}",
//         "ratio_percentage":30
//     }]
// }