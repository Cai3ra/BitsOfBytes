require ["video-loader"], (videoLoader) ->
	loader = new VideoLoader [
		"assets/video/Dope D.O.D. Ft. Onyx - Panic Room (Official Video).mp4"
		"assets/video/Dope D.O.D. Ft. Onyx - Panic Room (Official Video).mp4"
		"assets/video/Dope D.O.D. Ft. Onyx - Panic Room (Official Video).mp4"
	], no

	loader.onProgress (arg) ->
		console.log arg

	loader.onFinish (arg) ->
		console.log arg		
		videoElement = document.createElement "video"	
		videoElement.width = 640
		videoElement.height = 480					
		videoElement.src = arg.cacheUrl
		document.body.appendChild videoElement
		do videoElement.play

	loader.start () -> console.log "Processo de carregamento finalizado!!"
