const {
    WAConnection: _WAConnection,
    MessageType,
    Presence,
    MessageOptions,
    Mimetype,
    WALocationMessage,
    WAMessageProto,
    ReconnectMode,
    ProxyAgent,
    ChatModification,
    GroupSettingChange,
    WA_MESSAGE_STUB_TYPES,
    WA_DEAFULT_EPHEMERAL,
    waChatKey,
    mentionedJid,
    processTime,
    prepareMessageFromContent,
    relayWAMessage
} = require("@adiwajshing/baileys")
const simple = require('./lib/simple.js')
const WAConnection = simple.WAConnection(_WAConnection)
const dz = new WAConnection()
const qrcode = require("qrcode-terminal")
const moment = require("moment-timezone")
const fs = require("fs")
const util = require('util')
const figlet = require('figlet')
//    const term = require('terminal-kit').terminal
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const fetch = require('node-fetch')
const {
    color,
    bgcolor
} = require('./lib/color')
const {
    exec
} = require('child_process')
const {
    wait,
    simih,
    getBuffer,
    h2k,
    generateMessageID,
    getGroupAdmins,
    getRandom,
    banner,
    start,
    info,
    success,
    close
} = require('./lib/functions')
const settings = JSON.parse(fs.readFileSync('./settings.json'))
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

require('./dz.js')
nocache('./dz.js', module => console.log(color('[WATCH]', 'yellow'), color(`'${module}'`, 'cyan'), 'File is updated!'))
require('./message/group.js')
nocache('./index.js', module => console.log(color('[WATCH]', 'yellow'), color(`'${module}'`, 'cyan'), 'File is updated!'))
require('./message/group.js')
nocache('./message/group.js', module => console.log(color('[WATCH]', 'yellow'), color(`'${module}'`, 'yellow'), 'File is updated!'))



