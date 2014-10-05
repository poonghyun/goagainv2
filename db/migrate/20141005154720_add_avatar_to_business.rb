class AddAvatarToBusiness < ActiveRecord::Migration
  def change
  	add_column :businesses, :avatar_url, :string
  end
end
