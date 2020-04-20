{.passC: "-DOBJC_OLD_DISPATCH_PROTOTYPES=1".}
# --panics:on --styleCheck:hint --gc:arc

import webgui,os,nimhttpd,mimetypes,asyncdispatch#,threadpool

proc server() {.thread.} = 
    var settings: NimHttpSettings

    settings.directory = currentSourcePath().parentDir() / "docs"
    #   settings.logging = logging
    settings.mimes = newMimeTypes()
    settings.mimes.register("html", "text/html")
    settings.mimes.register("css", "text/css")
    settings.address = ""
    #   settings.name = name
    #   settings.version = version
    settings.port = Port(1337)

    serve(settings)
    runForever()
# currentSourcePath().parentDir() / "app/index.html"
proc app(){.thread.} =
    let app = newWebView( "http://localhost:1337/index.html")
    app.run()
    app.exit()

when isMainModule:
    
    # var appthr:Thread[void]
    var serverthr:Thread[void]
    # v1
    createThread(serverthr,server)
    app()
    joinThreads([serverthr])
    # v2
    # spawn server()
    # app()
   