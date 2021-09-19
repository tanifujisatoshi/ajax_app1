const buildHTML = (XHR) => {
//HTMLの生成に関しては非同期通信をするためのpost関数の処理に不要なのでHTMLを生成するための記述を別に切り出している
//buildHTML関数を定義している 仮引数はXHRになっている 仮引数名は何でも良いが処理内で使われる変数と同一にする必要がある
//XHRにはjavascriptを用いたHTTP通信をするためのオブジェクトが入っている
   const item = XHR.response.post
//HTTP通信のコントローラーからjavascriptに送られるレスポンスには{ post: post }がありキーの名前がpostだからresponseの直後にpostと指定している
//コントローラーから送られてきたpostのバリュー(投稿されたメモのレコード情報)を取得することができる
   const html = `
     <div class = "post">
       <div class = "post-date">
         投稿日時:${item.created_at}
       </div>
       <div class = "post-content">
          ${item.content}
       </div>
     </div>` 
//itemには投稿されたメモのレコード情報が入っているのでその変数の直後にカラムを指定することでその内容を取得することができる
//HTML情報を変数htmlに代入している 
return html 
//buildHTML関数の戻り値をhtmlをすることでこの関数が呼び出された時HTML情報を取得することができる
}

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
//そのHTTP通信に対してopenメソッドを使うことでコントローラーに送るリクエストの内容を指定することができる
//ルーティングのpost 'posts', to: 'posts#create'を動かすことができる
//第三引数には非同期通信を行うか行わないかを示すtrueかfalseを入れる
     XHR.responseType = "json"
//リクエストを送信する際に、レスポンスで欲しいデータの型をあらかじめ指定しておく必要がある
//レスポンスをどのようなデータの型にするかを指定するresponseTypeプロパティをXMLHttpRequest(javascriptを用いたHTTP通信)に対して使う必要がある
//他の言語でも使うことができ動作が軽いjsonをresponseTypeプロパティで指定している
     XHR.send(formData)
//sendメソッドを使うことでリクエストの内容をサーバーサイドに送信することができる
//今回はフォームに入力した値をリクエストとしてサーバー側に送信したいのでsendメソッドの引数にformDataを指定している
     XHR.onload = () => {
//javascriptを用いたHTTP通信が成功した時の処理をアロー関数を用いて記述している
     if (XHR.status != 200) {
//HTTP通信のリクエストに対してサーバーから送信される番号が200ではなかった場合 つまりリクエストが正常にサーバー側で受信できなかった場合は波括弧内の処理がされる
        alert(`Error ${XHR.status}: ${XHR.statusText}`)
//ステータスコードとそれに応じたメッセージを持ったアラート画面が表示される
        return null
//リクエストが正常にサーバサイドで受信できなかった場合のみこの記述以降の処理を行えないようにする
     }
        const list = document.getElementById("list")
//id属性値がlist(今回はその要素の中身は空である)である要素を取得してそれを変数listに代入している
        const formText = document.getElementById("content")
//投稿欄の要素を取得してそれを変数formTextに代入している
         list.insertAdjacentHTML("afterend", buildHTML(XHR))
//id属性値がlist(今回はその要素の中身は空である)である要素を取得して変数に対してinsertAdjacentHTMLメソッドを指定することで指定した要素にHTMLを挿入することができる
//afterendを指定しているので指定した要素の直後にHTMLを挿入することができる
//挿入するHTMLはbuildHTML関数の処理によって取得することができる
//その関数の処理にjavascriptを用いたHTTP通信をするためのオブジェクトを渡すために引数にXHRを記述している
         formText.value = ""
//formTextは投稿欄の要素を取得した変数を示す
//value属性はコントローラーにフォームの送信をしたときにどのような値を送信するのかを決めることができる
//onloadプロパティ内にこれを記述することでリクエストに成功した後に入力欄の内容を空文字にすることができる(空文字になった場合は投稿するボタンを押し続けると空文字が送信される)
     }
    })
   }

window.addEventListener("load", post)


