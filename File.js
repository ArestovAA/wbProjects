let data;
let error;
document.addEventListener("DOMContentLoaded", () => {
    const spinner = document.getElementById("spinner");
    const btnSearch = document.getElementById("btn-search");
    const form = document.getElementById("form");
    form.addEventListener("submit", async e => {
        error = " ";
        spinner.style.display = "inline";
        btnSearch.disabled = true;
        e.preventDefault();
        const input = document.getElementById("input");
        try{
            const response = await fetch(`https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${input.value}`);
            data = await response.json();
        }catch (e){
            error = "404 Not Found"
        }
        spinner.style.display = "none";
        btnSearch.disabled = false;
        render();
    })
});

function render() {
    const list = document.getElementById("list");
    let result = "";
//ну да
    for (let item of data.hits){
        result +=
            `<div class="item">
                <b>${item.recipe.label}</b><br/>
                <img src="${item.recipe.image}" alt="None"><br/>
                <div class="container">
                    <p>${item.recipe.ingredientLines}</p><br/>
                    <a href="${item.recipe.url}" target="_blank">View</a>
                </div>
            </div>`;
    }
    list.innerHTML = result;
}