class ChangeCoordTypes < ActiveRecord::Migration
  def change
  	remove_column :businesses, :x_coord
  	remove_column :businesses, :y_coord

  	add_column :businesses, :x_coord, :float
  	add_column :businesses, :y_coord, :float
  end
end
