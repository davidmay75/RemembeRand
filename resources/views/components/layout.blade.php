<html>
    @vite(['resources/scss/app.scss', 'resources/js/app.js'])
    <x-header/>
    <body>
        {{ $slot }}
    </body>
</html>