

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.qFbvoKfm.js","_app/immutable/chunks/scheduler.D9Vy5Bpq.js","_app/immutable/chunks/index.GeXkl0YC.js","_app/immutable/chunks/index.Dff2a-we.js"];
export const stylesheets = ["_app/immutable/assets/2.1uSkwj-B.css"];
export const fonts = [];
