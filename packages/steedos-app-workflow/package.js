Package.describe({
	name: 'steedos:app-workflow',
	version: '0.0.1',
	summary: 'Creator workflow',
	git: '',
	documentation: null
});

Npm.depends({
	mkdirp: "0.3.5",
	cookies: "0.6.1"
});

Package.onUse(function(api) {
	api.use('reactive-var');
	api.use('reactive-dict');
	api.use('random');
	api.use('ddp');
	api.use('check');
	api.use('ddp-rate-limiter');
	api.use('underscore');
	api.use('tracker');
	api.use('session');
	api.use('blaze');
	api.use('templating');
	api.use('flemay:less-autoprefixer@1.2.0');
	api.use('coffeescript@1.11.1_4');
	api.use('simple:json-routes@2.1.0');
	api.use('aldeed:simple-schema@1.3.3');
	api.use('aldeed:collection2@2.5.0');
	api.use('kadira:flow-router@2.10.1');

	api.use('steedos:cfs-standard-packages@0.5.10');
	api.use('steedos:cfs-s3@0.1.4');
	api.use('steedos:cfs-aliyun@0.1.0');

	api.use('steedos:base');
	api.use('steedos:app-admin');

	api.use('tap:i18n', ['client', 'server']);
	tapi18nFiles = ['i18n/en.i18n.json', 'i18n/zh-CN.i18n.json']
	api.addFiles(tapi18nFiles, ['client', 'server']);

	api.addFiles('core.coffee');
	api.addFiles('client/new_flow_modal.less', 'client');
	api.addFiles('client/new_flow_modal.html', 'client');
	api.addFiles('client/new_flow_modal.coffee', 'client');

	api.addFiles('server/methods/flow_copy.coffee', 'server');

	api.addFiles('workflow.app.coffee', "server");
	api.addFiles('menu.coffee', "server");
	api.addFiles('models/Instances.coffee');
	api.addFiles('models/forms.coffee');
	api.addFiles('models/flows.coffee');
	api.addFiles('models/statistic_instance.coffee');
	api.addFiles('models/categories.coffee');
	api.addFiles('models/flow_roles.coffee');
	api.addFiles('models/flow_positions.coffee');
	api.addFiles('models/space_user_signs.coffee');
	api.addFiles('models/webhooks.coffee');

	api.addFiles('cfs/instances.coffee', 'server');

	api.addFiles('client/admin_import_flow_modal.html', 'client');
	api.addFiles('client/admin_import_flow_modal.coffee', 'client');

	api.addFiles('client/copy_flow_modal.html', 'client');
	api.addFiles('client/copy_flow_modal.coffee', 'client');

	api.addFiles('server/lib/export.coffee', 'server');
	api.addFiles('routes/export.coffee', 'server');
	api.addFiles('server/lib/import.coffee', 'server');
	api.addFiles('routes/import.coffee', 'server');

	api.export(['steedosExport', 'steedosImport'], ['server']);
})