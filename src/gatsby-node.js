import dotenv from "dotenv";

exports.onCreateWebpackConfig = ({ actions, plugins }, options) => {
	const { whitelist, path } = options || {};

	if (!whitelist) return;

	if (path) {
		dotenv.config({
			path
		});
	}

	const varobj = Object.keys(process.env).reduce((acc, key) => {
		if (whitelist.indexOf(key) >= 0) {
			acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
		}
		return acc;
	}, {});

	let pluginsToAdd;
	if (Object.keys(varobj).length) {
		pluginsToAdd = [plugins.define(varobj)];
	}

	actions.setWebpackConfig({ plugins: pluginsToAdd });
};
