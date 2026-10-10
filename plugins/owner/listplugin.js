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

let handler = async (m, { usedPrefix, registry }) => {
  const structure = registry.getMenuStructure()
  const categories = Object.keys(structure.categories).sort()

  let text = `╭─「 *DAFTAR PLUGIN AKTIF* 」\n`
  text += `│ ❃ Total Plugin : *${registry.plugins.size}*\n`
  text += `│ ❃ Total Perintah: *${registry.commands.size}*\n`
  text += `╰────────────────────\n\n`

  for (const cat of categories) {
    const plugins = structure.categories[cat] || []
    text += `📁 *KATEGORI: ${cat.toUpperCase()}* (${plugins.length})\n`
    for (let i = 0; i < plugins.length; i++) {
      const p = plugins[i]
      let badge = ' Ⓕ'
      if (p.owner) badge = ' Ⓞ'
      else if (p.premium) badge = ' Ⓟ'
      else if (p.admin) badge = ' Ⓐ'
      text += `  ${i + 1}. \`${p.name}\`${badge}\n`
    }
    text += `\n`
  }

  text += `💡 *Keterangan Badge:*\n`
  text += `Ⓞ : Khusus Owner | Ⓟ : Premium | Ⓐ : Admin | Ⓕ : Free\n\n`
  text += `_Gunakan *${usedPrefix}getplugin <nama>* untuk melihat kode plugin._`

  return m.reply(text.trim())
}

handler.command = ['listplugin', 'lp', 'plugins']
handler.owner = true
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botadmin = false
handler.noJadiBot = false

export default handler
