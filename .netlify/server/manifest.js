export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.CpQx-GsB.js","app":"_app/immutable/entry/app.GdxZ9hXH.js","imports":["_app/immutable/entry/start.CpQx-GsB.js","_app/immutable/chunks/entry.DEW_i6g2.js","_app/immutable/chunks/scheduler.D9Vy5Bpq.js","_app/immutable/chunks/index.Dff2a-we.js","_app/immutable/entry/app.GdxZ9hXH.js","_app/immutable/chunks/scheduler.D9Vy5Bpq.js","_app/immutable/chunks/index.GeXkl0YC.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/data",
				pattern: /^\/data\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/data/_server.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
