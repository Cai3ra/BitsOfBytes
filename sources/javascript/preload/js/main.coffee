require ["video-loader"], (videoLoader) ->
	loader = new VideoLoader [
		"assets/video/Dope D.O.D. Ft. Onyx - Panic Room (Official Video).mp4"
		"assets/video/Dope D.O.D. Ft. Onyx - Panic Room (Official Video).mp4"
		"assets/video/Dope D.O.D. Ft. Onyx - Panic Room (Official Video).mp4"
	], yes

	loader.onProgress (arg) ->
		console.log arg

	loader.onFinish (arg) ->
		console.log arg		

	loader.start () -> console.log "Processo de carregamento finalizado!!"
