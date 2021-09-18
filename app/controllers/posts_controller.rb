class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
# 投稿されたメモをpostsテーブルのidの番号が大きいものから表示させるようにした
  end

  def new
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end
end
