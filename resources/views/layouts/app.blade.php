<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Your App</title>
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body>
        <div id="app">
            <site-header></site-header>
            @yield('content')
        </div>
        {{-- {{ $slot }} --}}
    </body>
</html>

<style>

    #app {
        font-family: monospace;
    }


</style>