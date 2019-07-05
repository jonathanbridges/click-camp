class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.integer :listing_id, null: false
      t.float :lat, null: false
      t.float :long, null: false
      t.timestamps
    end
    add_index :locations, :listing_id, unique: true
  end
end
