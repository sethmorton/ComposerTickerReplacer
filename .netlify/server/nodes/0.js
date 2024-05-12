

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.B6lIvqDw.js","_app/immutable/chunks/scheduler.D9Vy5Bpq.js","_app/immutable/chunks/index.GeXkl0YC.js"];
export const stylesheets = ["_app/immutable/assets/0.CcpelX6M.css"];
export const fonts = [];
