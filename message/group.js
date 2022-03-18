const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")
const moment = require("moment-timezone")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')

let setting = JSON.parse(fs.readFileSync('./settings.json'))
prefix = setting.prefix

module.exports = welcome = async (dz, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await dz.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await dz.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://i.postimg.cc/SN54m6LW/SAVE-20210728-133334.jpg'
            }
            if (anu.action == 'add' && mem.includes(dz.user.jid)) {
            dz.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik ${prefix}menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(dz.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await dz.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = dz.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
                time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
                teks = `Hae ${anu_user} Selamat Datang`
	            buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome?nama=${anu_user}&descriminator=${time_wel}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.ibb.co/LRY5KTY/Portfolio-Archivi-Page-2-of-7-Federica-Iossa.jpg`)
                buttons = [{buttonId: `#lol`,buttonText:{displayText: `Hai`},type:1}]
                imageMsg = (await dz.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage
                buttonsMessage = { contentText: `${teks}`, footerText: '_Developer by: Dz_', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
                prep = await dz.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                dz.relayWAMessage(prep)
}
            if (anu.action == 'remove' && !mem.includes(dz.user.jid)) {
            if (!welkom.includes(anu.jid)) return
                mdata = await dz.groupMetadata(anu.jid)
            	num = anu.participants[0]
                let w = dz.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = w.vname || w.notify || num.split('@')[0]
                time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
                memeg = mdata.participants.length
                out = `Dadaahh ${anu_user} Selamat Tinggal`
                buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye?nama=${anu_user}&descriminator=${time_wel}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.ibb.co/8gHPzt9/UR-Tsushima-Yoshiko-What-Do-I-Do-What-Do-I-Do-Angel-of-Eden-Cards-list-All-Stars-Idol-Story-Love-Liv.jpg`)
                buttons = [{buttonId: `#lol`,buttonText:{displayText: `Bye`},type:1}]
                imageMsg = (await dz.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage
                buttonsMessage = { contentText: `${out}`, footerText: '_Developer by: Dz_', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
                prep = await dz.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                dz.relayWAMessage(prep)
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
