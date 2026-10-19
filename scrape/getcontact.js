export default {
  startLogin: async (phone) => ({
    phone,
    verificationCode: String(Math.floor(100000 + Math.random() * 900000))
  }),
  checkLoginStatus: async () => ({ status: 'success' }),
  checkQuota: async () => ({ remaining: 100, total: 100 }),
  searchNumber: async (num) => ({
    name: 'GetContact User',
    tags: ['Teman', 'Kontak WhatsApp', 'Partner']
  })
}
