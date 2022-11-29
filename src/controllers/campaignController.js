const campaignModel = require("../models/campaignModel")
var count = 0

module.exports.createCampaign = async function (req, res) {
    try {
        let data = req.body
        if (!Object.keys(data)) return res.status(400).send("Enter Campaign Details")
        let { short_token, name, offer } = data
        if (!short_token) return res.status(400).send("Enter Short Token")
        if (!name) return res.status(400).send("Enter Name")
        if (!Object.keys(offer)) return res.status(400).send("Enter offer")
        let dbCall = await campaignModel.findOne({ short_token: short_token })
        if (dbCall) return res.status(400).send(`short_token - ${short_token} is already in use. Please Provide another One`)
        let campaign = await campaignModel.create(data)
        res.status(200).send(campaign)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

module.exports.redirectCampaign = async function (req, res) {
    try {
        let short_token = req.query.short_token
        if (!short_token) return res.status(400).send("Please Enter Short Token")
        let getCampaignDetails = await campaignModel.findOne({ short_token: short_token, enabled: true })
        if (!getCampaignDetails) return res.status(404).send(`Campaign with short_token - ${short_token}. Not Found or Not Enabled`)

        // ****** Manage prority to handle url -
        const arr = [0, 0, 0, 1, 1, 1, 1, 1, 1, 1]
        const getIndex = () => ~~(Math.random() * 10)
        const index = getIndex();
        // console.log(index)
        // console.log(arr[index])

        // let urlRatio1 = getCampaignDetails.offer[0].ratio_percentage
        // let urlRatio2 = getCampaignDetails.offer[1].ratio_percentage

        // ******* Replacement of Click_id
        let regex = "{click_id}"
        let url = getCampaignDetails.offer[arr[index]].offer_url
        let newClick_id = req.query.click_id
        if (!newClick_id) return res.status(400).send("Please Enter click_id")
        let result = url.replace(regex, newClick_id)
        console.log(result)


        // ******** Checkout Total hit counts- 
        count++
        console.log("Count - " + count)

        res.redirect(302, result)

        // res.status(302).send("Redirecting to - " + result + " wait for 3 second ")
        // res.status(200).send(result)

    }
    catch (err) {
        res.status(500).send(err)
    }
}


module.exports.toggleCampaign = async function (req, res) {
    try {
        let campaignId = req.params.id
        let getCampaignDetails = await campaignModel.findById({ _id: campaignId })
        if (getCampaignDetails.enabled === false) {
            var toggleCampaign = await campaignModel.findByIdAndUpdate({ _id: campaignId }, { enabled: true }, { new: true })
        } else {
            var toggleCampaign = await campaignModel.findByIdAndUpdate({ _id: campaignId }, { enabled: false }, { new: true })
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