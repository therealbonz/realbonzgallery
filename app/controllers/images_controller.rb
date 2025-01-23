class ImagesController < ApplicationController
    before_action :set_image, only: [:show, :destroy]
    protect_from_forgery with: :exception

    def upload
        if params[:images]
          uploaded_images = []
          params[:images].each do |uploaded_file|
            image = Image.new
            image.file.attach(uploaded_file) # Attach the file using Active Storage
            if image.save
              uploaded_images << { id: image.id, url: url_for(image.file) }
            else
              render json: { error: 'Failed to save some images' }, status: :unprocessable_entity
              return
            end
          end
          render json: { images: uploaded_images }, status: :ok
        else
          render json: { error: 'No files provided' }, status: :unprocessable_entity
        end
      end
  def index
    @images = Image.all # Assuming you have an Image model
    respond_to do |format|
      format.html { render :index } # Render the gallery view for HTML requests
      format.json { render json: { images: @images.map { |img| { id: img.id, url: url_for(img.file) } } } }
    end
  end
  
    def show
      respond_to do |format|
        format.html # Render HTML view for individual image
        format.json { render json: @image.as_json.merge(file_url: url_for(@image.file)) }
      end
    end
  
    def create
        @image = Image.new
        @image.file.attach(params[:file]) # Ensure `params[:file]` matches the payload
      
        if @image.save
          render json: @image.as_json.merge(file_url: url_for(@image.file)), status: :created
        else
          render json: { errors: @image.errors.full_messages }, status: :unprocessable_entity
        end
      end
  
      def destroy
        image = Image.find(params[:id])
        image.file.purge # For Active Storage
        image.destroy
        render json: { message: 'Image deleted successfully' }, status: :ok
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Image not found' }, status: :not_found
      end
  
    private
  
    def set_image
      @image = Image.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      respond_to do |format|
        format.html { redirect_to images_path, alert: 'Image not found.' }
        format.json { render json: { error: 'Image not found' }, status: :not_found }
      end
    end
  
    def image_params
      params.require(:image).permit(:file)
    end
  end