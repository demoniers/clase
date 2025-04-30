document.getElementById('uploadButton').addEventListener('click', function () {
    const fileInput = document.getElementById('fileInput');
    const output = document.getElementById('output');

    // Verifica si se ha seleccionado un archivo
    if (fileInput.files.length === 0) {
        output.textContent = 'Por favor, selecciona un archivo.';
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    // Cuando se lea el archivo, se muestra el contenido
    reader.onload = function (e) {
        output.textContent = e.target.result;
    };

    // Lee el archivo como texto
    reader.readAsText(file);
});
