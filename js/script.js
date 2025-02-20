document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        document.body.style.backgroundColor = '#1a202c';
        document.body.style.color = '#ffffff';
    } else {
        document.body.style.backgroundColor = '#f0f0f0';
        document.body.style.color = '#333333';
    }
});