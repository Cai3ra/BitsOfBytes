'use strict'
class PersonController
	constructor: () ->
	load: (cb) ->
		$.ajax({ 
			url: '/api/Person'
			dataType: 'json'
			type: 'GET'
			contentType : 'application/json'
			success: (data, error) ->
				if data? and data.length > 0
					cb(data)
					return
			error: (error) ->
				console.log (error)
				return
		})
		return

	find: (id, cb) ->
		$.ajax({ 
			url: "/api/Person/#{id}"
			dataType: 'json'
			type: 'GET' 
			contentType : 'application/json'
			success: (data, error) ->
				cb(data)
				return
			error: (error) ->	
		})
		return

	edit: (person, cb) -> 
		$.ajax({ 
			url: "/api/Person/#{person.ID}"
			dataType: "json"
			type: "PUT"
			data: JSON.stringify(person)
			contentType : 'application/json'
			success: (data, error) ->
				cb(data)
				return
			error: (error) ->	
		})
		return

	insert: (person, cb) ->
		$.ajax({ 
			url: "/api/Person"
			dataType: "json"
			type: "POST"
			data: JSON.stringify(person)
			contentType : 'application/json'
			success: (data, error) ->
				cb(data)
				return
			error: (error) ->	
		})
		return

	remove: (id, cb) ->
		$.ajax({ 
			url: "/api/Person/#{id}"
			dataType: "json"
			type: "DELETE"
			contentType : 'application/json'
			success: (data, error) ->
				cb(data)
				return
			error: (error) ->	
		})
		return

	file: (cb, f) ->
		$.ajax({ 
			url: "/Home/SendFile"
			dataType: "json"
			type: "POST"
			data: { file: f }
			processData: false
			contentType: false
			cache: false	
			success: (data, error) ->
				cb(data)
				return
			error: (error) ->	
		})
		return