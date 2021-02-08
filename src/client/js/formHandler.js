const postData = async (url = '', data = {}) => {
    console.log(data, "data")
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
        console.log('Data received:', newData)
        return newData;
    } catch (error) {
        console.log('error', error)
    }
}

function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let input_url = document.getElementById('url').value
    //Example of URL https://jamesclear.com/five-step-creative-process
    if (Client.isURLValid(input_url)) {
        console.log("::: Form Submitted :::")
        const API_URL = 'http://localhost:8081/addUrl'
        postData(API_URL, { url: input_url }).then((res) => {
            const { model, score_tag, agreement, subjectivity, confidence, irony } = res;
            document.getElementById("results").style.display = "block";
            document.getElementById("model").innerHTML = `model : ${model}`
            document.getElementById("score_tag").innerHTML = `score_tag : ${score_tag}`
            document.getElementById("agreement").innerHTML = `agreement : ${agreement}`
            document.getElementById("subjectivity").innerHTML = `subjectivity : ${subjectivity}`
            document.getElementById("confidence").innerHTML = `confidence : ${confidence}`
            document.getElementById("irony").innerHTML = `irony : ${irony}`
        })
    } else {
        alert("::: Please Enter Vaild URL :::")
    }
}

export { handleSubmit }

