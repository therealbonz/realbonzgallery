class Api::V1::SessionsController < ApplicationController
    skip_before_action :verify_authenticity_token
  
    def create
      user = User.find_by(email: params[:email])
      if user && user.valid_password?(params[:password])
        sign_in user
        render json: { message: 'Login successful', user: user }, status: :ok
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
  
    def destroy
      sign_out(current_user)
      render json: { message: 'Logout successful' }, status: :ok
    end

    def edit
        # Respond with current user data
        render json: { user: current_user }
      end
    
      def update
        # Update user profile data
        if current_user.update(profile_params)
          render json: { user: current_user }
        else
          render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
        end
      end
    
      private
    
      def profile_params
        params.require(:user).permit(:email, :name)
      end
    

  end