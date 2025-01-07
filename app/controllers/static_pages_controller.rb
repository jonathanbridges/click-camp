class StaticPagesController < ApplicationController
  def root
    render html: '', layout: 'application'
  end
end
