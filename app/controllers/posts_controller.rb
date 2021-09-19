class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
# 投稿されたメモをpostsテーブルのidの番号が大きいものから表示させるようにした
  end

  def new
  end

  def create
    post = Post.create(content: params[:content])
# postモデルに対してcreateメソッドを使うことで引数に指定した内容を保存することができる
# 今回はcontentカラムの内容はビューから送られてきたparamsというハッシュのcontentというキーのバリューでありそれををpostテーブルに保存する
   render json:{ post: post }
# javascript側にキーがpostで(キー名は何でも良い)バリューがビューから送られてきた投稿の内容を保存したpostsテーブルの内容であるハッシュを送っている
# そのバリューをjson形式のビューとして返すことでページの一部分しか読み込み直しをすることがない
# redirect_toメソッドはページ全体が読み込み直されるためjson形式のビューを返すには不適切なのでrenderメソッド(ページが内容が変わることなく表示される)を使っている
  end
end
