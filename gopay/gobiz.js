export function getGoPayWatcher() {
  return {
    on: () => {},
    check: async () => false
  }
}

export default { getGoPayWatcher }
