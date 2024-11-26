(function() {
    const startTime = performance.now();

    function displayLoadingTime() {
        const endTime = performance.now();
        const loadingTime = (endTime - startTime).toFixed(2);

        document.getElementById('time').innerText = `${loadingTime} ms`;
    }

    window.addEventListener('load', displayLoadingTime);
})();
