class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
    	t.string :name, null: false
    	t.string :category, null: false
    	t.integer :price, null: false
    	t.integer :x_coord, null: false
    	t.integer :y_coord, null: false

      t.timestamps
    end
  end
end
