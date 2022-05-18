// #const로 변수설정
const backend_base_url = "http://127.0.0.1:5002"
const frontend_base_url = "http://127.0.0.1:5501"

async function handleSignin() {
    // .value를 사용하여 벨류값을 가져오게 한다.
    const signupData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById("floatingPassword").value
    }

    // 동기와 비동기 await를 달아주어서 이부분이 비동기다라는 것을 알려준다.
    // async function 이 fetch가 일어나길 기다린 후 작동한다.
    const response = await fetch(`${backend_base_url}/signup`, {
        method: 'POST',
        // JSON으로 변경
        body: JSON.stringify(signupData)
    }
    )
    response_json = await response.json()
    console.log(response_json)
    // status가 정상이면 login페이지로 넘어간다
    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/login.html`)
    } else {
        alert(response.status)
    }



}

async function handleLogin() {
    console.log("handle login")

    const loginData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById("floatingPassword").value
    }

    const response = await fetch(`${backend_base_url}/login`, {
        method: 'POST',
        body: JSON.stringify(loginData)
    })

    console.log(response)
    response_json = await response.json()
    console.log(response_json)
    localStorage.setItem("token", response_json.token)
    // 브라우저 자체 url에 로컬 스토리지에 저장

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}`)
    } else {
        alert(response.status)
    }
}
async function getName() {
    console.log("get Name")
    console.log(localStorage.getItem("token"))

    const response = await fetch(`${backend_base_url}/getuserinfo`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
    response_json = await response.json()
    console.log(response_json)

    const username = document.getElementById("username")
    username.innerText = response_json.email

}