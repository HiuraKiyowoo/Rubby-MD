/**
╭━━━〔 ୨ৎ RUBBY MULTI DEVICE ୨ৎ 〕━━━╮
┇
┇       ✦ 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 𝗥𝗨𝗕𝗕𝗬 ✦
┇          ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა ♡
┇
┇      ░▒▓█ 𝗥 𝗨 𝗕 𝗕 𝗬 █▓▒░
┇          MULTI DEVICE SYSTEM
┇
┇  ──────── ୨୧ ────────
┇        ♡ 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥 𝗜𝗡𝗙𝗢 ♡
┇  ──────── ୨୧ ────────
┇   ↳ Creator  : Kyuu
┇   ↳ GitHub   : github.com/KyuuX444
┇   ↳ YouTube  : MommyKyuu
┇   ↳ Website  : https://api.kyzzz.xyz
┇
┇  ════════ ◇ ════════
┇        📡 𝗢𝗙𝗙𝗜𝗖𝗜𝗔𝗟 𝗖𝗛𝗔𝗡𝗡𝗘𝗟
┇  ════════ ◇ ════════
┇   ↳ Updates & Announcements
┇   ↳ https://whatsapp.com/channel/0029VbDXYlKDJ6H1D7Dm0f13
┇
┇  ┌─────── ⟡ ───────┐
┇          ⚙️ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗜𝗡𝗙𝗢
┇  └─────── ⟡ ───────┘
┇   • Runtime  : Node.js
┇   • Engine   : Ruby-Baileys
┇   • Platform : Linux
┇   • Mode     : WhatsApp Multi Device
┇
┇  ──────── ♡ ────────
┇          🌷 𝗙𝗘𝗔𝗧𝗨𝗥𝗘𝗦
┇  ──────── ♡ ────────
┇   › Modular ESM Plugins
┇   › Pairing Code Authentication
┇   › Automatic Plugin Loader
┇   › Lightweight & Fast
┇
┇       ୨ৎ made with love by Kyuu ୨ৎ
┇          ♡ RUBBY • 2026 ♡
┇
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*/

import { downloadMediaMessage } from 'ruby-baileys'
import { isOwner, isPremium, normalizeJid, normalizeNumber } from './utils.js'

