
function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let input_url = document.getElementById('url').value
    //Example of URL https://jamesclear.com/five-step-creative-process
    if (Client.isURLValid(input_url)) {
        console.log("::: Form Submitted :::")
        const API_URL = 'http://localhost:8081/addUrl'
        postData(API_URL, { url: input_url }).then((res) => {
            results.style.display = "block"
            error.style.display = "none"
            const { model, score_tag, agreement, subjectivity, confidence, irony } = res;
            document.getElementById("model").innerHTML = `model : ${model}`
            document.getElementById("score_tag").innerHTML = `score_tag : ${score_tag}`
            document.getElementById("agreement").innerHTML = `agreement : ${agreement}`
            document.getElementById("subjectivity").innerHTML = `subjectivity : ${subjectivity}`
            document.getElementById("confidence").innerHTML = `confidence : ${confidence}`
            document.getElementById("irony").innerHTML = `irony : ${irony}`
        })
    } else {
        console.log("::: Not valid url :::")
        results.style.display = "none"
        error.style.display = "block"
        document.getElementById("error").innerHTML = " Please Enter Vaild URL ";
    }
    document.getElementById('url').value = ""
}



//Async Post
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json()
        return newData;
    } catch (error) {
    }
}

export { handleSubmit }

