class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
    	t.string :fp_url, null: false
    	t.integer :review_id, null: false
    	t.string :caption

      t.timestamps
    end

    add_index :photos, :review_id
  end
end
