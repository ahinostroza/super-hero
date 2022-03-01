(function ($) {
    $(document).ready(function () {
        $('#super-form').submit(function (e) {
            e.preventDefault()

            // OBTENER ID
            let id = $('#super-id').val()

            // VALIDACIONES
            if (id > 731)
                alert('Solo existen 731 SuperHeros. Por favor ingrese un número entre 1 y 731')

            // LLAMADA A LA API
            $.ajax({
                url: `https://superheroapi.com/api.php/4379517335406144/${id}`,
                success: function (data) {
                    console.log(data)
                    const { response, powerstats, error } = data
                    if (response === 'success') {
                        createDetail(data)
                        createCanvas(powerstats)
                    } else {
                        alert(error)
                    }
                },
                error: function (e) {
                    console.log(e)
                }
            })

        })

        function createDetail(data) {
            const { name, image, connections, biography, work, appearance } = data

            let constructor = `
                <div class="container">
                    <div class="row">
                        <div class="col-lg-7 mb-4">
                            <div class="offset-md-5">
                                <h4>SuperHero Encontrado</h4>
                            </div>
                            <div class="card">
                                <div class="row g-0">
                                    <div class="col-md-5">
                                        <img src="${image.url}"
                                            class="img-fluid" alt="ImageHero">
                                    </div>
                                    <div class="col-md-7">
                                        <div class="card-body">
                                            <h5 class="card-title">Nombre: ${name}</h5>
                                            <p class="card-text">Conexiones: ${connections['group-affiliation']}</p>
                                            <p class="card-text px-3 py-2 mb-1 border-bottom"><span class="fst-italic">Publicado por:</span> ${biography.publisher}</p>
                                            <p class="card-text px-3 py-2 mb-1 border-bottom"><span class="fst-italic">Ocupación:</span> ${work.occupation}</p>
                                            <p class="card-text px-3 py-2 mb-1 border-bottom"><span class="fst-italic">Primera Aparición:</span> ${biography['first-appearance']}</p>
                                            <p class="card-text px-3 py-2 mb-1 border-bottom"><span class="fst-italic">Altura:</span> ${appearance.height.join(' - ')}</p>
                                            <p class="card-text px-3 py-2 mb-1 border-bottom"><span class="fst-italic">Peso:</span> ${appearance.weight.join(' - ')}</p>
                                            <p class="card-text px-3 py-2 mb-0"><span class="fst-italic">Alianzas:</span> ${biography.aliases.join(' ')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5">
                            <div id="super-chart" style="height: 420px; width: 100%"></div>
                        </div>
                    </div>
                </div>
            `

            $('#super-detail').html(constructor)
        }

        function createCanvas(powerstats) {
            const { intelligence, strength, speed, durability, power, combat } = powerstats

            let estadisticas = [
                { y: intelligence, label: "intelligence" },
                { y: strength, label: "strength" },
                { y: speed, label: "speed" },
                { y: durability, label: "durability" },
                { y: power, label: "power" },
                { y: combat, label: "combat" }
            ];

            let config = {
                theme: "light1",
                animationEnabled: true,
                title: {
                    text: `Estadisticas de Poder para Deadpool`,
                },
                data: [
                    {
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "true",
                        legendText: "{label} - {y}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}",
                        dataPoints: estadisticas,
                    },
                ],
            };

            let chart = new CanvasJS.Chart("super-chart", config);
            chart.render();
        }
    });
})(jQuery);