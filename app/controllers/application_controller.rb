class ApplicationController < ActionController::Base
        include DeviseTokenAuth::Concerns::SetUserByToken
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
 # allow_browser versions: :modern
 rescue_from ActionController::InvalidAuthenticityToken do
  reset_session
  redirect_to root_path, alert: "Session expired. Please try again."
end
end
