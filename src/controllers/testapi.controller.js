const model = require('../models/product.model')

class Api {
    async run(req, res) {
        try {
            const category = await model.create({
                id_category: '6443fb169db44cf3a075e895',
                name: 'Back to the Moon: The Next Giant Leap for Humankind',
                author: 'Joseph Silk',
                publisher: 'Princeton University Press',
                published_at: new Date(2022, 11, 1),
                amount: 10,
                description: `
                <b>A scientist's inspiring vision of our return to the Moon as humanity's next thrilling step in space exploration</b>
                <br>Just over half a century since Neil Armstrong first stepped foot on the lunar surface, a new space race to the Moon is well underway and rapidly gaining momentum. Laying out a vision for the next fifty years, Back to the Moon is astrophysicist Joseph Silk's persuasive and impassioned case for putting scientific discovery at the forefront of lunar exploration.
<br>The Moon offers opportunities beyond our wildest imaginings, and plans to return are rapidly gaining momentum around the world. NASA aims to build a habitable orbiting space station to coordinate lunar development and exploration, while European and Chinese space agencies are planning lunar villages and the mining of precious resources dwindling here on Earth. Powerful international and commercial interests are driving the race to revisit the Moon, but lunar infrastructures could also open breathtaking vistas onto the cosmos. Silk describes how the colonization of the Moon could usher in a thrilling new age of scientific exploration, and lays out what the next fifty years of lunar science might look like. With lunar telescopes of unprecedented size situated in permanently dark polar craters and on the far side of the Moon, we could finally be poised to answer some of the most profound questions confronting humankind, including whether we are alone in the Universe and what our cosmic origins are.
<br>Addressing both the daunting challenges and the immense promise of lunar exploration and exploitation, Back to the Moon reveals how prioritizing science, and in particular lunar astronomy, will enable us to address the deepest cosmic mysteries.
`,
                price: 440000,
                img_url: 'p-9780691215235.jpeg',
            })
            if (category) {
                return res.json({
                    status: "success",
                    msg: "Created successfully!"
                })
            } else {
                return res.json({
                    status: "fail",
                    msg: "Failed when creating new!"
                })
            }
        } catch (e) {
            return res.status(500).json({
                status: "error",
                msg: e.message
            })
        }
    }
}

module.exports = new Api();
