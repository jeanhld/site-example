class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end

  def create
    data = {
      contact:{
        email: params[:contact][:email]
      }
    }
    data = data.to_json
    visitor_id = params[:visitor_id].first

    url = get_url visitor_id
    response = Typhoeus::Request.post(url,
      body: data,
      headers: { 'Accept' => 'application/json', 'Content-Type' => 'application/json' })
    response_data = JSON.parse(response.body, symbolize_names: true)

    if response.success?
      flash[:success] = 'Contact has been saved!'
      redirect_to root_path
    else
      @contact = Contact.new
      flash[:danger] = 'Invalid Email or already in use.'
      render 'new'
    end
  end

  private
  def get_url visitor_id
    if ENV['RAILS_ENV'] == 'development'
      "http://localhost:3000/visitors/#{visitor_id}/contacts"
    else
      "http://user-tracker.herokuapp.com/visitors/#{visitor_id}/contacts"
    end
  end
end