export async function serialize(sock, rawMessage) {
  if (!rawMessage) return null
  const m = {}

  m.raw = rawMessage
  m.key = rawMessage.key || {}
  m.id = m.key.id
  m.fromMe = m.key.fromMe || false
  m.chat = m.key.remoteJid || ''
  m.isGroup = m.chat.endsWith('@g.us')

  let rawSender = ''
  if (m.isGroup) {
    rawSender = m.key.participantAlt || rawMessage.participantAlt || m.key.participant || (m.fromMe ? (sock.user?.id || '') : '')
  } else {
    rawSender = m.fromMe ? (sock.user?.id || '') : (m.key.remoteJidAlt || rawMessage.remoteJidAlt || m.chat)
  }

  if (rawSender.endsWith('@lid')) {
    const candidatePn = m.key.participantAlt || rawMessage.participantAlt || m.key.remoteJidAlt || rawMessage.remoteJidAlt
    if (candidatePn && candidatePn.endsWith('@s.whatsapp.net')) {
      rawSender = candidatePn
    }
  }

  const decodedSender = typeof sock.decodeJid === 'function' ? await sock.decodeJid(rawSender) : rawSender
  m.sender = decodedSender || rawSender || ''
  m.pushName = rawMessage.pushName || ''
  m.isOwner = isOwner(m.sender) || (m.fromMe && isOwner(sock.user?.id))
  m.isPremium = isPremium(m.sender) || m.isOwner

  let msg = rawMessage.message
  if (msg) {
    while (
      msg.ephemeralMessage ||
      msg.viewOnceMessage ||
      msg.viewOnceMessageV2 ||
      msg.viewOnceMessageV2Extension ||
      msg.documentWithCaptionMessage ||
      msg.botInvokeMessage
    ) {
      msg =
        msg.ephemeralMessage?.message ||
        msg.viewOnceMessage?.message ||
        msg.viewOnceMessageV2?.message ||
        msg.viewOnceMessageV2Extension?.message ||
        msg.documentWithCaptionMessage?.message ||
        msg.botInvokeMessage?.message ||
        msg
    }

    m.message = msg
    m.type = Object.keys(msg)[0] || ''
    m.mimetype = msg[m.type]?.mimetype || ''

    let text = ''
    if (msg.conversation) {
      text = msg.conversation
    } else if (msg.extendedTextMessage?.text) {
      text = msg.extendedTextMessage.text
    } else if (msg.imageMessage?.caption) {
      text = msg.imageMessage.caption
    } else if (msg.videoMessage?.caption) {
      text = msg.videoMessage.caption
    } else if (msg.documentMessage?.caption) {
      text = msg.documentMessage.caption
    } else if (msg.buttonsResponseMessage?.selectedButtonId) {
      text = msg.buttonsResponseMessage.selectedButtonId
    } else if (msg.buttonsResponseMessage?.selectedDisplayText) {
      text = msg.buttonsResponseMessage.selectedDisplayText
    } else if (msg.templateButtonReplyMessage?.selectedId) {
      text = msg.templateButtonReplyMessage.selectedId
    } else if (msg.templateButtonReplyMessage?.selectedDisplayText) {
      text = msg.templateButtonReplyMessage.selectedDisplayText
    } else if (msg.listResponseMessage?.singleSelectReply?.selectedRowId) {
      text = msg.listResponseMessage.singleSelectReply.selectedRowId
    } else if (msg.listResponseMessage?.title) {
      text = msg.listResponseMessage.title
    } else if (msg.interactiveResponseMessage) {
      const nativeFlow = msg.interactiveResponseMessage.nativeFlowResponseMessage
      if (nativeFlow?.paramsJson) {
        try {
          const parsed = JSON.parse(nativeFlow.paramsJson)
          text = parsed.id || parsed.selectedId || parsed.rowId || parsed.title || nativeFlow.paramsJson
        } catch {
          text = nativeFlow.paramsJson
        }
      }
      if (!text && msg.interactiveResponseMessage.body?.text) {
        text = msg.interactiveResponseMessage.body.text
      }
    }

    if (!text && msg[m.type]) {
      const target = msg[m.type]
      text =
        target.text ||
        target.caption ||
        target.selectedId ||
        target.selectedButtonId ||
        target.singleSelectReply?.selectedRowId ||
        target.selectedDisplayText ||
        target.title ||
        target.description ||
        ''
    }

    m.text = text

    const contextInfo = msg[m.type]?.contextInfo
    if (contextInfo && contextInfo.quotedMessage) {
      let qMsg = contextInfo.quotedMessage
      if (qMsg.ephemeralMessage) qMsg = qMsg.ephemeralMessage.message
      if (qMsg.viewOnceMessage) qMsg = qMsg.viewOnceMessage.message
      if (qMsg.viewOnceMessageV2) qMsg = qMsg.viewOnceMessageV2.message
      if (qMsg.documentWithCaptionMessage) qMsg = qMsg.documentWithCaptionMessage.message

      const qType = Object.keys(qMsg)[0] || ''
      let rawQSender = contextInfo.participantAlt || contextInfo.participant || ''
      if (rawQSender.endsWith('@lid') && contextInfo.participantAlt && contextInfo.participantAlt.endsWith('@s.whatsapp.net')) {
        rawQSender = contextInfo.participantAlt
      }
      const decodedQSender = typeof sock.decodeJid === 'function' ? await sock.decodeJid(rawQSender) : rawQSender
      const qSender = decodedQSender || rawQSender || ''

      const decodedMentioned = await Promise.all(
        (contextInfo.mentionedJid || []).map(async j => (typeof sock.decodeJid === 'function' ? (await sock.decodeJid(j)) : j) || j)
      )

      m.quoted = {
        key: {
          remoteJid: m.chat,
          fromMe: normalizeNumber(qSender) === normalizeNumber(sock.user?.id || ''),
          id: contextInfo.stanzaId,
          participant: contextInfo.participant
        },
        sender: qSender,
        fromMe: normalizeNumber(qSender) === normalizeNumber(sock.user?.id || ''),
        isOwner: isOwner(qSender),
        type: qType,
        mimetype: qMsg[qType]?.mimetype || '',
        caption: qMsg[qType]?.caption || '',
        message: qMsg,
        text:
          qMsg.conversation ||
          qMsg[qType]?.text ||
          qMsg[qType]?.caption ||
          qMsg[qType]?.description ||
          '',
        mentionedJid: decodedMentioned,
        download: async () => downloadMediaMessage({ key: { remoteJid: m.chat, id: contextInfo.stanzaId, participant: contextInfo.participant }, message: qMsg }, 'buffer', {})
      }
    } else {
      m.quoted = null
    }

    m.mentionedJid = await Promise.all(
      (contextInfo?.mentionedJid || []).map(async j => (typeof sock.decodeJid === 'function' ? (await sock.decodeJid(j)) : j) || j)
    )
  } else {
    m.message = null
    m.type = ''
    m.mimetype = ''
    m.text = ''
    m.quoted = null
    m.mentionedJid = []
  }

  m.download = async () => downloadMediaMessage(rawMessage, 'buffer', {})

  m.reply = async (text, options = {}) => {
    const quoted = options.quoted || (typeof sock.getFakeQuoted === 'function' ? sock.getFakeQuoted() : rawMessage)
    return await sock.sendMessage(
      m.chat,
      {
        text: typeof text === 'string' ? text : String(text),
        ...options
      },
      {
        ...options,
        quoted
      }
    )
  }

  m.fstatus = typeof sock.getFakeQuoted === 'function' ? sock.getFakeQuoted() : null

  return m
}

export default serialize
