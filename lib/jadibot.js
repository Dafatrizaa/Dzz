
let { WAConnection, MessageType, Mimetype} = require('@adiwajshing/baileys')
let qrcode = require('qrcode')
const fs = require('fs')

listjadibot = [];

const jadibot = async(reply,client,id) => {
	conn = new WAConnection()
    conn.logger.level = 'warn'
    conn.version = [2, 2202, 8]
    conn.browserDescription = [ 'WhatsappDz', '', '3.0' ]
    conn.on('qr', async qr => {
    	let bot = await qrcode.toDataURL(qr, { scale: 8 })
    	let buffer = new Buffer.from(bot.replace('data:image/png;base64,', ''), 'base64')
       	bot = await client.sendMessage(id,buffer,MessageType.image,{caption:'Scan QR Untuk menjadi bot\n*Notif:*\nQR akan diganti setiap 20 detik\n\n*_Powered by: Dz_*'})
    	setTimeout(() => {
       	client.deleteMessage(id, bot.key)
       },30000)
    })
    conn.on('connecting', () => {
    })
    conn.on('open', () => {
    	reply(`☑️ Kamu Berhasil Terhubung Didalam Bot \n\n*Notif:*\n_OWNER Dz BISA PUTUSKAN KONEKSI MU KAPAN SAJA , INI HANYA SEMENTARA_\n\n*Device*:\n\n ${JSON.stringify(conn.user,null,2)}`)
    })
    await conn.connect({timeoutMs: 30 * 1000})
    listjadibot.push(conn.user)
    conn.on('chat-update', async (message) => {
        require('../dz.js')(conn, message)
    })
}

const stopjadibot = (reply) => {
	conn = new WAConnection();
	conn.close()
	reply('Owner Sukses Stop Semua Device')
}

module.exports = {
	jadibot,
	stopjadibot,
	listjadibot
}