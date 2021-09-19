function post()
   {const submit = document.getElementById("submit")
//投稿するボタンの要素を取得して変数submitに代入している
     submit.addEventListener("click", (e) => {
     e.preventDefault()    
//投稿するボタンをクリックすることでAjaxによるリクエストとブラウザからのリクエストが同時にサーバーサイドに送信される
//今回は非同期通信による投稿のみを実装したいのでデフォルトでかかっているブラウザからのリクエストはキャンセルする必要がある
//そのためclickイベントを意味するe(任意の文字列で良い)に対してprevent(=防ぐという意味)Defaultメソッドを使うことで投稿するボタンをクリックしてもAjaxによるリクエストしかサーバ側に送信されない
     const form = document.getElementById("form")
//フォーム全体の要素を取得してそれを変数formに代入している
     const formData = new FormData(form)
//フォームに入力された値を取得するためにFormDataオブジェクトをnewメソッドで生成して引数にはフォーム全体の要素を取得した変数を入れる
     const XHR = new XMLHttpRequest()
//非同期通信を実装するためにXMLHttpRequest(javascriptを用いたHTTP通信)オブジェクトを生成してそれを変数XHRに代入している
     XHR.open("POST", "/posts", true)
//そのHTTP通信に対してopenメソッドを使うことでリクエストの内容を指定することができる
//今回のリクエストの内容としてはメモを投稿することなのでrails routes で POST /posts(.:format)  posts#createを参照しながら引数の内容を決める
//第三引数には非同期通信を行うか行わないかを示すtrueかfalseを入れる
     XHR.responseType = "json"
//リクエストを送信する際に、レスポンスで欲しいデータの型をあらかじめ指定しておく必要がある
//レスポンスをどのようなデータの型にするかを指定するresponseTypeプロパティをXMLHttpRequest(javascriptを用いたHTTP通信)に対して使う必要がある
//他の言語でも使うことができ動作が軽いjsonをresponseTypeプロパティで指定している
     XHR.send(formData)
//sendメソッドを使うことでリクエストの内容をサーバーサイドに送信することができる
//今回はフォームに入力した値をリクエストとしてサーバー側に送信したいのでsendメソッドの引数にformDataを指定している
    })
   }

window.addEventListener("load", post)


