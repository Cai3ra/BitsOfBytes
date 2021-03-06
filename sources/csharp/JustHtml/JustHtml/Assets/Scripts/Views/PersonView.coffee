'use strict'

require.config({
	baseUrl: '/assets/scripts/'
	paths: {
		'jquery': 'libs/jquery-1.11.1.min'
		'jquery.uploadfile': 'libs/jquery.uploadfile.min'
	}
});

require( 
	[	
		"jquery"
		"controllers/personcontroller" 
		"models/person"
		"jquery.uploadfile"
	]
	() -> 
		controller = new PersonController()
		op = "insert"
		files = []

		load = () ->
			controller.load((data) => 
				grid = $('.grid tbody')
				grid.empty()
				for person in data

					line = "<tr>"+
						"<td class='id row'>#{person.ID}</td>"+
						"<td class='name col-md-12 row'>#{person.Name}</td>"+
						"<td class='age row'>#{person.Age}</td>"+
						"<td class='row'><a href='#' class='edit'>edit</a></td>"+
						"<td class='row'><a href='#' class='delete'>delete</a></td>"+
					"</tr>"
					grid.append(line)
				
				gridBind()
			)
		
		insert = () ->
			data = $('form')
			person = parse(data)

			if data?
				controller.insert(
					person, 
					(p) -> 
						load()
						return
				)
			return
		
		update = () ->
			data = $('form')
			person = parse(data)
			
			if data?
				controller.edit(
					person, 
					(p) -> 
						load()
						return
				)
			return

		remove = (id) ->
			if id? and id > 0
				controller.remove(
					id, 
					(p) -> 
						load()
						return
				)
			return

		parse = (data) ->
			person = new Person()
			person.ID = data.find('input[name=ID]').val()
			person.Name = data.find('input[name=Name]').val()
			person.Age = data.find('input[name=Age]').val()
			return person

		clean = (data) ->
			data.find('input[name=ID]').val('')
			data.find('input[name=Name]').val('')
			data.find('input[name=Age]').val('')
			return

		bind = () ->
			form = $('form')
			form.on(
				'submit'
				(e) ->
					e.preventDefault()
					switch op 
						when "insert" then do () ->
							insert() 
							clean(form)
							return
						when "update" then do () -> 
							update()
							clean(form)
							return
					return
			)

			$(document).ready( 
				() -> 
					$("#fileuploader").uploadFile({
						url:"/Home/SendFile"
						fileName:"file"
					})
					return
			)
			return

		gridBind = () =>
			data = $('form')
			$('.edit').on(
				'click'
				(e) ->
					op = 'update'
					clean(data)
					
					el = $(@).closest('tr')
					id = el.find('.id').text()
					name = el.find('.name').text()
					age = el.find('.age').text()

					data.find('input[name=ID]').val(id)
					data.find('input[name=Name]').val(name)
					data.find('input[name=Age]').val(age)

					return
			)

			$('.delete').on(
				'click'
				(e) ->
					op = 'delete'

					el = $(@).closest('tr')
					id = el.find('.id').text()
					remove(id)

					op = 'insert'
					clean(data)
					return
			)
			return
		
		load()
		bind()
		
		return
)
