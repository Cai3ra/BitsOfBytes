class VideoLoader
	constructor: (@urls = [], @useDecimalPrecision = no) ->
		@loaded = 0
		@loader = []
		index = 0
		for url in @urls
			@loader.push
				id: ++index
				url: url
				progress: 0
				loaded: no
		@progressCallback = null
		@finishCallback = null

	loadEvent: (evt, item, callback) ->
		if evt.target.status is 200
			myBlob = evt.target.response
			vid = (if window.URL then window.URL else webkitURL).createObjectURL myBlob
			
			videoElement = document.createElement "video"	
			videoElement.width = 640
			videoElement.height = 480
			
			item.loaded = yes

			totalLoaded = 0
			for video in @loader
				if video.progress is 1
					totalLoaded++

			videoElement.src = vid
			document.body.appendChild videoElement
			do videoElement.play

			if @finishCallback?
				@finishCallback item

			if totalLoaded is @loader.length
				callback()

	progressEvent: (evt, item) ->
		if evt.lengthComputable
			percentComplete = evt.loaded / evt.total
			item.progress = percentComplete

			percentual = 0
			for video in @loader
				 percentual += video.progress

			if @useDecimalPrecision
				percentual = (percentual * 100) / @loader.length
			else
				percentual = Math.ceil (percentual * 100) / @loader.length

			if percentual != @loaded
				@loaded = percentual
				
				if @progressCallback?
					@progressCallback @loaded
				

	start: (callback) ->
		for video in @loader
			xhr = new XMLHttpRequest
			xhr.open 'GET', video.url, true
			xhr.responseType = 'blob'
			
			xhr.onload = @load video, callback

			xhr.addEventListener( 
				"progress", 
				@progress video,
				false
			)
			do xhr.send

	load: (video, callback) => (evt) =>
		@loadEvent evt, video, callback

	progress: (video) => (evt) =>
		@progressEvent evt, video

	onProgress: (callback) ->
		@progressCallback = callback

	onFinish: (callback) ->
		@finishCallback = callback