class ImagesController < ApplicationController
    before_action :set_image, only: [:show, :destroy]
    protect_from_forgery with: :exception
  
    # Upload method for handling image uploads
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
  
    # Index method with pagination
    def index
      @images = Image.paginate(page: params[:page], per_page: 10)
    
      respond_to do |format|
        format.html # Renders the default `index.html.erb` view
        format.json { 
          render json: { 
            images: @images.map { |image| { id: image.id, url: url_for(image.file) } },
            total_pages: @images.total_pages, 
            current_page: @images.current_page 
          } 
        }
      end
    end
  
    # Show method for displaying a single image
    def show
      respond_to do |format|
        format.html # Render HTML view for individual image
        format.json { render json: @image.as_json.merge(file_url: url_for(@image.file)) }
      end
    end
  
    # Create method for handling a single image upload
    def create
      @image = Image.new
      @image.file.attach(params[:file]) # Ensure `params[:file]` matches the payload
      
      if @image.save
        render json: @image.as_json.merge(file_url: url_for(@image.file)), status: :created
      else
        render json: { errors: @image.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # Destroy method for deleting an image
    def destroy
      image = Image.find(params[:id])
      image.file.purge # For Active Storage
      image.destroy
      render json: { message: 'Image deleted successfully' }, status: :ok
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Image not found' }, status: :not_found
    end
  
    private
  
    # Set image for actions that require an existing image
    def set_image
      @image = Image.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      respond_to do |format|
        format.html { redirect_to images_path, alert: 'Image not found.' }
        format.json { render json: { error: 'Image not found' }, status: :not_found }
      end
    end
  
    # Strong parameters for images
    def image_params
      params.require(:image).permit(:file)
    end
  end
  