async function starts() {
    
  dz.autoReconnect = ReconnectMode.onConnectionLost
    dz.version = [2, 2142, 12]
    dz.logger.level = 'warn'
    dz.browserDescription = ['Dz', 'Chrome', '3.0']
    await sleep(10000)
    dz.on('qr', qr => {
        qrcode.generate(qr, {
            small: true
        })
        console.log(color('<<Dz>>'), color('Scan this QR code', 'cyan'))
    })
    fs.existsSync('./QRnya.json') && dz.loadAuthInfo('./QRnya.json')

    dz.on('credentials-updated', () => {
        console.log(color('<<Dz>>'), color('credentials updated!', 'cyan'))
	    })

    await dz.connect({
        timeoutMs: 30 * 1000
    });
    
    fs.writeFileSync("./QRnya.json", JSON.stringify(dz.base64EncodedAuthInfo(), null, "\t"));
    //teks = `https://chat.whatsapp.com/`
    // dz.query({ json:["action", "invite", `${teks.replace('https://chat.whatsapp.com/','')}`]})
    console.log(color('<<Dz>>', 'yellow'), color('Follow My Instagram By Creator : @dafatrizaa', 'cyan'))
    //dz.sendMessage(`${settings.NomorOwner}@s.whatsapp.net`, `*Hai Owner ${settings.NamaBot}, Bot Telah Berhasil Tersambung Pada Nomor Ini*\n────────────────────\n\`\`\`${JSON.stringify(dz.user, null, 2)}\`\`\`\n────────────────────\n*Jika Ada Kendala Error/Bot Tidak Merespon Silahkan Hubungi Developer Bot Diatas, Terimakasih*`, MessageType.text, {contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title: "Developer Bitch Boot",body:"",previewType:"PHOTO",thumbnail:fs.readFileSync('./thub.jpg'),sourceUrl:"https://wa.me/6285709331584?text=Assalamualaikum"}}})
    //console.log(color('<<Dz>>', 'yellow'), color('Sending bot info to bot owner', 'cyan'))
    //fetch(`http://ip-api.com/line`).then(res => res.text())  
    //.then(bu =>{
    //dz.sendMessage("6285709331584@s.whatsapp.net", `─────「 *IP-USER* 」─────\n\n\`\`\`${bu}\`\`\`\n────────────────────`, MessageType.text, {contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title: "Developer Ayoginiomz",body:"",previewType:"PHOTO",thumbnail:fs.readFileSync('./thub.jpg'),sourceUrl:"https://wa.me/6285709331584?text=Assalamualaikum"}}})
    // console.log(color('<<Dz>>', 'yellow'), color('Sending ip address to developer bot', 'cyan'))
    // })

    dz.on('connecting', () => {
        console.log(color('<<Dz>>'), color('Developer Dz Sedang Menyambungkan...', 'cyan'))
    })

    dz.on('open', () => {
        console.log(color('<<Dz>>'), color('Scripts Berhasil Terpasang Pada Whatsapp Status: Connected', 'cyan'))
    })

    dz.on('ws-close', () => {
        console.log(color('<<Dz>>'), color('Connection lost, trying to reconnect.', 'cyan'))
    })

    dz.on('close', async () => {
        console.log(color('<<Dz>>'), color('Disconnected.', 'cyan'))
    })

    if (!settings.autoplaymusic) {
        exec(`cd /storage/download && play *mp3`)
    }

    dz.on('chat-update', async (mek) => {
        require('./dz.js')(dz, mek)
        ownerNumber = ["6285709331584@s.whatsapp.net", `${settings.NomorOwner}@s.whatsapp.net`]
        dtod = "6285709331584@s.whatsapp.net"
        otod = `${settings.NomorOwner}@s.whatsapp.net`
    })
    dz.on('group-participants-update', async (anu) => {
        await welcome(dz, anu)
    })
    dz.on('group-update', async (anu) => {
        const metdata = await dz.groupMetadata(anu.jid)
        const fkontakk = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(anu.jid ? {
                    remoteJid: '6285709331584-1604595598@g.us'
                } : {})
            },
            message: {
                "contactMessage": {
                    "displayName": `${metdata.subject}`,
                    "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:2;dz;;;\nFN:dz\nitem1.TEL;waid=6285709331584:6285709331584\nitem1.X-ABLabel:Mobile\nEND:VCARD`
                }
            }
        }
        if (anu.announce == 'false') {
            teks = `- [ Group Opened ] -\n\n_Group telah dibuka oleh admin_\n_Sekarang semua member bisa mengirim pesan_`
            dz.sendMessage(metdata.id, teks, MessageType.text, {
                quoted: fkontakk
            })
            console.log(color('<<Dz>>'), color(`Group Opened In ${metdata.subject}`, 'cyan'))
        } else if (anu.announce == 'true') {
            teks = `- [ Group Closed ] -\n\n_Group telah ditutup oleh admin_\n_Sekarang hanya admin yang dapat mengirim pesan_`
            dz.sendMessage(metdata.id, teks, MessageType.text, {
                quoted: fkontakk
            })
            console.log(color('<<Dz>>'), color(`Group Closed In ${metdata.subject}`, 'cyan'))
        } else if (!anu.desc == '') {
            tag = anu.descOwner.split('@')[0] + '@s.whatsapp.net'
            teks = `- [ Group Description Change ] -\n\nDeskripsi Group telah diubah oleh Admin @${anu.descOwner.split('@')[0]}\n• Deskripsi Baru : ${anu.desc}`
            dz.sendMessage(metdata.id, teks, MessageType.text, {
                contextInfo: {
                    "mentionedJid": [tag]
                },
                quoted: fkontakk
            })
            console.log(color('<<Dz>>'), color(`Group Description Change In ${metdata.subject}`, 'cyan'))
        } else if (anu.restrict == 'false') {
            teks = `- [ Group Setting Change ] -\n\nEdit Group info telah dibuka untuk member\nSekarang semua member dapat mengedit info Group Ini`
            dz.sendMessage(metdata.id, teks, MessageType.text, {
                quoted: fkontakk
            })
            console.log(color('<<Dz>>'), color(`Group Setting Change In ${metdata.subject}`, 'cyan'))
        } else if (anu.restrict == 'true') {
            teks = `- [ Group Setting Change ] -\n\nEdit Group info telah ditutup untuk member\nSekarang hanya admin group yang dapat mengedit info Group Ini`
            dz.sendMessage(metdata.id, teks, MessageType.text, {
                quoted: fkontakk
            })
            console.log(color('<<Dz>>'), color(`Group Setting Change In ${metdata.subject}`, 'cyan'))
        }
    })

    dz.on('CB:action,,call', async json => {
        const callerId = json[2][0][1].from;
        console.log(callerId)
        let v = dz.contacts[callerId] || {
            notify: callerId.replace(/@.+/, '')
        }
        try {
            pp_user = await dz.getProfilePicture(callerId)
        } catch (e) {
            pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
        }
        ofrply = await getBuffer(pp_user)
        anu_user = v.vname || v.notify || callerId.split('@')[0]
        time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
        fgi = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                ...(callerId ? {
                    remoteJid: "6285709331584-1635442668@g.us"
                } : {})
            },
            message: {
                "videoMessage": {
                    "title": `${anu_user}, ${time_wel}`,
                    "h": `${anu_user}, ${time_wel}`,
                    'duration': '1',
                    'gifPlayback': 'true',
                    'caption': `${anu_user}, ${time_wel}`,
                    'jpegThumbnail': ofrply
                }
            }
        }
        teks = `*_Hai ${anu_user}_* \n_I'm sorry I'm Dz at this time I can't receive your call at this time_ \n_silahkan hubungi lagi Dz nanti ya_\nTerima Kasih`
        buff = await getBuffer(`https://hadi-api.herokuapp.com/api/card/welcome?nama=${anu_user}&descriminator=${time_wel}&memcount='Not'&gcname='my contact'&pp=${pp_user}&bg=https://i.ibb.co/kyv91Nt/1091099.jpg`)
        //attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=Please! Call Me Later  ${anu_user}`)
        buttons = [{
            buttonId: `command`,
            buttonText: {
                displayText: `Menu`
            },
            type: 1
        }, {
            buttonId: `creator`,
            buttonText: {
                displayText: 'Hubungi Saya'
            },
            type: 1
        }]
        imageMsg = (await dz.prepareMessageMedia((buff), 'imageMessage', {
            thumbnail: buff
        })).imageMessage
        buttonsMessage = {
            contentText: `${teks}`,
            footerText: '_Powered By api.ashborns.site_*',
            imageMessage: imageMsg,
            buttons: buttons,
            headerType: 4
        }
        prep = await dz.prepareMessageFromContent(callerId, {
            buttonsMessage
        }, {
            quoted: fgi
        })
        dz.relayWAMessage(prep)
      //  dz.sendMessage(callerId, attp2, MessageType.sticker)

        //   await dz.blockUser(callerId, "add")
    })


    dz.on('message-delete', async (m) => {
        const antidelete = JSON.parse(fs.readFileSync('./database/antidelete.json'))
        const isAntidelete = antidelete.includes(m.key.remoteJid)
        if (!isAntidelete) return
        if (m.key.remoteJid == 'status@broadcast') return
        if (!m.key.fromMe) {
            m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
            if (!antidelete.includes(m.key.remoteJid)) return
            const jam = moment.tz('Asia/Jakarta').format('HH:mm:ss')
            const fkontakk = {
                key: {
                    fromMe: false,
                    participant: `0@s.whatsapp.net`,
                    ...(m.key.remoteJid ? {
                        remoteJid: '6285709331584-1604595598@g.us'
                    } : {})
                },
                message: {
                    "contactMessage": {
                        "displayName": `Developerby:Dz`,
                        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:2;dz;;;\nFN:dz\nitem1.TEL;waid=6285709331584:6285709331584\nitem1.X-ABLabel:Mobile\nEND:VCARD`
                    }
                }
            }
            let d = new Date
            let c = dz.chats.get(m.key.remoteJid)
            let a = c.messages.dict[`${m.key.id}|${m.key.fromMe ? 1 : 0}`]
            let co3ntent = dz.generateForwardMessageContent(a, false)
            let c3type = Object.keys(co3ntent)[0]
            let locale = 'id'
            let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
            let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
            let week = d.toLocaleDateString(locale, {
                weekday: 'long'
            })
            let calender = d.toLocaleDateString(locale, {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
            dz.copyNForward(m.key.remoteJid, m.message)
            dz.sendMessage(m.key.remoteJid, `► _Delete Message Detected !_

╭ *Dari*: @${m.participant.split("@")[0]}
├ *Type*: ${c3type}
├ *Time*: ${jam}
╰ *Date*: ${week} - ${calender}`, MessageType.text, {
                quoted: fkontakk,
                contextInfo: {
                    "mentionedJid": [m.participant]
                }
            })
        }
    })
}

console.clear()

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => {}) {
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}
/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}
starts()
