Setup.validate = (cb)->
	loginToken = Accounts._storedLoginToken()
	spaceId = window.localStorage.getItem("spaceId")
	headers = {}
	requestData = { 'utcOffset': moment().utcOffset() / 60 }
	if loginToken && spaceId
		headers['Authorization'] = 'Bearer ' + spaceId + ',' + loginToken
	else if loginToken
		headers['X-Auth-Token'] = loginToken
	
	$.ajax
		type: "POST",
		url: Steedos.absoluteUrl("api/v4/users/validate"),
		contentType: "application/json",
		dataType: 'json',
		data: JSON.stringify(requestData),
		xhrFields: 
			withCredentials: true
		crossDomain: true
		headers: headers
	.done ( data ) ->
		if data.webservices
			Steedos.settings.webservices = data.webservices
		if data.spaceId
			if !Session.get('spaceId')
				window.localStorage.setItem("spaceId", data.spaceId)
				Session.set('spaceId', data.spaceId)
		Creator.USER_CONTEXT = data
		if cb
			cb();

Setup.clearAuthLocalStorage = ()->
	localStorage = window.localStorage;
	i = 0
	while i < localStorage.length
		key = localStorage.key(i)
		if key?.startsWith("Meteor.loginToken") || key?.startsWith("Meteor.userId")  || key?.startsWith("Meteor.loginTokenExpires")
			localStorage.removeItem(key)
		i++

Setup.logout = () ->
	$.ajax
		type: "POST",
		url: Steedos.absoluteUrl("api/setup/logout"),
		dataType: 'json',
		xhrFields: 
		   withCredentials: true
		crossDomain: true,
	.always ( data ) ->
		Setup.clearAuthLocalStorage()

Meteor.startup ->
	Setup.validate ()->
		if FlowRouter.current()?.context?.pathname == "/steedos/sign-in"
			if FlowRouter.current()?.queryParams?.redirect
				FlowRouter.go FlowRouter.current().queryParams.redirect
			else
				FlowRouter.go "/"

	Accounts.onLogin ()->
		Tracker.autorun (c)->
			# 登录后需要清除登录前订阅的space数据，以防止默认选中登录前浏览器url参数中的的工作区ID所指向的工作区
			# 而且可能登录后的用户不属性该SpaceAvatar中订阅的工作区，所以需要清除订阅，由之前的订阅来决定当前用户可以选择哪些工作区
			if Steedos.subsSpaceBase.ready()
				c.stop()
				Steedos.subs["SpaceAvatar"]?.clear()

		Setup.validate()