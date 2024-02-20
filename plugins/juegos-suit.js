var timeout = 60000
var poin = 500
var poin_lose = -100
var poin_bot = 200

var handler = async (m, {conn, usedPrefix, text}) => {

conn.suit = conn.suit ? conn.suit : {}
if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) return conn.reply(m.chat, '🚩 *Deberás terminar tu partida*', m, fake, )
let textquien = `🎌 *Etiqueta a una persona*\n\nEjemplo, !suit @${global.suittag}`
if (!m.mentionedJid[0]) return m.reply(textquien, m.chat, {mentions: conn.parseMention(textquien)})
if (Object.values(conn.suit).find((room) => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) return conn.reply(m.chat, '🚩 *Espera a que terminé de jugar*', m, fake, )
let id = 'suit_' + new Date() * 1
let caption = `⚔️ SUIT - CURIOSITY ⚔️\n\n- @${m.sender.split`@`[0]} desafía a @${m.mentionedJid[0].split`@`[0]} en un PvP\n\n> Escribe `aceptar` para jugar\n> Escribe `rechazar` para no jugar\n_Respondiendo a este mensaje_`
let imgplaygame = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`
conn.suit[id] = {
chat: await m.reply(caption, m.chat, {mentions: conn.parseMention(caption)}),
id: id,
p: m.sender,
p2: m.mentionedJid[0],
status: 'wait',
waktu: setTimeout(() => {
if (conn.suit[id]) conn.reply(m.chat, `⏰ *Se agotó el tiempo*`, m, fake, )

delete conn.suit[id]
}, timeout), poin, poin_lose, poin_bot, timeout,
}
  
}
handler.help = ['pvp', 'suit']
handler.tags = ['juegos']
handler.command = /^pvp|suit(pvp)?$/i

handler.group = true
handler.game = true
handler.register = true

export default handler
